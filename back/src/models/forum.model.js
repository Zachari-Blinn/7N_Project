const { Schema, model } = require("mongoose");
const Category = require('../models/category.model')

const ForumSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required!'
  },
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
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

ForumSchema.pre("findOneAndDelete", { document: true, query: false }, async function () {
  const docToDelete = await this.model.findOne(this.getQuery());
  await Category.deleteMany({ forum: docToDelete });
  console.log(docToDelete)
});

module.exports = model('Forum', ForumSchema)