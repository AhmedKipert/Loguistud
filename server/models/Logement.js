const mongoose = require('mongoose');

const logementSchema = mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
    },
    ville: {
        type: String,
        required: true
    },
    quartier: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    charges: {
        type: Boolean,
        default: false
    },
    type: [String],
    surface: String,
    disponible: {
        type: Boolean,
        default: true
    },
    caracteristiques: {
        nbChambres: {type: Number},
        cour: {type: Boolean, default: false},
        equipements: [String]
    },
    photos: [String],
    localisation: [String],
    proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proprietaire',
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('Logement', logementSchema);