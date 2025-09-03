import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faMapMarkerAlt, faEdit, faArrowLeft,
  faWifi, faFaucet, faBolt, faSnowflake, faFan, faCouch,
  faUtensils, faBath, faShieldAlt, faCar, faTshirt, faChargingStation,
  faBed, faRuler, faCalendarAlt, faMoneyBillWave, faCheckCircle,
  faEye, faPhone, faEnvelope, faHeart
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmatonAction from '../../components/ConfirmationAction';

const ProprietaireDetailsAnnonce = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  // Données fictives pour simuler une annonce
  const annonce = {
    _id: '1',
    titre: 'Jolie studio meublé en centre-ville',
    description: 'Ce charmant studio entièrement meublé est situé en plein cœur de la ville, à proximité de tous les commerces et transports. Il dispose d\'une kitchenette équipée, d\'une salle de bain moderne et d\'un espace de vie lumineux. Parfait pour étudiant ou jeune professionnel.',
    type: 'Studio',
    surface: '30',
    prix: 1200000,
    charges: 'oui',
    disponibilite: '2024-09-01',
    ville: 'Conakry',
    quartier: 'Entag-Nord',
    adresse: 'Rue du Commerce, près du marché central',
    disponible: true,
    conditions: true,
    localisation: [-13.7129, 9.6412],
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1628592102751-ba83b0314276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    ],
    equipements: ['wifi', 'eau', 'electricite', 'climatisation', 'meuble', 'salle_bain', 'parking'],
    dateCreation: '2024-08-15',
    vues: 42,
    contacts: 5
  };

  // Liste des équipements (identique à celle du formulaire de création)
  const equipements = [
    { id: 'wifi', nom: 'Wi-Fi', icone: faWifi },
    { id: 'eau', nom: 'Eau courante', icone: faFaucet },
    { id: 'electricite', nom: 'Électricité 24h/24', icone: faBolt },
    { id: 'climatisation', nom: 'Climatisation', icone: faSnowflake },
    { id: 'ventilateur', nom: 'Ventilateur', icone: faFan },
    { id: 'meuble', nom: 'Meublé', icone: faCouch },
    { id: 'cuisine', nom: 'Cuisine équipée', icone: faUtensils },
    { id: 'salle_bain', nom: 'Salle de bain privée', icone: faBath },
    { id: 'gardiennage', nom: 'Gardiennage', icone: faShieldAlt },
    { id: 'parking', nom: 'Parking', icone: faCar },
    { id: 'laverie', nom: 'Laverie', icone: faTshirt },
    { id: 'generateur', nom: 'Générateur', icone: faChargingStation }
  ];

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === annonce.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? annonce.photos.length - 1 : prev - 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec bouton retour */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            to={'/proprietaire/dashboard/annonces'}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Retour aux annonces
          </Link>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        {/* En-tête avec titre et statut */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{annonce.titre}</h1>
              <div className="flex items-center mt-2 text-gray-600">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                <span>{annonce.quartier}, {annonce.ville}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                annonce.disponible 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {annonce.disponible ? 'Disponible' : 'Non disponible'}
              </span>
              <button 
                onClick={() => navigate(`/modifier-annonce/${annonce._id}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Modifier
              </button>
              <button 
                onClick={toggleFavorite}
                className={`p-2 rounded-lg flex items-center ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale (2/3) */}
          <div className="lg:col-span-2">
            {/* Galerie photos */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="relative h-96">
                {annonce.photos && annonce.photos.length > 0 ? (
                  <>
                    <img 
                      src={annonce.photos[currentImageIndex]} 
                      alt={`Vue du logement ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {annonce.photos.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
                        >
                          <FontAwesomeIcon icon={faArrowLeft} className="rotate-180" />
                        </button>
                      </>
                    )}
                    
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {annonce.photos.length}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FontAwesomeIcon icon={faHome} className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Miniatures */}
              {annonce.photos && annonce.photos.length > 1 && (
                <div className="p-4 flex overflow-x-auto space-x-2">
                  {annonce.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded overflow-hidden transition-all ${
                        index === currentImageIndex ? 'ring-2 ring-blue-600 scale-105' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={photo} 
                        alt={`Miniature ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{annonce.description}</p>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Équipements et services</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {equipements.map(equipement => (
                  <div 
                    key={equipement.id} 
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      annonce.equipements.includes(equipement.id) 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <FontAwesomeIcon 
                      icon={equipement.icone} 
                      className={`mr-3 ${annonce.equipements.includes(equipement.id) ? 'text-blue-600' : 'text-gray-400'}`} 
                    />
                    <span className={annonce.equipements.includes(equipement.id) ? 'font-medium' : ''}>
                      {equipement.nom}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Localisation */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Localisation</h2>
              <div className="mb-4">
                <div className="flex items-center text-gray-700 mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-600" />
                  <span className="font-medium">Adresse:</span>
                  <span className="ml-2">{annonce.adresse || 'Non spécifiée'}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">Quartier:</span>
                  <span className="ml-2">{annonce.quartier}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">Ville:</span>
                  <span className="ml-2">{annonce.ville}</span>
                </div>
              </div>
              
              <div className="h-80 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="text-center p-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-4xl text-gray-400 mb-2" />
                  <p className="text-gray-500">Carte interactive (serait intégrée ici avec une vraie API)</p>
                  <p className="text-sm mt-2">Coordonnées: {annonce.localisation[0]}, {annonce.localisation[1]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne latérale (1/3) */}
          <div className="lg:col-span-1">
            {/* Informations principales */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Détails de l'offre</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="text-blue-600 mr-3" />
                    <span className="font-medium">Prix mensuel</span>
                  </div>
                  <span className="text-xl font-bold text-blue-700">
                    {annonce.prix?.toLocaleString('fr-FR')} GNF
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faRuler} className="text-gray-600 mr-3" />
                    <span>Surface</span>
                  </div>
                  <span className="font-medium">{annonce.surface} m²</span>
                </div>
                
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faHome} className="text-gray-600 mr-3" />
                    <span>Type</span>
                  </div>
                  <span className="font-medium">{annonce.type}</span>
                </div>
                
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-600 mr-3" />
                    <span>Disponible le</span>
                  </div>
                  <span className="font-medium">
                    {new Date(annonce.disponibilite).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-gray-600 mr-3" />
                    <span>Charges comprises</span>
                  </div>
                  <span className="font-medium">
                    {annonce.charges === 'oui' 
                      ? 'Oui' 
                      : annonce.charges === 'non' 
                        ? 'Non' 
                        : 'Partiellement'}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-700 mb-2">Statistiques de visites</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{annonce.vues}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center">
                      <FontAwesomeIcon icon={faEye} className="mr-1" /> Vues totales
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{annonce.contacts}</div>
                    <div className="text-sm text-gray-600 flex items-center justify-center">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-1" /> Demandes
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-700 mb-2">Contact</h3>
                <p className="text-gray-600 text-sm mb-4">Les visiteurs peuvent vous contacter via ces moyens :</p>
                
                <div className="space-y-3">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    Appeler maintenant
                  </button>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Envoyer un message
                  </button>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>Annonce créée le {new Date(annonce.dateCreation).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default ProprietaireDetailsAnnonce;