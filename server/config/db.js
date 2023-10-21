const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_DB_URL

const dbConnect = async () => {
    try {
        await mongoose.connect(url)
        console.log('Database connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect;