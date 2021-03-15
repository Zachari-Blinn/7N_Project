const { Schema, model } = require("mongoose");

const PartySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: "name",
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  startedAt: {
    type: Date,
    required: false
  },
  expireAt: {
    type: Date,
    required: false
  },
  finishedAt: {
    type: Date,
    required: false
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = model('Party', PartySchema)
