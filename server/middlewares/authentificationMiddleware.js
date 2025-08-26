const jwt = require('jsonwebtoken')
const User = require("../models/User");

exports.authentificationMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(400).json({ message: 'Echec authentification' });

        // Vérification de la validiter du token
        jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
            
            if (err) return res.status(403).json({ message: "Vous n'êtes pas autorisé, session invalide" });

            const user = await User.findById(payload.id).select('-motdepasse -__v').populate('compte', '-motdepasse -__v');
            if(!user) return res.status(401).json({message: "Vous n'êtes pas autorisé à acceder à cette ressource"});

            req.user = user;
            next();
        });

    } catch (error) {
        console.log('Erreur d\'authentification');
        console.log(error.message)
        res.status(500).json({ message: 'Erreur serveur' });
    }
};