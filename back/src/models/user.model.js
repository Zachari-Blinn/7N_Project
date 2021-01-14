const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required!',
  },
  password: {
    type: String,
    required: 'Password is required!',
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
