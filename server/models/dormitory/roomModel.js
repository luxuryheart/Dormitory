const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: String,
    roomCharge: String,
}, { timestamps: true });

const room = mongoose.model('Room', roomSchema);

module.exports = room;