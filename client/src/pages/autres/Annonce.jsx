import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faFilter, faChevronLeft, faChevronRight,
  faThLarge, faList, faMapMarkerAlt, faHeart as faHeartSolid,
  faUniversity, faWifi, faShieldAlt, faTshirt,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Navbar from './Navbar';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { listeLogements } from '../../services/logementService';

const Annonce = () => {
  const [favoris, setFavoris] = useState({});
  const [vueActive, setVueActive] = useState('liste');
  const [pageActive, setPageActive] = useState(1);
  const [logements, setLogements] = useState([]);
  const navigate = useNavigate();
  // Données simulées
  const filtresRapides = [
    { icone: faUniversity, couleur: '#3CB371', texte: 'Proche université' },
    { icone: faWifi, couleur: '#F6A34A', texte: 'Internet inclus' },
    { icone: faShieldAlt, couleur: '#2C5CD5', texte: 'Sécurisé' },
    { icone: faTshirt, couleur: '#3CB371', texte: 'Lave-linge' }
  ];
  const lien = import.meta.env.VITE_API_URL;

  const annonces = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      titre: 'Studio moderne',
      prix: '750 000 GNF',
      localisation: "Conakry, 10min de l'UGANC",
      tags: ['20 m²', '1 pièce', 'Meublé', 'Climatisé'],
      proprietaire: {
        nom: 'M. Diallo',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      badge: { texte: 'Nouveau', couleur: '#F6A34A' }
    },
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      titre: 'Studio moderne',
      prix: '750 000 GNF',
      localisation: "Conakry, 10min de l'UGANC",
      tags: ['20 m²', '1 pièce', 'Meublé', 'Climatisé'],
      proprietaire: {
        nom: 'M. Diallo',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      badge: { texte: 'Nouveau', couleur: '#F6A34A' }
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      titre: 'Colocation 3 places',
      prix: '450 000 GNF/pers',
      localisation: 'Kindia, près du campus',
      tags: ['75 m²', '3 chambres', 'Meublé', 'Jardin'],
      proprietaire: {
        nom: 'Mme. Bah',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      badge: { texte: 'Vérifié', couleur: '#3CB371' }
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      titre: 'Appartement T2',
      prix: '950 000 GNF',
      localisation: 'Kankan, centre-ville',
      tags: ['45 m²', '2 pièces', 'Meublé', 'Balcon'],
      proprietaire: {
        nom: 'M. Camara',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
      }
    }
  ];

  useEffect(() => {
    const liste = async () => {
      listeLogements()
        .then(data => {
          if (data.success) {
            setLogements(data.logements);
          } else {
            return navigate('/500');
          }
        });
    }

    liste();
  }, [])

  // Gestion des favoris
  const toggleFavori = (id) => {
    setFavoris(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Animation au scroll
  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.card-animate');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-gray-50">
      <Navbar />
      {/* Section Filtres */}
      <section className="bg-white shadow-sm z-20 pt-4 pb-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
              <FontAwesomeIcon icon={faHome} className="text-[#2C5CD5] mr-2" />
              <span>Nos <span className="text-[#2C5CD5]">annonces</span> disponibles</span>
            </h1>

            <div className="flex items-center space-x-3">
              <span className="text-gray-600 hidden md:block">Trier par :</span>
              <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent">
                <option>Pertinence</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Date récente</option>
                <option>Proximité</option>
              </select>
            </div>
          </div>

          {/* Filtres avancés */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2">
                  <option>Toute la Guinée</option>
                  <option>Conakry</option>
                  <option>Kindia</option>
                  <option>Kankan</option>
                  <option>Labé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type de logement</label>
                <select className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2">
                  <option>Tous types</option>
                  <option>Chambre individuelle</option>
                  <option>Colocation</option>
                  <option>Studio</option>
                  <option>Appartement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget mensuel</label>
                <div className="flex items-center space-x-2">
                  <input type="number" placeholder="Min" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2" />
                  <span>-</span>
                  <input type="number" placeholder="Max" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2" />
                </div>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center">
                  <FontAwesomeIcon icon={faFilter} className="mr-2" />
                  Appliquer
                </button>
              </div>
            </div>

            {/* Filtres rapides */}
            <div className="mt-4 flex flex-wrap gap-2">
              {filtresRapides.map((filtre, index) => (
                <button
                  key={index}
                  className="tag-animation px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  style={{
                    backgroundColor: `${filtre.couleur}10`,
                    color: filtre.couleur
                  }}
                >
                  <FontAwesomeIcon icon={filtre.icone} className="mr-1" />
                  {filtre.texte}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Résultats */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Résumé des résultats */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-[#2C5CD5]">1 248</span> résultats trouvés
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Vue :</span>
              <button
                className={`p-2 rounded-lg border ${vueActive === 'grille' ? 'bg-[#2C5CD5] text-white' : 'bg-white border-gray-300 text-gray-700'}`}
                onClick={() => setVueActive('grille')}
              >
                <FontAwesomeIcon icon={faThLarge} />
              </button>
              <button
                className={`p-2 rounded-lg border ${vueActive === 'liste' ? 'bg-[#2C5CD5] text-white' : 'bg-white border-gray-300 text-gray-700'}`}
                onClick={() => setVueActive('liste')}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
              <button
                className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700"
                onClick={() => setVueActive('carte')}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </button>
            </div>
          </div>

          {/* Grille d'annonces */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="annonces-container">
            {logements?.length > 0 && logements.map((logement, index) => (
              <div
                key={index}
                className="card-animate bg-white rounded-xl overflow-hidden shadow-md card-hover"
                style={{
                  animationDelay: `${0.1 + index * 0.1}s`,
                  opacity: 0
                }}
              >
                <div className="relative">
                  <img
                    src={lien + '/' + logement.photos[0]}
                    alt={logements.titre}
                    className="w-full h-48 object-cover"
                  />
                  {!logement.badge && (
                    <div
                      className="absolute top-3 left-3 text-white px-2 py-1 rounded text-xs font-bold"
                    // style={{ backgroundColor: annonce.badge.couleur }}
                    >
                      {/* {annonce.badge.texte} */} badge ici
                    </div>
                  )}
                  <button
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow"
                    onClick={() => toggleFavori(logement.id)}
                  >
                    <FontAwesomeIcon
                      icon={favoris[logement.id] ? faHeartSolid : faHeartRegular}
                      className={favoris[logement.id] ? 'text-[#F6A34A]' : ''}
                    />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{logement.titre}</h3>
                    <p className="text-lg font-bold text-[#2C5CD5]">{logement.prix} GNF</p>
                  </div>
                  <p className="text-g  ray-600 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#3CB371] mr-2" />
                    {logement.ville}, {logement.quartier}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#F0F0F0] text-gray-700 px-2 py-1 rounded text-xs">
                      {logement.surface} m²
                    </span>
                    {logement.caracteristiques.equipements.map((tag, i) => (
                      <span key={i} className="bg-[#F0F0F0] text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                        <img src={lien + '/' + logement.proprietaire?.photoProfil} alt="Propriétaire" />
                      </div>
                      <span className="text-sm text-gray-600">{logement.proprietaire?.prenom}</span>
                    </div>
                    <NavLink to={`/annonces/${logement._id}`} className="text-[#2C5CD5] hover:text-[#2351C0] font-medium flex items-center">
                      Voir plus <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination avancée */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Affichage de <span className="font-semibold">1-6</span> sur <span className="font-semibold">{logements.length}</span> résultats
            </div>

            <div className="flex items-center space-x-1">
              <button
                className="pagination-link w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setPageActive(Math.max(1, pageActive - 1))}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className={`pagination-link w-10 h-10 flex items-center justify-center rounded-lg ${page === pageActive ? 'bg-[#2C5CD5] text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                  onClick={() => setPageActive(page)}
                >
                  {page}
                </button>
              ))}

              <span className="px-2">...</span>

              <button
                className="pagination-link w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700"
                onClick={() => setPageActive(24)}
              >
                24
              </button>

              <button
                className="pagination-link w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setPageActive(pageActive + 1)}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent">
              <option>6 par page</option>
              <option>12 par page</option>
              <option>24 par page</option>
              <option>48 par page</option>
            </select>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .card-animate {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .pagination-link {
          transition: all 0.3s;
        }
        
        .pagination-link:hover:not(.active) {
          background-color: #f0f0f0;
          transform: scale(1.05);
        }
        
        .tag-animation {
          transition: all 0.3s;
        }
        
        .tag-animation:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Annonce;