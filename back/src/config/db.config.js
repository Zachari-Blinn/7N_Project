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
  } finally {
    console.log('\x1b[44m%s\x1b[0m', 'Database: connected!');
  }
};

module.exports = connectDB;
