const Etudiant = require('../models/Etudiant');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const lien = "http://localhost:5173/verification?token=";
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Création de compte
exports.create = async (req, res) => {
    try {
        console.log('Requête reçu avec succès');
        // console.log(req.body);
        // console.log("Fichier image", req.file);
        let { prenom, nom, age, telephone, universite, filiere, niveau, annee_etude, email, motdepasse } = req.body
        
        const lienDossierImages = req.file ? 'uploads/photosProfiles/' : '';
        const photoProfil = lienDossierImages + req.file?.filename || '';
        const adresse = req.body.adresse || '';

        if (!prenom || !nom || !age ||
            !telephone || !universite || !filiere ||
            !niveau || !annee_etude || !email || !motdepasse
        ) return res.status(400).json({ message: 'Veuillez renseignez les informatons récommandés' });

        motdepasse = await bcrypt.hash(motdepasse, 10);

        const nouvelEtudiant = await Etudiant.create({
            photoProfil,
            prenom,
            nom,
            age,
            telephone,
            adresse,
            universite,
            filiere,
            niveau,
            annee_etude,
            email,
            motdepasse
        });

        console.log('Etudiant enregistré avec succès');

        // Génération du token
        const token = jwt.sign(
            { id: nouvelEtudiant._id, role: nouvelEtudiant.role },
            SECRET_KEY = process.env.SECRET_KEY,
            { expiresIn: '15m' }
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: nouvelEtudiant.email,
            subject: "Vérification de votre compte LoguiStud",
            html: `
                <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de compte LoguiStud</title>
    <style>
        /* Styles optimisés email */
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
            line-height: 2.4rem;
            color: #333333;
            background-color: #f7f9fc;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header-img {
            width: 100%;
            height: 50px;
            object-fit: cover;
object-position: 50% 80%;
            border-bottom: 5px solid #2C5CD5;
        }
        .content {
            padding: 30px;
        }
        h1 {
            color: #2C5CD5;
            margin-top: 0;
            font-size: 24px;
        }
        .btn {
            display: inline-block;
            background: #3CB371;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
            font-size: 1.1rem;
        }
        .footer {
            background: #F0F0F0;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666666;
        }
            p {
                font-size: 1.2rem;
                line-height: 1.6rem;
            }
        .logo {
            height: 50px;
            margin-bottom: 20px;
        }
        .divider {
            border-top: 1px solid #eeeeee;
            margin: 25px 0;
        }
        @media only screen and (max-width: 600px) {
            .content {
                padding: 20px;
            }
            .header-img {
                height: 150px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Belle image d'en-tête moderne (remplacée par une URL valide) -->
        <img src="https://res.cloudinary.com/dnhkmdbed/image/upload/v1755277770/reactbacks_pgkfdm.jpg" 
             alt="Étudiants sur un campus universitaire" 
             class="header-img">
        
        <div class="content">
            <!-- Logo -->
            <img src="https://res.cloudinary.com/dnhkmdbed/image/upload/v1755277685/logo_daaekv.png" 
                 alt="Logo LoguiStud" 
                 class="logo">
            
            <h1>Activez votre compte LoguiStud</h1>
            
            <p>Bonjour <strong>${nouvelEtudiant.prenom + ' ' + nouvelEtudiant.nom}</strong>,</p>
            
            <p>Merci de vous être inscrit sur LoguiStud, la plateforme de référence pour le logement étudiant en Guinée.</p>
            
            <p>Pour finaliser votre inscription et accéder à tous nos services, veuillez confirmer votre adresse email en cliquant ci-dessous :</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${lien + token}" class="btn">
                    Confirmer mon email
                </a>
            </div>
            
            <p><em>Ce lien expirera dans 24 heures. Si vous n'avez pas créé de compte, ignorez ce message.</em></p>
            
            <div class="divider"></div>
            
            <p>À bientôt sur notre plateforme,<br>
            <strong>L'équipe LoguiStud</strong></p>
            
            <p><small>Besoin d'aide ? <a href="mailto:support@loguistud.com" style="color: #2C5CD5;">Contactez notre support</a></small></p>
        </div>
        
        <div class="footer">
            <p>© 2024 LoguiStud. Tous droits réservés.</p>
            <p>
                <a href="https://loguistud.com/cgu" style="color: #666666; text-decoration: none;">Conditions d'utilisation</a> | 
                <a href="https://loguistud.com/confidentialite" style="color: #666666; text-decoration: none;">Confidentialité</a>
            </p>
            <p>Conakry, Guinée</p>
        </div>
    </div>
</body>
</html>
            `
        });

        res.status(201).json({ message: 'Utilisateur crée avec succès, vérifiez votre email' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur au niveau du serveur' });
    }
};

// // Vérification d'email
// exports.verificationEmail = async (req, res) => {
//     try {
//         const token = req.query.token;
//         console.log('Requête reçu avec succès: ', token);

//         if (!token) return res.status(400).json({ message: "Ce lien est invalide" });

//         // Vérification de la validé du token
//         jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
//             if (err) return res.status(400).json({ message: "Votre lien de vérification a expiré veuillez réssayez la création" });

//             const etudiant = await Etudiant.findOne({ email: payload.email });
//             etudiant.isVerified = true; // activer le compte
//             console.log('Compte activé avec succès.');
//             await etudiant.save();

//             const user = await User.create({
//                 email: etudiant.email,
//                 motdepasse: etudiant.motdepasse,
//                 compte: etudiant._id,
//                 role: etudiant.role
//             });
//             console.log('User créer avec succes', user);
//             console.log('Compte utilisateur créer avec succès:', etudiant.email);
//             res.status(200).json({ message: "Félicitation! Votre compte à été activé avec succès", etudiant });
//         });

//     } catch (error) {
//         console.log('Verication token error', error);
//         res.status(500).json({ message: 'Erreur côté serveur' });
//     }
// };

