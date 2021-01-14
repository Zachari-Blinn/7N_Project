const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
