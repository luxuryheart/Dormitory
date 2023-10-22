const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    floor: {
        floor_number: String,
        room: [
            {type: mongoose.Types.ObjectId, ref: 'Room'},
            { _id: false }
        ]
    }
}, { timestamps:true });

const floor = mongoose.model('Floor', floorSchema);

module.exports = floor;