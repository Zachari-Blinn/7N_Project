const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: 'Email is required!',
    unique: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: 'Password is required!',
    select: false,
    min: 6,
    max: 1024
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)
