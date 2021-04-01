const { Schema, model } = require('mongoose')

const PermissionSchema = new Schema({
  read: {
    type: Boolean,
    default: true,
    required: true
  },
  update: {
    type: Boolean,
    default: false,
    required: true
  },
  delete: {
    type: Boolean,
    default: false,
    required: true
  },
  users: [{ //todo replace by roles
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'modelName'
  },
  modelName: {
    type: String,
    required: true,
    enum: ['Forum', 'Category']
  }
}, {
  timestamps: true
})

// seen Dynamic References via `refPath` for modelId && modelName
// use Permission.find().populate('modelId')

module.exports = model('Permission', PermissionSchema)
