const mongoose = require('mongoose');

const proprietaireSchema = mongoose.Schema({
    photoProfil: {
        type: String
    },
    prenom: {
        type: String,
        min: 2,
        max: 50,
        required: true,
    },
    nom: {
        type: String,
        max: 50,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telephone: {
        type: String,
        required: true,
    },
    adresse: {
        type: String,
        required: true,
    },
    motdepasse: {
        type: String,
        required: true
    },
    logements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Logement',
        }
    ],
    role: {
        type: String,
        enum: ['proprietaire'],
        default: 'proprietaire'
    }

}, { timestamp: true });

module.exports = mongoose.model('Proprietaire', proprietaireSchema);