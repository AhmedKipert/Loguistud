import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt, faCheckCircle, faHome, faBolt,
  faRulerCombined, faDoorOpen, faBed, faCalendarAlt,
  faWifi, faFan, faTshirt, faBlender, faLock, faWater,
  faUniversity, faStore, faBus, faUserCircle, faStar, faStarHalfAlt,
  faPhoneAlt, faEnvelope, faClock, faCommentDots, faCalendarCheck,
  faShieldAlt, faImages
} from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { logementUnique } from '../../services/logementService';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Loading } from './Loading';
import { conversation } from '../../services/conversationService';
import LocalisationLogement from './LocalisationLogement';
import MapView from './MapView';

const DetailAnnonce = () => {
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  // Charger les informations du logement
  useEffect(() => {
    const logement = async () => {
      logementUnique(id)
        .then(data => {
          if (data.success) {
            setAnnonce(data.logement);
            console.log('details annonce: ', data.logement)
            setLoading(false);
          } else {
            setLoading(false);
            alert('on a un problème ici')
            return navigate('/404');
          }
        });
    };

    logement();
  }, []);


  const handleConversation = async () => {
    const res = await conversation(annonce.proprietaire._id);
    if (res.success) {
      alert('Voici ID de la conversaton: ' + res.conversation._id);
      navigate('/etudiant/dashboard/messagerie/' + res.conversation._id);
    } else {
      alert(res.message);
    }
  }

  if (loading) return <Loading />

  return (
    <div className="bg-gray-50">
      {/* En-tête */}
      <Navbar />

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Section gauche (70%) */}
          <div className="lg:w-2/3">
            {/* Titre et prix */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{annonce.titre}</h1>
                <div className="flex items-center text-gray-600">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 mr-2" />
                  <span>{annonce.ville}, {annonce.quartier} - 10 min à pied de l'université</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-2xl font-bold text-blue-600">{annonce.prix} GNF <span className="text-lg font-normal text-gray-600">/mois</span></p>
                <p className="text-sm text-gray-500 text-right">{annonce.charge ? "Charges incluses" : ''}</p>
              </div>
            </div>

            {/* Galerie d'images */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2 h-64 md:h-80 rounded-xl overflow-hidden animate-card" style={{ animationDelay: '0.1s' }}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${annonce.photos[0]}`}
                    alt="Studio moderne - Vue principale"
                    className="w-full h-full object-cover gallery-image hover:scale-102 hover:shadow-lg transition-transform duration-300 cursor-pointer"
                  />
                </div>
                <div className="h-48 rounded-xl overflow-hidden animate-card" style={{ animationDelay: '0.2s' }}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${annonce.photos[1]}`}
                    alt="Cuisine équipée"
                    className="w-full h-full object-cover gallery-image hover:scale-102 hover:shadow-lg transition-transform duration-300 cursor-pointer"
                  />
                </div>
                <div className="h-48 rounded-xl overflow-hidden animate-card" style={{ animationDelay: '0.3s' }}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${annonce.photos[2]}`} alt="Salle de bain moderne"
                    className="w-full h-full object-cover gallery-image hover:scale-102 hover:shadow-lg duration-300 cursor-pointer"
                  />
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                <FontAwesomeIcon icon={faImages} className="mr-2" /> Voir toutes les photos (12)
              </button>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-card" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-orange-500">
                Description
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p>{annonce.description}</p>

                <p className="mt-4"><strong>Disponible immédiatement</strong> pour une location à l'année universitaire. Le prix inclut l'accès à la wifi haut débit, l'eau courante 24h/24 et l'électricité (avec limite raisonnable).</p>

                <h3 className="text-lg font-semibold mt-6">Points forts :</h3>
                <ul className="list-disc pl-5 mt-2">
                  <li>Proximité exceptionnelle avec le campus universitaire</li>
                  <li>Immeuble sécurisé avec gardien 24h/24</li>
                  <li>Espace optimisé avec rangements intelligents</li>
                  <li>Voisinage étudiant et ambiance conviviale</li>
                </ul>
              </div>
            </div>

            {/* Caractéristiques */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-card" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-green-500">
                Caractéristiques
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faRulerCombined} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Surface</p>
                    <p className="font-medium">{annonce.surface} m²</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faDoorOpen} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{annonce.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faBed} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Meublé</p>
                    <p className="font-medium">Complètement</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Disponibilité</p>
                    <p className="font-medium">Immédiate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-card" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">
                Équipements inclus
              </h2>
              <div className="flex flex-wrap gap-3">
                <span className="feature-badge bg-gray-100 px-4 py-2 rounded-full flex items-center hover:-translate-y-1 hover:shadow-md ">
                  <FontAwesomeIcon icon={faWifi} className="text-blue-600 mr-2" /> Wifi
                </span>
                <span className="feature-badge bg-gray-100 px-4 py-2 rounded-full flex items-center hover:-translate-y-1 hover:shadow-md ">
                  <FontAwesomeIcon icon={faFan} className="text-green-500 mr-2" /> Climatisation
                </span>
                <span className="feature-badge bg-gray-100 px-4 py-2 rounded-full flex items-center hover:-translate-y-1 hover:shadow-md ">
                  <FontAwesomeIcon icon={faTshirt} className="text-orange-500 mr-2" /> Machine à laver
                </span>
                <span className="feature-badge bg-gray-100 px-4 py-2 rounded-full flex items-center hover:-translate-y-1 hover:shadow-md ">
                  <FontAwesomeIcon icon={faBlender} className="text-blue-600 mr-2" /> Équipement cuisine
                </span>
                <span className="feature-badge bg-gray-100 px-4 py-2 rounded-full flex items-center hover:-translate-y-1 hover:shadow-md">
                  <FontAwesomeIcon icon={faLock} className="text-green-500 mr-2" /> Sécurité 24/7
                </span>
                <span className="feature-badge bg-gray-100 px-4 py-2 rounded-full flex items-center hover:-translate-y-1 hover:shadow-md">
                  <FontAwesomeIcon icon={faWater} className="text-blue-600 mr-2" /> Eau courante
                </span>
              </div>
            </div>

            {/* Localisation */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-card" style={{ animationDelay: '0.7s' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-green-500">
                Localisation
              </h2>
              <div className="h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <FontAwesomeIcon icon="map-marked-alt" className="text-4xl text-gray-400" />
                
                {annonce && <MapView latitude={annonce.localisation[1]} longitude={annonce.localisation[0]} />}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <FontAwesomeIcon icon={faUniversity} className="text-blue-600 mr-1" /> 10 min de l'UGANC
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <FontAwesomeIcon icon={faStore} className="text-green-500 mr-1" /> Supermarché à 5 min
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <FontAwesomeIcon icon={faBus} className="text-orange-500 mr-1" /> Arrêt de bus devant
                </span>
              </div>
            </div>
          </div>

          {/* Section droite (30%) - Contact & Propriétaire */}
          <div className="lg:w-1/3">
            <div className="sticky top-5">
              {/* Carte Contact */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 animate-card" style={{ animationDelay: '0.8s' }}>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                  <h3 className="text-lg font-bold flex items-center">
                    <FontAwesomeIcon icon={faUserCircle} className="mr-2" /> Propriétaire
                  </h3>
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600 mr-4">
                      <img src={annonce.proprietaire.photoProfil && `${import.meta.env.VITE_API_URL}/${annonce.proprietaire.photoProfil}`} alt={annonce.proprietaire.nom} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{annonce.proprietaire.prenom.charAt(0)}. {annonce.proprietaire.nom}</h4>
                      <p className="text-gray-600 text-sm">Membre depuis 2021</p>
                      <div className="flex mt-1">
                        <FontAwesomeIcon icon={faStar} className="text-orange-500 text-sm" />
                        <FontAwesomeIcon icon={faStar} className="text-orange-500 text-sm" />
                        <FontAwesomeIcon icon={faStar} className="text-orange-500 text-sm" />
                        <FontAwesomeIcon icon={faStar} className="text-orange-500 text-sm" />
                        <FontAwesomeIcon icon={faStarHalfAlt} className="text-orange-500 text-sm" />
                        <span className="text-gray-600 text-sm ml-1">4.7 (12 avis)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <a href="tel:+224612345678" className="flex items-center text-gray-700 hover:text-blue-600">
                      <FontAwesomeIcon icon={faPhoneAlt} className="text-green-500 mr-3 w-5" />
                      <span>{annonce.proprietaire.telephone}</span>
                    </a>
                    <a href="mailto:contact@example.com" className="flex items-center text-gray-700 hover:text-blue-600">
                      <FontAwesomeIcon icon={faEnvelope} className="text-green-500 mr-3 w-5" />
                      <span>{annonce.proprietaire.email}</span>
                    </a>
                    <div className="flex items-center text-gray-700">
                      <FontAwesomeIcon icon={faClock} className="text-green-500 mr-3 w-5" />
                      <span>Disponible 8h-20h</span>
                    </div>
                  </div>

                  <button onClick={handleConversation} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold mb-3  flex items-center justify-center">
                    <FontAwesomeIcon icon={faCommentDots} className="mr-2" /> Envoyer un message
                  </button>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold  flex items-center justify-center">
                    <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /> Appeler maintenant
                  </button>
                </div>
              </div>

              {/* Carte Visite */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden animate-card" style={{ animationDelay: '0.9s' }}>
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4 text-white">
                  <h3 className="text-lg font-bold flex items-center">
                    <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" /> Demander une visite
                  </h3>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Date souhaitée</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Créneau horaire</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>Matin (8h-12h)</option>
                      <option>Après-midi (14h-18h)</option>
                      <option>Soirée (18h-20h)</option>
                    </select>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold">
                    Demander une visite
                  </button>
                </div>
              </div>

              {/* Carte Sécurité */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6 p-5 animate-card" style={{ animationDelay: '1s' }}>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">Conseils de sécurité</h4>
                    <p className="text-gray-600 text-sm">
                      Ne transférez jamais d'argent avant d'avoir visité le logement. Privilégiez les rencontres en journée dans des lieux publics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <Footer />

      {/* Styles globaux */}
      {/* <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-card {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .gallery-image {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .feature-badge {
          transition: all 0.3s;
        }
      `}</style> */}
    </div>
  );
};

export default DetailAnnonce;