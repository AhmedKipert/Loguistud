import axios from "axios"
const lien = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = lien + '/api';

// Récuperation ou création d'une conversation
export const conversation = async (id) => {
    try {
        console.log('THIS IS THE ID', id + '----')
        const res = await axios.post('/conversation/' + id, {}, {
            withCredentials: true
        });

        return { success: true, message: res.data.message, conversation: res.data.conversation };

    } catch (error) {
        console.log("Erreur unique conversation", error);
        return { success: false, message: error.response?.data.message || 'Erreur interne' };
    }
};

// LISTE DES CONVERSATIONS
export const listeConversations = async () => {
    try {
        const res = await axios.get('/conversations', {
            withCredentials: true
        });
        return { success: true, message: res.data.message, conversations: res.data.conversations }
    } catch (error) {
        console.log("Erreur requete", error);
        return { success: false, message: error.response?.data.message || 'Erreur interne' }
    }
}

// MESSAGE
export const envoyerMessage = async (data) => {

    try {
        const res = await axios.post('message', data, {
            withCredentials: true
        });
        return { success: true, message: res.data.message, contenu: res.data.contenu, data: res.data.data };

    } catch (error) {
        console.log('erreur interne', error);
        return { success: false, message: error.response?.data.message || 'Erreur interne' }
    }
};

// LISTE DES MESSAGES SPECIFIQUES
export const mesConversations = async (id) => {
    try {
        const res = await axios.get('message/' + id);
        return { success: true, message: res.data.message, messages: res.data.messages };
    } catch (error) {
        console.log('Erreur interne: ', error)
        return { success: false, message: error.response?.data.message || 'Erreur interne' }
    }
}

// LISTE DES MESSAGES
export const listeMessages = async () => {
    try {
        const res = await axios.get('message');
        return { success: true, message: res.data.message, messages: res.data.messages };
    } catch (error) {
        console.log('Erreur interne: ', error)
        return { success: false, message: error.response?.data.message || 'Erreur interne' }
    }
}