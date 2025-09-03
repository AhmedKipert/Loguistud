const axios = require('axios');

exports.descriptionZone = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const API_KEY = "AIzaSyAXm6LTcEEANt3C7e1dOTeO9v5BVV6Wids";

        const prompt = `Tu es un guide local en Guinée. 
Donne une courte description (3 à 5 phrases) de la zone autour de ces coordonnées GPS :
latitude ${9.64652}, longitude ${-13.56987}.

La description doit être :
- Simple et compréhensible pour des étudiants.
- Mentionner les caractéristiques principales du quartier (ex : proximité des universités, écoles, commerces, transports, ambiance, sécurité, etc.).
- Indiquer si c’est un endroit pratique pour vivre en colocation étudiante.`;


        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const texte = response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Pas de description générée.";

        res.json({ text: texte });

    } catch (err) {
        console.error("ERREUR GEMINI:", err.response?.data || err.message);
        res.status(500).json({ error: "Erreur interne", details: err.response?.data || err.message });
    }
}
