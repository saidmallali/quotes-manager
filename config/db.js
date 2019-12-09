const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {

    try {
        await mongoose.connect(db, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology: true,
            useFindAndModify:false
        });
        console.log('database connected');
    } catch (err) {
        console.error("error conexion db",err);
        process.exit(1);
    }

}

module.exports = connectDB;