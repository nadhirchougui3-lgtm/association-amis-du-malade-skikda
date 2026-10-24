
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

function createToken(user) {
  return jwt.sign(
    { sub: user._id.toString() },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1d',
    },
  )
}

function publicUser(user) {
  return {
    id: user._id.toString(),
    nom: user.nom,
    telephone: user.telephone || '',
    email: user.email || '',
    photoUrl: user.photoUrl || '',
    authProvider: user.authProvider || 'phone',
    role: user.role,
  }
}

function normalizePhone(value) {
  return value.trim().replace(/\s+/g, '')
}

exports.register = async (req, res, next) => {
  try {
    const { nom, telephone, password } = req.body

    if (
      typeof nom !== 'string' ||
      typeof telephone !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        message: 'Please provide your name, phone number and password.',
      })
    }

    const cleanName = nom.trim()
    const cleanPhone = normalizePhone(telephone)

    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({
        message: 'Full name must contain between 2 and 100 characters.',
      })
    }

    if (
      cleanPhone.length < 6 ||
      cleanPhone.length > 20 ||
      !/^[+\d][\d+()-]*$/.test(cleanPhone)
    ) {
      return res.status(400).json({
        message: 'Please enter a valid phone number.',
      })
    }

    if (password.length < 6 || password.length > 128) {
      return res.status(400).json({
        message: 'Password must contain between 6 and 128 characters.',
      })
    }

    const existingUser = await User.findOne({
      telephone: cleanPhone,
    }).lean()

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this phone number already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      nom: cleanName,
      telephone: cleanPhone,
      password: hashedPassword,
      authProvider: 'phone',
    })

    return res.status(201).json({
      message: 'Account created successfully. You can now sign in.',
      user: publicUser(user),
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'An account with this phone number already exists.',
      })
    }

    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { telephone, password } = req.body

    if (
      typeof telephone !== 'string' ||
      typeof password !== 'string' ||
      !telephone.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Please enter your phone number and password.',
      })
    }

    const cleanPhone = normalizePhone(telephone)

    const user = await User.findOne({
      telephone: cleanPhone,
    }).select('+password')

    if (!user || !user.password) {
      return res.status(401).json({
        message: 'Invalid phone number or password.',
      })
    }

    if (!user.actif) {
      return res.status(403).json({
        message: 'This account is currently disabled.',
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password,
    )

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid phone number or password.',
      })
    }

    return res.status(200).json({
      message: 'Signed in successfully.',
      token: createToken(user),
      user: publicUser(user),
    })
  } catch (error) {
    next(error)
  }
}

exports.facebookLogin = async (req, res, next) => {
  try {
    const { accessToken } = req.body

    if (
      typeof accessToken !== 'string' ||
      !accessToken.trim() ||
      accessToken.length > 10000
    ) {
      return res.status(400).json({
        message: 'A valid Facebook access token is required.',
      })
    }

    const appId = process.env.FACEBOOK_APP_ID
    const appSecret = process.env.FACEBOOK_APP_SECRET

    if (!appId || !appSecret) {
      return res.status(503).json({
        message: 'Facebook login is not configured on the server.',
      })
    }

    const debugUrl = new URL(
      'https://graph.facebook.com/debug_token',
    )

    debugUrl.searchParams.set('input_token', accessToken)
    debugUrl.searchParams.set(
      'access_token',
      `${appId}|${appSecret}`,
    )

    const debugResponse = await fetch(debugUrl)
    const debugResult = await debugResponse.json()

    if (!debugResponse.ok) {
      return res.status(401).json({
        message: 'Facebook token verification failed.',
      })
    }

    const tokenInfo = debugResult.data

    if (
      !tokenInfo ||
      tokenInfo.is_valid !== true ||
      String(tokenInfo.app_id) !== String(appId) ||
      !tokenInfo.user_id
    ) {
      return res.status(401).json({
        message: 'The Facebook session is invalid or expired.',
      })
    }

    const profileUrl = new URL(
      'https://graph.facebook.com/me',
    )

    profileUrl.searchParams.set('fields', 'id,name,picture.type(large),email')

    const profileResponse = await fetch(profileUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const profile = await profileResponse.json()

    if (
      !profileResponse.ok ||
      !profile.id ||
      String(profile.id) !== String(tokenInfo.user_id) ||
      typeof profile.name !== 'string' ||
      profile.name.trim().length < 2
    ) {
      return res.status(401).json({
        message: 'Unable to verify your Facebook profile.',
      })
    }

    let user = await User.findOne({
      facebookId: String(profile.id),
    }).select('+facebookId')

    if (user && !user.actif) {
      return res.status(403).json({
        message: 'This account is currently disabled.',
      })
    }

    const pictureUrl = profile.picture?.data?.url

    if (!user) {
      user = await User.create({
        nom: profile.name.trim().slice(0, 100),
        facebookId: String(profile.id),
        email:
          typeof profile.email === 'string'
            ? profile.email.trim().toLowerCase()
            : undefined,
        photoUrl:
          typeof pictureUrl === 'string' &&
          pictureUrl.startsWith('https://')
            ? pictureUrl
            : undefined,
        authProvider: 'facebook',
      })
    } else {
      // Refresh Facebook-provided profile details without replacing
      // the user's locally uploaded profile photo.
      user.nom = profile.name.trim().slice(0, 100)

      if (typeof profile.email === 'string') {
        user.email = profile.email.trim().toLowerCase()
      }

      if (
        typeof pictureUrl === 'string' &&
        pictureUrl.startsWith('https://')
      ) {
        user.photoUrl = pictureUrl
      }

      await user.save()
    }

    return res.status(200).json({
      message: 'Signed in with Facebook successfully.',
      token: createToken(user),
      user: publicUser(user),
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'This account already exists.',
      })
    }

    next(error)
  }
}
