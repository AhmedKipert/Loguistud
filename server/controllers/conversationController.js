const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

// Récupération ou création d'une conversation
exports.conversation = async (req, res) => {
    try {
        // ID de l'expéditeur
        const expediteurID = req.user?.id;
        // ID de la requête
        const id = req.params?.id;
        console.log('ID RECU', id);

        const destinataireID = await User.findOne({ compte: id });
        console.log('voici le id destinataireid:', destinataireID._id)
        // console.log("YESSSS!!! ID TROUVE DANS USER LOGUISTUD:", destinataireID)

        // Vérification des Identifants des participants
        if (!expediteurID && !destinataireID) return res.status(400).json({ message: 'Conversation introuvable' });


        // Vérification d'une conversation précédente
        const conversationExistante = await Conversation.findOne({ participants: { $all: [expediteurID, destinataireID._id] } }).populate('participants');
        // console.log('CONVERSATION EXISTANTE: ', conversationExistante)
        // Si une conversation existe déjà on charge, sinon on en crée.
        if (!conversationExistante) {
            console.log('participants: \nEtudiantID', expediteurID, '\nPropritaireID', destinataireID.id);
            const nouvelleConversation = await Conversation.create({
                participants: [expediteurID, destinataireID.id]
            });
            console.log('Une conversation créer avec succèss')
            return res.status(201).json({ message: 'Conversation initié avec succès', conversation: nouvelleConversation });
        } else
            return res.status(201).json({ message: 'Conversation récupérée avec succès', conversation: conversationExistante });

    } catch (error) {
        console.log('Impossible de créer une conversation: ', error);
        res.status(500).json({ message: 'erreur serveur' })
    }
};

// LISTE DE CONVERSATIONS SPECIFIQUES
exports.mesConversations = async(req, res) => {
    try {
        const id = req.params?.id;
        console.log('ID CO: ', id);

        if(!id) 
            return res.status(400).json({message: 'Aucun messages pour moment'});

        const messages = await Message.find({conversation:id}).populate({path: 'conversation', populate: {path: 'participants', populate: {path: 'compte'}}})

        if(messages.length === 0)
            return res.status(400).json({message: 'Aucun message pour le moment'});

        res.status(200).json({message: 'Messages récupérées avec succès', messages})

    } catch (error) {
        console.log('Erreur de récupération des messages spéciques', error);
        res.status(500).json({message: 'Erreur serveur'})
    }
}

// LISTE DE TOUTES LES CONVERSATIONS
exports.conversations = async (req, res) => {
    try {
        const { id } = req.user;

        // console.log('USER ID = ', id)
        if (!id)
            return res.status(400).json({ message: 'Ressource introuvable' });

        const listeConversations = await Conversation.find({ participants: id }).populate({ path: 'participants', populate: { path: 'compte' } });

        // console.log("Taille", listeConversations.length, listeConversations)
        if (listeConversations.length === 0)
            return res.status(400).json({ message: 'Aucune conversation trouvée' });

        // console.log("LISTE DES CON VERSATIONS:", listeConversations);
        res.status(200).json({ message: 'Liste récupérer avec succès', conversations: listeConversations });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}


// Création d'un nouveau message
exports.message = async (req, res) => {
    try {
        const { conversation, contenu } = req.body;
        console.log('donnees: ', req.body)
        const expediteur = req.user?.id;
        console.log('INFORMATION REQ BODY: ', conversation, contenu + '\nExpéditeur: ', expediteur);

        if (!conversation || !expediteur || !contenu) {
            return res.status(400).json({ message: 'Information manquant, impossible d\'envoyer le message' })
        }

        const nouveauMessage = await Message.create({
            conversation,
            expediteur,
            contenu
        });

        await Conversation.findByIdAndUpdate(conversation, { dernierMessage: contenu });
        // console.log('LA DERNIERE CONVERSATION EST MAINTENANT:', nouveauMessage);

        return res.status(200).json({ message: 'Message enregistré avec succès', contenu, data: nouveauMessage});

    } catch (error) {
        console.log('Erreur lors de l\'enregistrement du message', error);
        res.status(500).json({message: 'Impossible d\'enregistrer le message'});
    }
}

// LISTE DES MESSAGES
exports.messages = async(req, res) => {
    try {
        const messages = await Message.find().populate({path: 'conversation', populate: {path: 'participants', populate: {path: 'compte'}}});
        
        if(messages.length === 0)
            return res.status(400).json({message: 'Aucun message pour le momemnt'});

        res.status(200).json({message: 'Liste récuperer avec succès', messages});

    } catch (error) {
        console.log('Erreur de récupération de la liste');
        res.status(500).json({message: 'Erreur serveur'});
    }

}