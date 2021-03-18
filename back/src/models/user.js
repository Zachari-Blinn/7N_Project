const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  slug: {
    type: String,
    slug: 'username',
    unique: true
  },
  email: {
    type: String,
    required: 'Email is required!',
    unique: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: 'Password is required!',
    select: false,
    min: 6,
    max: 1024
  },
  parties: [{
    type: Schema.Types.ObjectId,
    ref: 'Party'
  }],
  verified: {
    type: Boolean,
    default: false
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

UserSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  user.password = await hash(user.password, 10)
  console.log(user.password)
  next()
})

/**
 * @param password
 * @returns {Promise<*>}
 */
UserSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password)
}

/**
 * @param expiresIn
 * @returns {Promise<*>}
 */
UserSchema.methods.generateAccessToken = async function (expiresIn) {
  const payload = {
    id: this._id
  }
  return await sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn })
}

module.exports = model('user', UserSchema)
