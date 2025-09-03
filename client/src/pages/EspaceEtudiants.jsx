import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faFilter, faUsers, faHome, 
  faBook, faGraduationCap, faMapMarkerAlt,
  faStar, faComment, faHeart, faShare,
  faCalendarAlt, faMoneyBillWave, faUserFriends
} from '@fortawesome/free-solid-svg-icons';

const EspaceEtudiants = () => {
  const [activeSection, setActiveSection] = useState('accueil');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    universite: '',
    filiere: '',
    prixMax: '',
    typeLogement: ''
  });

  // Données simulées pour les étudiants
  const [etudiants, setEtudiants] = useState([]);
  const [colocations, setColocations] = useState([]);
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    // Chargement des données simulées
    const etudiantsSimules = [
      {
        id: 1,
        nom: 'Mamadou Diallo',
        universite: 'Université Gamal Abdel Nasser',
        filiere: 'Informatique',
        niveau: 'L3',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        bio: 'Je recherche une colocation près du campus pour l\'année universitaire.',
        interests: ['Sport', 'Musique', 'Voyages'],
        rating: 4.5
      },
      {
        id: 2,
        nom: 'Aïssatou Bah',
        universite: 'Université Sonfonia',
        filiere: 'Droit',
        niveau: 'M1',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        bio: 'Étudiante sérieuse cherche colocataire pour appartement à Conakry.',
        interests: ['Lecture', 'Cinéma', 'Cuisine'],
        rating: 4.8
      },
      {
        id: 3,
        nom: 'Sékou Camara',
        universite: 'Université Julius Nyerere',
        filiere: 'Économie',
        niveau: 'L2',
        photo: 'https://randomuser.me/api/portraits/men/52.jpg',
        bio: 'Passionné de basketball, je cherche un logement pas cher à Kindia.',
        interests: ['Basketball', 'Photographie', 'Technologie'],
        rating: 4.2
      }
    ];

    const colocationsSimulees = [
      {
        id: 1,
        titre: 'Colocation 3 chambres à Conakry',
        prix: '250 000 GNF/mois',
        lieu: 'Conakry, près de l\'Université Gamal',
        description: 'Appartement spacieux avec 3 chambres, salon commun et cuisine équipée. Idéal pour étudiants.',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        placesDisponibles: 2,
        equipements: ['Wi-Fi', 'Eau courante', 'Électricité', 'Cuisine équipée']
      },
      {
        id: 2,
        titre: 'Studio meublé pour étudiant',
        prix: '350 000 GNF/mois',
        lieu: 'Kindia, centre-ville',
        description: 'Studio entièrement meublé avec kitchenette et salle de bain privative. Calme et sécurisé.',
        image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        placesDisponibles: 1,
        equipements: ['Meublé', 'Salle de bain privative', 'Sécurité 24/7', 'Proche transport']
      }
    ];

    const ressourcesSimulees = [
      {
        id: 1,
        titre: 'Guide de recherche de logement étudiant',
        type: 'Guide',
        description: 'Conseils pratiques pour trouver un logement adapté à ton budget et à tes besoins.',
        icon: faBook
      },
      {
        id: 2,
        titre: 'Bourses et aides financières',
        type: 'Finance',
        description: 'Liste des bourses disponibles pour les étudiants guinéens.',
        icon: faMoneyBillWave
      },
      {
        id: 3,
        titre: 'Événements étudiants',
        type: 'Événement',
        description: 'Découvre les prochains événements organisés pour les étudiants.',
        icon: faCalendarAlt
      }
    ];

    setEtudiants(etudiantsSimules);
    setColocations(colocationsSimulees);
    setRessources(ressourcesSimulees);
  }, []);

  // Navigation sections
  const sections = [
    { id: 'accueil', label: 'Accueil', icon: faHome },
    { id: 'etudiants', label: 'Étudiants', icon: faUsers },
    { id: 'colocations', label: 'Colocations', icon: faUserFriends },
    { id: 'ressources', label: 'Ressources', icon: faBook },
    { id: 'forum', label: 'Forum', icon: faComment }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête de l'espace étudiant */}
      <div className="bg-[#2C5CD5] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Espace Étudiants</h1>
          <p className="text-xl opacity-90">
            Connecte-toi avec d'autres étudiants, trouve ta colocation idéale et découvre des ressources utiles
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {sections.map(section => (
              <button
                key={section.id}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                  activeSection === section.id
                    ? 'border-white text-[#2C5CD5]'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <FontAwesomeIcon icon={section.icon} className="w-4" />
                <span className="whitespace-nowrap">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher des étudiants, colocations, ressources..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-[#2C5CD5] text-white px-6 py-3 rounded-lg hover:bg-[#1a4bbd] transition flex items-center">
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              Filtres
            </button>
          </div>
        </div>

        {/* Section Accueil */}
        {activeSection === 'accueil' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Carte statistiques */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Étudiants inscrits</h3>
                  <div className="w-12 h-12 rounded-full bg-[#2C5CD5]/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUsers} className="text-[#2C5CD5] text-xl" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">1,245</p>
                <p className="text-sm text-gray-500">+32 cette semaine</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Colocations actives</h3>
                  <div className="w-12 h-12 rounded-full bg-[#3CB371]/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faHome} className="text-[#3CB371] text-xl" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">89</p>
                <p className="text-sm text-gray-500">+5 nouvelles cette semaine</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Universités partenaires</h3>
                  <div className="w-12 h-12 rounded-full bg-[#F6A34A]/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-[#F6A34A] text-xl" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">12</p>
                <p className="text-sm text-gray-500">à travers la Guinée</p>
              </div>
            </div>

            {/* Colocations populaires */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Colocations populaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {colocations.slice(0, 2).map(coloc => (
                  <div key={coloc.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                    <div className="h-48 overflow-hidden">
                      <img src={coloc.image} alt={coloc.titre} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{coloc.titre}</h3>
                      <p className="text-[#2C5CD5] font-bold text-lg mb-2">{coloc.prix}</p>
                      <p className="text-gray-600 mb-4">{coloc.lieu}</p>
                      <div className="flex items-center justify-between">
                        <span className="bg-[#3CB371]/10 text-[#3CB371] px-3 py-1 rounded-full text-sm">
                          {coloc.placesDisponibles} place(s) disponible(s)
                        </span>
                        <button className="bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition">
                          Voir détails
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Étudiants récents */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nouveaux étudiants</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {etudiants.slice(0, 3).map(etudiant => (
                  <div key={etudiant.id} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mx-auto mb-4">
                      <img src={etudiant.photo} alt={etudiant.nom} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{etudiant.nom}</h3>
                    <p className="text-gray-600 mb-2">{etudiant.filiere} - {etudiant.niveau}</p>
                    <p className="text-gray-600 mb-4">{etudiant.universite}</p>
                    <div className="flex justify-center items-center mb-4">
                      {[1, 2, 3, 4, 5].map(star => (
                        <FontAwesomeIcon 
                          key={star} 
                          icon={faStar} 
                          className={star <= Math.floor(etudiant.rating) ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({etudiant.rating})</span>
                    </div>
                    <button className="bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition">
                      Contacter
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Section Étudiants */}
        {activeSection === 'etudiants' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Trouve des colocataires</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {etudiants.map(etudiant => (
                <div key={etudiant.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                      <img src={etudiant.photo} alt={etudiant.nom} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{etudiant.nom}</h3>
                      <p className="text-gray-600">{etudiant.universite}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-800 font-medium mb-1">{etudiant.filiere} - {etudiant.niveau}</p>
                    <p className="text-gray-600 text-sm">{etudiant.bio}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <FontAwesomeIcon 
                          key={star} 
                          icon={faStar} 
                          className={star <= Math.floor(etudiant.rating) ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({etudiant.rating})</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Centres d'intérêt</h4>
                    <div className="flex flex-wrap gap-2">
                      {etudiant.interests.map((interest, index) => (
                        <span key={index} className="bg-[#F0F0F0] text-gray-700 px-3 py-1 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-[#2C5CD5] text-white py-2 rounded-lg hover:bg-[#1a4bbd] transition">
                      Contacter
                    </button>
                    <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                      <FontAwesomeIcon icon={faHeart} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Colocations */}
        {activeSection === 'colocations' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Colocations disponibles</h2>
            <div className="grid grid-cols-1 gap-6">
              {colocations.map(coloc => (
                <div key={coloc.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="h-48 md:h-full">
                        <img src={coloc.image} alt={coloc.titre} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{coloc.titre}</h3>
                      <p className="text-[#2C5CD5] font-bold text-lg mb-2">{coloc.prix}</p>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                        <span>{coloc.lieu}</span>
                      </div>

                      <p className="text-gray-600 mb-4">{coloc.description}</p>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Équipements inclus:</h4>
                        <div className="flex flex-wrap gap-2">
                          {coloc.equipements.map((equip, index) => (
                            <span key={index} className="bg-[#3CB371]/10 text-[#3CB371] px-3 py-1 rounded-full text-sm">
                              {equip}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="bg-[#3CB371]/10 text-[#3CB371] px-3 py-1 rounded-full text-sm">
                          {coloc.placesDisponibles} place(s) disponible(s)
                        </span>
                        <div className="flex space-x-2">
                          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                            <FontAwesomeIcon icon={faHeart} className="mr-2" />
                            Sauvegarder
                          </button>
                          <button className="bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition">
                            Contacter le propriétaire
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Ressources */}
        {activeSection === 'ressources' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ressources pour étudiants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ressources.map(ressource => (
                <div key={ressource.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-lg bg-[#2C5CD5]/10 flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={ressource.icon} className="text-[#2C5CD5] text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{ressource.titre}</h3>
                  <p className="text-gray-600 mb-4">{ressource.description}</p>
                  <span className="inline-block bg-[#F0F0F0] text-gray-700 px-3 py-1 rounded-full text-sm mb-4">
                    {ressource.type}
                  </span>
                  <button className="text-[#2C5CD5] font-medium hover:text-[#1a4bbd] transition">
                    Voir plus →
                  </button>
                </div>
              ))}
            </div>

            {/* Guides supplémentaires */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Guides pratiques</h3>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-[#3CB371]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="text-[#3CB371]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Gérer son budget étudiant</h4>
                      <p className="text-gray-600">Conseils pour bien gérer tes finances pendant tes études.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-[#F6A34A]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <FontAwesomeIcon icon={faHome} className="text-[#F6A34A]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Checklist emménagement</h4>
                      <p className="text-gray-600">Tout ce qu'il faut vérifier avant de signer un bail.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Forum */}
        {activeSection === 'forum' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Forum des étudiants</h2>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <input 
                  type="text" 
                  placeholder="Pose une question à la communauté..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                />
              </div>
              <div className="flex justify-end">
                <button className="bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition">
                  Publier
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Comment trouver un logement pas cher près de l'UGANC?</h4>
                    <p className="text-gray-600 text-sm">Posté par Mohamed • Il y a 2 heures</p>
                  </div>
                </div>
                <p className="text-gray-800 mb-4">
                  Je commence mes études à l'UGANC le mois prochain et je cherche un logement abordable...
                </p>
                <div className="flex items-center space-x-4 text-gray-600">
                  <button className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faComment} />
                    <span>12 réponses</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>8 j'aime</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faShare} />
                    <span>Partager</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Recherche colocataire pour appartement à Kindia</h4>
                    <p className="text-gray-600 text-sm">Posté par Fatoumata • Il y a 1 jour</p>
                  </div>
                </div>
                <p className="text-gray-800 mb-4">
                  Nous avons un appartement de 3 chambres à Kindia, il reste une place disponible...
                </p>
                <div className="flex items-center space-x-4 text-gray-600">
                  <button className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faComment} />
                    <span>5 réponses</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>3 j'aime</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faShare} />
                    <span>Partager</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EspaceEtudiants;