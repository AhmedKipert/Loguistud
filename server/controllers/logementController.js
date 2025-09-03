const { default: mongoose } = require("mongoose");
const Logement = require("../models/Logement");
const z = require('zod');

// Créer une annonce de logement
exports.createLogement = async (req, res) => {
    try {
        // Schema de validation des informations d'une annonce de logement
        console.log('requête reçu: ', req.body);

        const logementSchema = z.object({
            titre: z.string().min(4, { error: "Le titre d'une annonce doit contenir au minimum 4 caractères" }).max(50, { error: 'Le titre d\'une ne doit pas dépasser 50 caractères' }),
            description: z.string().min(10, { error: 'La description d\'une doit contenir au minimum 10 caractères' }).max(350, { error: 'La description d\'une annonce ne doit pas dépasser 350 caractères' }),
            type: z.string().min('5', { error: 'La description du type de logement doit contenir au moins 5 caractères' }).max(25, { error: 'La description du type de logement ne doit pas dépasser 25 caractères' }),
            surface: z.string().optional(),
            prix: z.preprocess(val => Number(val), z.number().max(50000000)),
            charges: z.string(),
            disponible: z.preprocess(val => val === 'true', z.boolean({ error: 'La disponibilité doit être défini pour une valeur true or false' })),
            ville: z.string().max(30, { error: "Le nom de la ville ne doit pas dépasser 30 caractères" }),
            quartier: z.string().max(30, { error: "Le nom du quartier ne dois pas dépasser 30 caractères" }),
            // localisation: z.string(),
            proprietaire: z.string().regex(/^[0-9a-fA-F]{24}$/, {error: 'ObjectId invalide'})
        });

        // Validation des informations de la requête
        const validation = logementSchema.parse(req.body);
        

        // information du logement
        let {
            titre,
            description,
            type,
            surface,
            prix,
            charges,
            disponible,
            ville,
            quartier,
            localisation,
            proprietaire
        } = req.body;

        const adresse = req.body.adresse || '';
        const equipements = req.body.equipements || ''
        const longitude = req.body.longitude || 'aucun';
        const latitude = req.body.latitude || 'aucun';
        localisation = localisation.split(',')
        let photos = [];
        const files = req.files;
        files.forEach(file => {
            photos.push('uploads/logements/' + file.filename);
        });
        console.log(photos);

        console.log('req.files: ', req.files);
        
        // Création du logement
        const nouveauLogement = await Logement.create({
            titre,
            description,
            adresse,
            ville,
            quartier,
            prix,
            charges,
            type,
            surface,
            disponible,
            photos,
            localisation,
            proprietaire,
        });

        console.log('Logement créer avec succès');
        res.status(200).json({ message: 'Logement créé avec succès', logement: nouveauLogement });

    } catch (error) {
        console.log('Erreur de création du logement', error);
        res.status(500).json({ message: 'Erreur de créatin du logement' });
    }
};

// Liste des logements
exports.getLogements = async (req, res) => {
    try {
        console.log('requete reçu')
        const logements = await Logement.find().populate('proprietaire');

        if (!logements || logements.length === 0) return res.status(200).json({ message: 'Aucun logement existant' });

        res.status(200).json({ message: 'Liste des logements', logements });
    } catch (error) {
        console.log('Erreur de récuperation de la liste des logements');
        res.status(500).json({ message: 'Erreur serveur, récuperation échouée' });
    };
};

// Récupérer un logement
exports.getLogement = async (req, res) => {
    try {
        const { id } = req.params; // Identfiant unique de logement

        // Schéma de vérification de l'ID
        const schemaId = z.object({ 
            id: z.string().regex(/^[0-9a-fA-F]{24}$/, {error:'identifiant de logement incorrecte'})
        });

        console.log('id-----------------------------: ', id);

        schemaId.parse({id});

        const logement = await Logement.findById(id).populate('proprietaire');

        if (!logement) return res.status(200).json({ message: 'Le logement que vous essayer de consulter est inexistant' });

        // console.log('le logement est ici')
        res.status(200).json({ message: 'logement récupéré avec succès', logement });

    } catch (error) {
        console.log('Erreur interne:', error);
        if(error instanceof z.ZodError) {
            return res.json({message: 'ObjectID invalide'});
        }
        res.status(500).json({ message: 'Erreur du serveur' });
    }
}

// Logement pour chaque proprietaire
exports.getMesAnnonces = async(req, res) => {
    try {
        const {id} = req.user.compte;
        const mesAnnonces = await Logement.find({proprietaire: id});
        console.log(mesAnnonces.length)
        if(mesAnnonces.length === 0) return res.status(400).json({message: 'Aucune annonce existante'});

        res.status(200).json({message: 'Annonces récupérées avec succès', mesAnnonces});
    } catch (error) {
        console.log('Erreur: ', error);
        res.status(500).json({message: 'Erreur serveur'})
    }
}

// Supprimer une annonces
exports.deleteAnnonce = async(req, res) => {
    try {
        const id = req.params?.id;

        console.log('Delete: ', id)

        if(!id || !mongoose.Types.ObjectId.isValid(id)) 
            return res.status(400).json({message: 'ID invalide, La ressource que vous tenter de supprimer est introuvable'});

        const annonce = await Logement.findByIdAndDelete(id);

        if(!annonce)  
            return res.status(400).json({message: 'La ressource que vous tenter de supprimer est introuvable'});

        res.status(200).json({message: 'Annonce supprimée avec succès'});

    } catch (error) {
        console.log('Erreur de suppression d\'annonce', error);
        res.status(500).json({message: 'Erreur serveur'});
    }
}


// Modifier une annonces
exports.updateAnnonce = async(req, res) => {
    try {
        const id = req.params?.id;
        if(!id) 
            return res.status(400).json({message: 'La ressource que vous tenter de modifier est introuvable'});

        const annonce = Logement.findById(id);

        if(!annonce)  
            return res.status(400).json({message: 'La ressource que vous tenter de supprimer est introuvable'});

        await Logement.findByIdAndDelete(id);

        res.status(200).json({message: 'Annonce supprimée avec succès'});
    } catch (error) {
        console.log('Erreur de suppression d\'annonce', error);
        res.status(500).json({message: 'Erreur serveur'});
    }
}