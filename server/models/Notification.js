const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['info', 'reservation', 'message'],
        default: 'info'
    },
    lu: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);