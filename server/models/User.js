const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        // unique: true
    },
    motdepasse: {
        type: String,
        required: true
    },
    compte: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'roleRef'
    },
    role: {
        type: String,
        enum: ['superadmin', 'moderateur', 'etudiant', 'proprietaire'],
        required: true
    },
    // mon champ virtuel
    roleRef: {
        type: String,
        enum: ['Etudiant', 'Proprietaire'],
        require: true
    }

}, { timestamp: true });

userSchema.pre('save', function(next) {
    if(this.role === 'etudiant') this.roleRef = 'Etudiant'
    else if(this.role === "proprietaire") this.roleRef = 'Proprietaire';

    next();
});

module.exports = mongoose.model('User', userSchema);