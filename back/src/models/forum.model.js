const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required!',
  },
  description: {
    type: String,
    required: false,
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Category',
  }],
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Forum', ForumSchema);
