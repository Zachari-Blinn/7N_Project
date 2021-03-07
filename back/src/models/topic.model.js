const { Schema, model } = require("mongoose");

const TopicSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
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
