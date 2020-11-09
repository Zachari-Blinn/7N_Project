const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        function State(type, status, address) {
            this.type = type;
            this.status = status;
            this.address = address;
        }

        let db = new State("DB", "OK", connection.connection.host);

        console.log("\x1b[44m%s\x1b[0m", "Connecting Database");
        console.table([db]);

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;