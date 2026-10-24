
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    telephone: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    password: {
      type: String,
      select: false,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },

    facebookId: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },

    photoUrl: {
      type: String,
      maxlength: 2048,
    },

    authProvider: {
      type: String,
      enum: ['phone', 'facebook'],
      default: 'phone',
      required: true,
    },

    role: {
      type: String,
      enum: ['member', 'admin'],
      default: 'member',
    },

    actif: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

userSchema.index(
  { telephone: 1 },
  {
    unique: true,
    partialFilterExpression: {
      telephone: { $type: 'string' },
    },
  },
)

userSchema.pre('validate', function validateAuthMethod(next) {
  if (this.authProvider === 'facebook') {
    if (!this.facebookId) {
      this.invalidate('facebookId', 'Facebook ID is required.')
    }

    return next()
  }

  if (!this.telephone) {
    this.invalidate('telephone', 'Phone number is required.')
  }

  if (!this.password && this.isNew) {
    this.invalidate('password', 'Password is required.')
  }

  next()
})

module.exports = mongoose.model('User', userSchema)
