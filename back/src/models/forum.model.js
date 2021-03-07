const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required!'
  },
  description: {
    type: String,
    required: false
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
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

ForumSchema.pre('deleteOne', { document: false, query: true }, (next) => {
  console.log("remove child");
  this.model('Category').deleteMany({ forum: this._id }, next);
});

ForumSchema.pre('deleteMany', { document: false, query: true }, (next) => {
  console.log("remove child");
  this.model('Category').deleteMany({ forum: this._id }, next);
});

ForumSchema.pre('remove', { document: false, query: true }, (next) => {
  console.log("remove child");
  this.model('Category').deleteMany({ forum: this._id }, next);
});

ForumSchema.pre('delete', { document: false, query: true }, (next) => {
  console.log("remove child");
  this.model('Category').deleteMany({ forum: this._id }, next);
});

module.exports = mongoose.model('Forum', ForumSchema)
