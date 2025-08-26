const mongoose = require('mongoose');
const { boolean } = require('zod');

const etudiantSchema = mongoose.Schema({
    photoProfil: {
        type: String
    },
    prenom: {
        type: String,
        min: 2,
        max: 50,
        require: true,
    },
    nom: {
        type: String,
        max: 50,
        require: true,
    },
    age: {
        type: String,
        min: 2,
        max: 50,
        require: true
    },
    telephone: {
        type: String,
        require: true,
    },
    adresse: {
        type: String,
    },
    universite: {
        type: String,
        require: true,
    },
    filiere: {
        type: String,
        require: true
    },
    niveau: {
        type: String,
    },
    annee_etude: {
        type: String,
    },
    email: {
        type: String,
        require: true,
    },
    motdepasse: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['etudiant'],
        default: 'etudiant'
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, { timestamp: true });

module.exports = mongoose.model('Etudiant', etudiantSchema);