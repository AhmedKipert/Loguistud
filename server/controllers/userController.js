const Etudiant = require("../models/Etudiant");
const Proprietaire = require("../models/Proprietaire");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const z = require('zod');


// Connexion
exports.connexion = async (req, res) => {

    // Schema de vérification des informations de connexion
    const userSchema = z.object({
        email: z.email('Email invalide'),
        motdepasse: z.string().min(6, "Le mot de passe contient normalement 6 caractère minimums")
    });

    try {
        const { email } = req.body;
        console.log('CORPS', req.body);

        // Validation des informations de connexion
        userSchema.parse(req.body);

        // Recherche de l'utilisateur
        // const user = await User.findOne({ email });
        const user = await User.findOne({ email }).populate('compte', '-motdepasse -__v');
        if (!user) return res.status(400).json({ type: 'infos_error', message: 'Adresse email ou mot de passe incorrecte' });

        // Vérification du mot de passe
        const motdepasseValide = await bcrypt.compare(req.body.motdepasse, user.motdepasse);
        if (!motdepasseValide) return res.status(400).json({ type: 'infos_error', message: 'Adresse email ou mot de passe incorrecte' });

        // Si utilisateur trouvé, créer un token d'authentification
        const token = jwt.sign(
            { id: user._id, role: user.role },
            SECRET_KEY = process.env.SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Création et envoi du token dans un cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 1000 * 60 * 60 * 24
        });
  
        const { motdepasse, _v, ...userFinal } = user.toObject();

        console.log("connexion réussie");
        res.status(200).json({ type: 'success', message: "Connexion réussi", user: userFinal });

    } catch (error) {
        console.log(error);
        // En cas d'erreur de validation
        if (error instanceof z.ZodError) {
            // console.log('Erreur Zod:', z.flattenError(error))
            res.status(400).json({ type: 'zod_error', message: 'Email ou mot de passe invalide !' });
        }
        else {
            // Erreur serveur
            console.log(error.name)
            res.status(500).json({ type: 'server_error', message: 'Une erreur interne est survenue, veuillez réessayez plus tard' });
        }
    }
}

// Deconnexion
exports.deconnexion = (req, res) => {
    console.log("COOKIES", res.cookies)
    res.cookie('token', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        maxAge: 0
    });

    res.json({ message: 'Déconnexion réussie' })
}

// Vérification token
exports.verificationToken = async (req, res) => {
    try {
        const { token } = req.query || '';
        console.log('Requete reçu, token = ', token);

        if (!token) return res.status(400).json({ message: 'Lien ou token invalide' });

        jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
            console.log('Payload:', payload)

            if (err) return res.status(400).json({ message: "Le lien de vérification est invalide ou expiré" });

            const nouvelUser = payload.role === 'etudiant' ? Etudiant : Proprietaire;
            const id = payload.id;

            console.log('Le nouvel utilisateur a créer est: ', nouvelUser);

            const compte = await nouvelUser.findById(id);
            compte.isVerified = true;

            await User.create({
                email: compte.email,
                motdepasse: compte.motdepasse,
                compte: compte._id,
                role: compte.role
            });

            // if(payload.role === 'etudiant') {
            //     const etudiant = await Etudiant.findOne({email: user.email});
            //     etudiant.isVerified = true;
            //     await etudiant.save();
            // } else if(role === 'proprietaire') {
            //     const proprietaire = await Proprietaire.findOne({email: user.email});
            //     proprietaire.isVerified = true;
            //     await proprietaire.save();
            // }
            // const hashMotdepasse = bcrypt.hash()
            // const user = await User.create({
            //     email: payload.email,
            //     motdepasse: payload.motdepasse,
            //     compte: payload.id,
            //     role: payload.role
            // });



            console.log('User créer avec succès:', compte);
            res.status(200).json({ message: 'Vérification réussi', user: `${payload.prenom + ' ' + payload.nom}` });
        });

    } catch (error) {
        console.log('Erreur serveur', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

// moi
exports.me = async (req, res) => {
    try {
        res.status(200).json({ message: 'connexion réussi encore pour les infos', user: req.user });
    } catch (error) {
        console.log("Erreur ici back:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}