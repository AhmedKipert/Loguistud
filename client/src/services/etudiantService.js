import axios from "axios"
const API_URL = 'http://localhost:3002/api/etudiants'
axios.defaults.withCredentials = true;

export const inscriptionEtudiant = async (informations) => {
    try {
        const res = await axios.post(API_URL + '/inscription', informations, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.status === 201) return { success: true, message: res.data.message };
        else return { success: false, message: res.data.message };

    } catch (error) {
        console.log("ERREUR LORS DU FETCH CATCH", error);
        return { success: false, message: 'Erreur inconnu' }
    }
};

// Modification des informations personnelles
export const editerMesInformations = async (informations) => {
    try {
        const res = await axios.put(API_URL + '/editer-Informations-personnelles', informations, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return { success: true, message: res.data.message };

    } catch (error) {
        console.log("ERREUR LORS DU FETCH CATCH", error);
        return {
            success: false,
            message: error.response?.data?.message || 'Erreur lors de la modification'
        }
    }
};


// Modification de l'email
export const modifierMonEmail = async (email) => {
    try {
        const res = await axios.put(API_URL + '/modifier-email', email);

        return {
            success: true,
            message: res.data.message,
            data: res.data.data
        };

    } catch (error) {
        console.log("ERREUR LORS DE LA MODIFICATION DE L'EMAIL", error);
        return {
            success: false,
            message: error.response?.data?.message || 'Erreur lors de la modification de l\'email'
        };
    }
};

// Modification du mot de passe
export const modifierMonMotDePasse = async (motdepasse) => {
    try {
        const res = await axios.put(API_URL + '/modifier-motdepasse', motdepasse);

        return {
            success: true,
            message: res.data.message
        };

    } catch (error) {
        console.log("ERREUR LORS DE LA MODIFICATION DU MOT DE PASSE", error);
        return {
            success: false,
            message: error.response?.data?.message || 'Erreur lors de la modification du mot de passe'
        };
    }
};