const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

  } catch (error) {
    console.error(`Database: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
