import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faBell, faChevronDown, faUser, faCog, faSignOutAlt,
  faTachometerAlt, faPlusCircle, faEnvelope, faCalendarAlt,
  faChartLine, faWallet, faQuestionCircle, faHeadset,
  faPlus, faArrowUp, faCircle, faCheckCircle, faArrowRight,
  faEye, faEdit
} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Navbar from '../autres/Navbar';
import AuthContext from '../../context/AuthContext';
import { Loading } from '../autres/Loading';

const ProprietaireDashboard = () => {
  const [menuUtilisateurOuvert, setMenuUtilisateurOuvert] = useState(false);
  const { user, lien, loading } = useContext(AuthContext);
  if (!user.compte) return <Loading />
  // if(!user?.photoProfil) return <Loading/>
  console.log('Dashboard Loading: ', loading);
  console.log('Dashboard Propritaire:', user);
  // console.log('Voiciiiiiiiiiiiii:', user)
  // alert(loading + '---' + user);
  // Données simulées
  const donneesUtilisateur = {
    nom: "Mamadou Diallo",
    titre: "Propriétaire vérifié",
    pourcentageProfil: 85,
    avatar: "https://randomuser.me/api/portraits/men/42.jpg"
  };

  const statistiques = [
    { titre: "Annonces actives", valeur: 5, variation: "2 nouvelles cette semaine", icone: faHome, couleur: "#2C5CD5", tendance: "positive" },
    { titre: "Nouveaux messages", valeur: 12, variation: "3 non lus", icone: faEnvelope, couleur: "#3CB371", tendance: "neutre" },
    { titre: "Réservations", valeur: 3, variation: "2 confirmées", icone: faCalendarAlt, couleur: "#F6A34A", tendance: "positive" },
    { titre: "Revenus ce mois", valeur: "3 450 000 GNF", variation: "15% d'augmentation", icone: faWallet, couleur: "#3CB371", tendance: "positive" }
  ];

  const derniersMessages = [
    { nom: "Aïssatou Bah", message: "Bonjour, je suis intéressée par votre studio à Conakry. Est-il toujours disponible pour septembre ?", date: "Il y a 2 heures", avatar: "https://randomuser.me/api/portraits/women/32.jpg", nonLu: true },
    { nom: "Mohamed Camara", message: "Merci pour la visite hier. Je souhaite réserver la chambre en colocation.", date: "Hier, 18:30", avatar: "https://randomuser.me/api/portraits/men/22.jpg", nonLu: false },
    { nom: "Sékou Traoré", message: "Pouvez-vous m'envoyer plus de photos de l'appartement s'il vous plaît ?", date: "Hier, 10:15", avatar: "https://randomuser.me/api/portraits/men/45.jpg", nonLu: false }
  ];

  const annoncesRecentes = [
    {
      titre: "Studio moderne",
      lieu: "Conakry",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      statut: "Active",
      vues: 124,
      messages: 8
    },
    {
      titre: "Colocation 3 places",
      lieu: "Kindia",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      statut: "Active",
      vues: 87,
      messages: 5
    },
    {
      titre: "Appartement T2",
      lieu: "Kankan",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      statut: "En attente",
      vues: 42,
      messages: 3
    }
  ];

  const reservationsRecentes = [
    {
      titre: "Studio moderne",
      client: "Aïssatou Bah",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      prix: "750 000 GNF",
      statut: "Confirmée"
    },
    {
      titre: "Colocation 3 places",
      client: "Mohamed Camara",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      prix: "450 000 GNF",
      statut: "En attente"
    }
  ];

  // Animation des barres du graphique
  useEffect(() => {
    const timer = setTimeout(() => {
      const hauteurs = ["20%", "45%", "70%", "90%", "100%", "85%", "60%"];
      const barres = document.querySelectorAll('.barre-graphique');
      barres.forEach((barre, index) => {
        barre.style.height = hauteurs[index];
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Mise à jour dernier message
  const updateDernierMessage = (conversationId, contenu) => {
    setMesConversations(prev =>
      prev.map(conv => conv._id === conversationId ? { ...conv, dernierMessage: contenu } : conv)
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Barre de navigation */}
      <Navbar />

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    <img src={lien + '/' + user.compte.photoProfil} alt={user.compte.prenom} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{user.compte.prenom + ' ' + user.compte.nom}</h3>
                    <span className="text-xs text-[#3CB371] bg-[#3CB371]/10 px-2 py-1 rounded-full">
                      {donneesUtilisateur.titre}
                    </span>
                  </div>
                </div>
                <div className="progress-bar mb-1">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${donneesUtilisateur.pourcentageProfil}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">Profil complété à {donneesUtilisateur.pourcentageProfil}%</p>
              </div>

              <nav>
                <ul className="space-y-1">
                  <li>
                    <NavLink to={'/proprietaire/dashboard'} className="flex items-center space-x-3 px-3 py-2 bg-[#2C5CD5]/10 text-[#2C5CD5] rounded-lg font-medium">
                      <FontAwesomeIcon icon={faTachometerAlt} className="w-5" />
                      <span>Tableau de bord</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'annonces'}
                      end
                      className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
                    >
                      <FontAwesomeIcon icon={faHome} className="w-5" />
                      <span>Mes annonces</span>
                      <span className="ml-auto bg-[#3CB371] text-white text-xs px-2 py-1 rounded-full">5</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'annonces/creer'}
                      end
                      className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
                    >
                      <FontAwesomeIcon icon={faPlusCircle} className="w-5" />
                      <span>Créer une annonce</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="messagerie"
                      end
                      className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="w-5" />
                      <span>Messages</span>
                      <span className="ml-auto bg-[#F6A34A] text-white text-xs px-2 py-1 rounded-full">3</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'reservations'}
                      end
                      className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} className="w-5" />
                      <span>Réservations</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'statistiques'}
                      end
                      className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
                    >
                      <FontAwesomeIcon icon={faChartLine} className="w-5" />
                      <span>Statistiques</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="paiement"
                      end
                      className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
                    >
                      <FontAwesomeIcon icon={faWallet} className="w-5" />
                      <span>Paiements</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'parametres'}
                      end
                      className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
                    >
                      <FontAwesomeIcon icon={faCog} className="w-5" />
                      <span>Paramètres</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          {/* Contenu principal */}
          <Outlet context={{ updateDernierMessage }} />
        </div>
      </div >

      {/* Styles */}
      < style jsx > {`
        /* Animations personnalisées */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .progress-bar {
          height: 6px;
          border-radius: 3px;
          background-color: #e0e0e0;
          overflow: hidden;
        }
        
        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, #2C5CD5 0%, #3CB371 100%);
          transition: width 0.6s ease;
        }
        
        .notification-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background-color: #F6A34A;
          border-radius: 50%;
          border: 2px solid white;
        }
        
        .chart-container {
          position: relative;
          height: 250px;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style >
    </div >
  );
};

export default ProprietaireDashboard;