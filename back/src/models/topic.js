const { Schema, model } = require('mongoose')

const TopicSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    required: 'Category is required!',
    ref: 'Category'
  },
  title: {
    type: String,
    required: 'Title is required!'
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true
  },
  content: {
    type: String,
    required: 'Content is required!'
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = model('Topic', TopicSchema)
