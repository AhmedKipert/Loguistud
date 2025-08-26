const Proprietaire = require('../models/Proprietaire');
const User = require('../models/User');
const z = require('zod');
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    const profilePath = "uploads/photosProfiles/" // Chemin des photos de profile
    try {
        // Schema de validation des informations du propriétaire
        const proprietaireSchema = z.object({
            prenom: z.string().min(2, { error: 'Le prénom doit contenir au minimun deux(2) caractères' }),
            nom: z.string().min(2, { error: 'Le nom doit contenir au minimum deux(2) caractères' }),
            email: z.email({ error: 'L\'email est invalide' }),
            telephone: z.string().min(9, { error: 'Le numéro de téléphone n\'est pas valide' }).regex(/^\d+$/),
            adresse: z.string(),
            motdepasse: z.string().min(6, 'Le mot de passe doit contenir au minimum 6 caractères').regex(/^(?=.*[A-Za-z\d#$!@#])(?=.*\d)[A-Za-z\d#$!@#]+$/, { error: 'Le mot de doit contenir des lettres et des chiffres' }),
            conditions: z.preprocess(val => val === 'true', z.literal(true, { error: 'Vous devez acceptez les conditions d\'utilisation' }))
        });

        // Validation
        proprietaireSchema.parse(req.body);

        let { prenom, nom, email, telephone, adresse, motdepasse } = req.body;

        // Hachage du mot de passe
        motdepasse = await bcrypt.hash(motdepasse, 10);

        // Définition de l'image de profile
        const photoProfil = req.file ? profilePath + req.file.filename : profilePath + 'placeholder_image_homme.jpg';

        // Est-ce que l'email existe déjà
        const emailExiste = await Proprietaire.findOne({ email });
        if (emailExiste) return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });

        // Création du compte
        const nouveauProprietaire = await Proprietaire.create({
            photoProfil,
            prenom,
            nom,
            email,
            telephone,
            adresse,
            motdepasse
        });

        // Informations d'authentifications
        const user = await User.create({
            email,
            motdepasse,
            compte: nouveauProprietaire._id,
            role: nouveauProprietaire.role,
        });

        console.log('User créer: ', user);
        console.log('Compte crée: ', nouveauProprietaire);
        console.log('Proprietaire enregistrée avec succès')

        res.status(201).json({ message: 'Propriétaire enregistré avec succès' });
    } catch (error) {
        console.log("Erreur zod", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}