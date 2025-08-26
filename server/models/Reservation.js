const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    logement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Logement',
        required: true
    },
    etudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Etudiant',
        required: true
    },
    proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proprietaire',
        required: true
    },
    dateDebut: {
        type: Date,
        required: true
    },
    dateFin: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['en_attente', 'acceptee', 'refusee', 'annulee'],
        default: 'en_attente'
    }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);