const mongoose = require('mongoose')

const ReplySchema = new mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Topic'
  },
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Reply', ReplySchema)
