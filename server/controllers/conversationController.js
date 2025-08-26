
const Conversation = require("../models/Conversation");


exports.conversation = async (req, res) => {
    try {
        const expediteurID = req.user?.id;
        const destinataireID = req.params?.id;
        

        // Vérification des Identifants des participants
        if (!expediteurID && !destinataireID) return res.status(400).json({ message: 'Conversation introuvable' });

        // const destinataireId
        console.log('participants: \nEtudiantID', expediteurID, '\nPropritaireID', destinataireID);

        // Vérification d'une conversation précédente
        const conversationExistante = await Conversation.findOne({ participants: { $all: [expediteurID, destinataireID] } }).populate('participants');

        // Si une conversation existe déjà on charge, sinon on en crée.
        if (!conversationExistante) {
            const nouvelleConversation = await Conversation.create({
                participants: [expediteurID, destinataireID]
            });
            console.log('Une conversation créer avec succèss')
            return res.status(201).json({ message: 'Conversation initié avec succès', conversation: nouvelleConversation });

        } else {
            return res.status(201).json({ message: 'Conversation récupérée avec succès', conversation: conversationExistante });
        }

    } catch (error) {
        console.log('Impossible de créer une conversation: ', error);
        res.status(500).json({ message: 'erreur serveur' })
    }
};

// LISTE DES CONVERSATIONS
exports.conversations = async (req, res) => {
    try {
        const { id } = req.user;

        console.log('USER ID = ', id)
        if (!id)
            return res.status(400).json({ message: 'Ressource introuvable' });

        const listeConversations = await Conversation.find({ participants: id }).populate({path:'participants', populate: {path: 'compte'}});

        // console.log("Taille", listeConversations.length, listeConversations)
        if (listeConversations.length === 0)
            return res.status(400).json({ message: 'Aucune conversation trouvée' });
        
        // console.log("LISTE DES CON VERSATIONS:", listeConversations);
        res.status(200).json({ message: 'Liste récupérer avec succès', conversations:listeConversations });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}