
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function protect(req, res, next) {
  try {
    const authorization = req.headers.authorization

    if (
      !authorization ||
      !authorization.startsWith('Bearer ')
    ) {
      return res.status(401).json({
        message: 'Authentication required.',
      })
    }

    const token = authorization.slice(7)

    let payload

    try {
      payload = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
      })
    } catch {
      return res.status(401).json({
        message: 'Invalid or expired session.',
      })
    }

    if (!payload.sub) {
      return res.status(401).json({
        message: 'Invalid session.',
      })
    }

    const user = await User.findById(payload.sub)

    if (!user) {
      return res.status(401).json({
        message: 'Account not found.',
      })
    }

    if (!user.actif) {
      return res.status(403).json({
        message: 'This account is currently disabled.',
      })
    }

    req.user = user
    return next()
  } catch (error) {
    return next(error)
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Administrator access required.',
    })
  }

  return next()
}

module.exports = {
  protect,
  requireAdmin,
}
