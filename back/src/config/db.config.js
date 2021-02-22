const mongoose = require('mongoose');

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.error(`Database: connected!`);
  } catch (error) {
    console.error(`Database: ${error}`);
    process.exit(1);
  }
};

module.exports = InitiateMongoServer;
