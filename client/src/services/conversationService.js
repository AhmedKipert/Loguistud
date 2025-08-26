import axios from "axios"
import { useContext } from "react"
const lien = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = lien+'/api';

export const conversation = async(id) => {
    try {
        const res = await axios.post('/conversation/' + id, {}, {
            withCredentials: true
        });
         
        return {success: true, message: res.data.message, conversation: res.data.conversation};
    } catch (error) {
        console.log("Erreur unique conversation", error);
        return {success: false, message: error.response?.data.message || 'Erreur interne'};
    }
};

// LISTE DES CONVERSATIONS
export const listeConversations = async() => {
    try {
        const res = await axios.get('/conversations', {
            withCredentials: true
        });
        return {success: true, message: res.data.message, conversations: res.data.conversations}
    } catch (error) {
        console.log("Erreur requete", error);
        return {success: false, message: error.response?.data.message || 'Erreur interne'}
    }
}