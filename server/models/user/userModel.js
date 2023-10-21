const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profile: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        img: {
            type: String,
            default: '/img'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    }
    
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

module.exports = User;