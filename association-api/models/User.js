
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
      required: true,
      unique: true,
      trim: true,
      maxlength: 20,
    },

    password: {
      type: String,
      required: true,
      select: false,
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

module.exports = mongoose.model('User', userSchema)
