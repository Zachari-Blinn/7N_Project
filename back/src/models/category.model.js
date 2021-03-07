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
    ref: 'Topic'
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

CategorySchema.pre('remove', (next) => {
  this.model('Topic').deleteMany({ category: this._id }, next);
});

module.exports = mongoose.model('Category', CategorySchema)
