"use strict";

const mongoose = require('mongoose')

mongoose.plugin(require('mongoose-slug-generator'))

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    })
    console.error('Database: connected!')
  } catch (error) {
    console.error(`Database: ${error}`)
    process.exit(1)
  }
}

module.exports = InitiateMongoServer
