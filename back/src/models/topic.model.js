const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'Category is required!',
    ref: 'Category'
  },
  name: {
    type: String,
    required: 'Name is required!'
  },
  content: {
    type: String,
    required: 'Content is required!'
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Reply'
  }],
  isActive: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Topic', TopicSchema)
