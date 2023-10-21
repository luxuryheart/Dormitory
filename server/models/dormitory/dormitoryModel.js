const mongoose = require('mongoose');

const dormitorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        province: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        subDistrict: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        }
    },
    contact: {
        email: {
            type: String,
            required: true
        },
        tel: String
    },
    floor: [
        { type: mongoose.Types.ObjectId, ref: 'Floor' },
        { _id: false }
    ],
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Dormitory = mongoose.Model('Dormitory', dormitorySchema);

module.exports = Dormitory;