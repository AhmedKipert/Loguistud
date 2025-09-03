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
        const photoProfile = lienDossierImages + req.file?.filename || '';
        const adresse = req.body.adresse || '';

        if (!prenom || !nom || !age ||
            !telephone || !universite || !filiere ||
            !niveau || !annee_etude || !email || !motdepasse
        ) return res.status(400).json({ message: 'Veuillez renseignez les informatons récommandés' });

        motdepasse = await bcrypt.hash(motdepasse, 10);

        const nouvelEtudiant = await Etudiant.create({
            photoProfile,
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


// Modification des informations étudiant
exports.editerMesInformations = async (req, res) => {
    try {
        console.log('Requête de modification reçue');
        console.log('Fichier reçu:', req.file);
        console.log('Données reçues:', req.body);

        const id = req.user.compte.id;
        let { prenom, nom, age, telephone, adresse, universite, filiere, niveau, annee_etude } = req.body;

        // Vérification des champs obligatoires
        if (!prenom || !nom || !age || !telephone || !universite || !filiere) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez renseigner tous les champs obligatoires'
            });
        }

        // Recherche de l'étudiant
        const etudiant = await Etudiant.findById(id);
        if (!etudiant) {
            return res.status(404).json({
                success: false,
                message: 'Étudiant non trouvé'
            });
        }

        // Gestion de la photo de profil
        let photoProfile = etudiant.photoProfile;
        if (req.file) {
            photoProfile = 'uploads/photosProfiles/' + req.file.filename;

            // Supprimer l'ancienne photo si elle existe et n'est pas la photo par défaut
            if (etudiant.photoProfile && !etudiant.photoProfile.includes('default')) {
                const fs = require('fs');
                const path = require('path');
                const oldImagePath = path.join(__dirname, '..', '..', etudiant.photoProfile);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        // Mise à jour des informations
        const etudiantModifie = await Etudiant.findByIdAndUpdate(
            id,
            {
                photoProfile,
                prenom,
                nom,
                age,
                telephone,
                adresse: adresse || '',
                universite,
                filiere,
                niveau: niveau || '',
                annee_etude: annee_etude || ''
            },
            { new: true, runValidators: true }
        );

        console.log('Informations étudiant mises à jour avec succès');

        res.status(200).json({
            success: true,
            message: 'Informations mises à jour avec succès',
            data: {
                id: etudiantModifie._id,
                prenom: etudiantModifie.prenom,
                nom: etudiantModifie.nom,
                age: etudiantModifie.age,
                telephone: etudiantModifie.telephone,
                adresse: etudiantModifie.adresse,
                universite: etudiantModifie.universite,
                filiere: etudiantModifie.filiere,
                niveau: etudiantModifie.niveau,
                annee_etude: etudiantModifie.annee_etude,
                photoProfile: etudiantModifie.photoProfile
            }
        });

    } catch (error) {
        console.error('Erreur lors de la modification:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la modification'
        });
    }
};


// Modification de l'email
exports.modifierEmail = async (req, res) => {
    try {
        const id = req.user.compte.id;
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez fournir une adresse email'
            });
        }

        // Vérifier si l'email est déjà utilisé
        const emailExiste = await Etudiant.findOne({ email });
        if (emailExiste && emailExiste._id.toString() !== id) {
            return res.status(400).json({
                success: false,
                message: 'Cette adresse email est déjà utilisée'
            });
        }

        // Mettre à jour l'email
        const etudiantModifie = await Etudiant.findByIdAndUpdate(
            id,
            { email },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Email modifié avec succès',
            data: {
                email: etudiantModifie.email
            }
        });

    } catch (error) {
        console.error('Erreur lors de la modification de l\'email:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la modification de l\'email'
        });
    }
};

// Modification du mot de passe
exports.modifierMotDePasse = async (req, res) => {
    try {
        const id = req.user.compte.id;
        const { ancienMotdepasse, nouveauMotdepasse, confirmationMotdepasse } = req.body;

        // Validation des champs
        if (!ancienMotdepasse || !nouveauMotdepasse || !confirmationMotdepasse) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez remplir tous les champs'
            });
        }

        // Vérifier que les nouveaux mots de passe correspondent
        if (nouveauMotdepasse !== confirmationMotdepasse) {
            return res.status(400).json({
                success: false,
                message: 'Les nouveaux mots de passe ne correspondent pas'
            });
        }

        // Vérifier la longueur du nouveau mot de passe
        if (nouveauMotdepasse.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Le mot de passe doit contenir au moins 6 caractères'
            });
        }

        // Récupérer l'étudiant
        const etudiant = await Etudiant.findById(id);
        if (!etudiant) {
            return res.status(404).json({
                success: false,
                message: 'Étudiant non trouvé'
            });
        }

        // Vérifier l'ancien mot de passe
        const motDePasseValide = await bcrypt.compare(ancienMotdepasse, etudiant.motdepasse);
        if (!motDePasseValide) {
            return res.status(400).json({
                success: false,
                message: 'Ancien mot de passe incorrect'
            });
        }

        // Hasher le nouveau mot de passe
        const motDePasseHash = await bcrypt.hash(nouveauMotdepasse, 10);

        // Mettre à jour le mot de passe
        await Etudiant.findByIdAndUpdate(
            id,
            { motdepasse: motDePasseHash }
        );

        res.status(200).json({
            success: true,
            message: 'Mot de passe modifié avec succès'
        });

    } catch (error) {
        console.error('Erreur lors de la modification du mot de passe:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur lors de la modification du mot de passe'
        });
    }
};