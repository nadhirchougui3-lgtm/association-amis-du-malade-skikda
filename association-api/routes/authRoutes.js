const express = require('express')
const {
  register,
  login,
  facebookLogin,
} = require('../controllers/authController')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/facebook', facebookLogin)

module.exports = router
