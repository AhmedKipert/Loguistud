import axios from 'axios'
const API_URL = 'http://localhost:3002/api/auth'

// Connexion
export const connexion = async (data) => {
    try {
        const res = await axios.post(API_URL + "/connexion", data, {
            withCredentials: true
        });

        console.log('GROSSOMODE:', res.data);
        return res.data;

    } catch (error) {
        console.log('GROSSOMODE:', error.response?.data || 'Une problème inattendue est survenue.')
        return error.response?.data || 'Un problème inattendue est survenue.';
    }
};

// Déconnexion
export const deconnexion = async() => {
    try {
        const res = axios.post(`${API_URL}/deconnexion`, {}, {
            withCredentials: true
        });
        return {success: true, message: (await res).data.message};
    } catch(error) {
        console.log('Erreur inattendue');
        return {success: false};
    }
};

// Verification de compte
export const verificationEmail = async (token) => {
    try {
        const res = await axios.get(`${API_URL}/verificationtoken?token=${token}`);
        if (res.status === 200) return { success: true, message: res.data.message, user: res.data.user };
        else return { success: false, message: res.data.message }

    } catch (error) {
        console.log("PROBLEME", error);
        return { success: false, message: error.response?.message || 'Erreur serveur' }
    }
}

// me
export const me = async () => {
    try {
        const res = await axios.get(API_URL + '/me', { withCredentials: true });
        return { success: true, message: res.data.message, user: res.data.user };
    } catch (error) {
        return { success: false, message: error.response?.message || 'Erreur interne front' };
    }
};