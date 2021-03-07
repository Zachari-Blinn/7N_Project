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
    ref: 'Reply'
  }],
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

TopicSchema.pre('remove', (next) => {
  this.model('Reply').deleteMany({ topic: this._id }, next);
});

module.exports = mongoose.model('Topic', TopicSchema)
