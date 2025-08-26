import axios from "axios"

// CREATION D'UNE ANNONCE
export const creerLogement = async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/logements/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res.status === 200) {
            return { success: true, message: res.data.message, annonce: res.data.logement };
        }
    } catch (error) {
        console.log("Erreur interne: ", error);
        return { success: false, message: error.response?.message || 'erreur interne' };
    }
};

// LISTE DES LOGEMENTS
export const listeLogements = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/logements`);
        return { success: true, message: res.data.message, logements: res.data.logements };
    } catch (error) {
        console.log('Erreur interne:', error);
        return {success: false, message: error.response?.message || 'Erreur interne'};
    }
};

export const logementUnique = async(id) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/logements/${id}`);
        return {success: true, message: res.data.message, logement: res.data.logement};
    } catch (error) {
        console.log('Erreur interne:', error );
        return {success: false, message: error.response?.message || 'Erreur interne'}
    }
}