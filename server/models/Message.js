const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    expediteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contenu: {
        type: String,
        required: true
    },
    lu: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Message', messageSchema);