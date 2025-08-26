const mongoose = required('mongoose');

const adminSchema = mongoose.Schema({
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
    motdepasse: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['superadmin', 'moderateur'],
        default: 'moderateur'
    }

}, { timestamp: true });

export default mongoose.model('Admin', adminSchema);