const mongoose = require('mongoose');

const ForumSchema = new mongoose.Schema({
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Topic',
  },
  content: {
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

module.exports = mongoose.model('Forum', ForumSchema);
