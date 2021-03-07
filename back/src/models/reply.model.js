const { Schema, model } = require("mongoose");

const ReplySchema = new Schema({
  topic: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Topic'
  },
  content: {
    type: String,
    required: true
  },
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

module.exports = model('Reply', ReplySchema)
