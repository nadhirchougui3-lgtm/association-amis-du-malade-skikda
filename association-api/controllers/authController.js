
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
    telephone: user.telephone,
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

    if (!user) {
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

    const token = createToken(user)

    return res.status(200).json({
      message: 'Signed in successfully.',
      token,
      user: publicUser(user),
    })
  } catch (error) {
    next(error)
  }
}
