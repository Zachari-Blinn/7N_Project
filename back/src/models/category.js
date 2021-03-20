const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
  forum: {
    type: Schema.Types.ObjectId,
    required: 'Forum is required!',
    ref: 'Forum'
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
  description: {
    type: String,
    required: false
  },
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic'
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  modifiedBy: {
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

module.exports = model('Category', CategorySchema)
