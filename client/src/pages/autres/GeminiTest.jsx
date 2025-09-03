import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormulaireLogement = () => {
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        type: '',
        surface: '',
        latitude: '',
        longitude: ''
    });
    const [description, setDescription] = useState('')

    const [loadingDescription, setLoadingDescription] = useState(false);

    // Récupération de la position actuelle dès que le composant est monté
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setFormData(prev => ({
                        ...prev,
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }));
                },
                (err) => {
                    console.error('Impossible de récupérer la position :', err);
                }
            );
        }
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const genererDescription = async () => {
  try {
    const res = await axios.post("http://localhost:3002/api/gemini/descriptionZone", {
      latitude: formData.latitude,
      longitude: formData.longitude
    });

    console.log("Réponse Gemini:", res.data.text);
    setDescription(res.data.text);

  } catch (err) {
    console.error("Erreur génération description :", err);
    setDescription("Erreur lors de la génération.");
  }
};



    return (
        <div className="form-step active" id="step1">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 p-2 bg-gray-100">
                Informations de base
            </h2>

            <div className="space-y-6">

                {/* Titre */}
                <div>
                    <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
                        Titre de l'annonce *
                    </label>
                    <input
                        type="text"
                        id="titre"
                        name="titre"
                        value={formData.titre}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        placeholder="Ex: Jolie chambre étudiante près de l'université"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description détaillée *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        placeholder="Décrivez votre logement en détail (surface, ambiance, quartier...)"
                    />
                    <button
                        type="button"
                        onClick={genererDescription}
                        disabled={loadingDescription}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {loadingDescription ? 'Génération...' : 'Générer description automatiquement'}
                    </button>
                    <p className="text-xs mt-1 text-gray-500">
                        ⚠ La description est générée automatiquement et peut être approximative.
                    </p>
                </div>

                {/* Type et Surface */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                            Type de logement *
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                        >
                            <option value="" disabled>Sélectionnez</option>
                            <option>Chambre individuelle</option>
                            <option>Chambre en colocation</option>
                            <option>Studio</option>
                            <option>Appartement</option>
                            <option>Maison</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="surface" className="block text-sm font-medium text-gray-700 mb-2">
                            Surface (m²) *
                        </label>
                        <input
                            type="number"
                            id="surface"
                            name="surface"
                            value={formData.surface}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            placeholder="Ex: 20"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FormulaireLogement;
