const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  forum: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'Forum is required!',
    ref: 'Forum'
  },
  title: {
    type: String,
    required: 'Title is required!'
  },
  description: {
    type: String,
    required: false
  },
  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Topic'
  }],
  isActive: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Category', CategorySchema)
