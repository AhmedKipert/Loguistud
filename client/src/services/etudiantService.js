import axios from "axios"
const API_URL = 'http://localhost:3002/api/etudiants'

export const inscriptionEtudiant = async (data) => {
    try {
        const res = await axios.post(API_URL + '/inscription', data, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.status === 201) return { success: true, message: res.data.message };
        else return { success: false, message: res.data.message };

    } catch (error) {
        console.log("ERREUR LORS DU FETCH CATCH", error);
        return { success: false, message: 'Erreur inconnu' }
    }
};

