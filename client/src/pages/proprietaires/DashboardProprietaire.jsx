import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faBell, faChevronDown, faUser, faCog, faSignOutAlt, 
  faTachometerAlt, faPlusCircle, faEnvelope, faCalendarAlt, 
  faChartLine, faWallet, faQuestionCircle, faHeadset, 
  faPlus, faArrowUp, faCircle, faCheckCircle, faArrowRight, 
  faEye, faEdit
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from '../autres/Navbar';
import AuthContext from '../../context/AuthContext';
import { Loading } from '../autres/Loading';

const TableauDeBordProprietaire = () => {
  const [menuUtilisateurOuvert, setMenuUtilisateurOuvert] = useState(false);
  const {user, lien, loading} = useContext(AuthContext);
  if(!user.compte) return <Loading/>
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
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Barre de navigation */}
      <Navbar/>

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
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-[#2C5CD5]/10 text-[#2C5CD5] rounded-lg font-medium">
                      <FontAwesomeIcon icon={faTachometerAlt} className="w-5" />
                      <span>Tableau de bord</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FontAwesomeIcon icon={faHome} className="w-5" />
                      <span>Mes annonces</span>
                      <span className="ml-auto bg-[#3CB371] text-white text-xs px-2 py-1 rounded-full">5</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FontAwesomeIcon icon={faPlusCircle} className="w-5" />
                      <span>Créer une annonce</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FontAwesomeIcon icon={faEnvelope} className="w-5" />
                      <span>Messages</span>
                      <span className="ml-auto bg-[#F6A34A] text-white text-xs px-2 py-1 rounded-full">3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FontAwesomeIcon icon={faCalendarAlt} className="w-5" />
                      <span>Réservations</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FontAwesomeIcon icon={faChartLine} className="w-5" />
                      <span>Statistiques</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FontAwesomeIcon icon={faWallet} className="w-5" />
                      <span>Paiements</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FontAwesomeIcon icon={faCog} className="w-5" />
                      <span>Paramètres</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Bloc aide */}
            <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                <FontAwesomeIcon icon={faQuestionCircle} className="text-[#2C5CD5] mr-2" />
                <span>Aide & Support</span>
              </h3>
              <p className="text-sm text-gray-600 mb-3">Vous avez des questions sur l'utilisation de la plateforme ?</p>
              <button className="w-full bg-[#F0F0F0] hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition">
                <FontAwesomeIcon icon={faHeadset} className="mr-2" /> Contacter le support
              </button>
            </div>
          </aside>
          
          {/* Contenu principal */}
          <main className="flex-1">
            {/* En-tête */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Bienvenue, M. {user.compte.nom}</h1>
                  <p className="text-gray-600">Voici un résumé de votre activité sur LoguiStud</p>
                </div>
                <Link to={'/annonces/creer'} className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition flex items-center">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Nouvelle annonce
                </Link>
              </div>
            </div>
            
            {/* Cartes statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {statistiques.map((stat, index) => (
                <div 
                  key={index}
                  className="animate-fade-in bg-white rounded-xl shadow-sm p-6 card-hover" 
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.titre}</p>
                      <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.valeur}</h3>
                      <p className={`text-${stat.tendance === 'positive' ? '[#3CB371]' : stat.tendance === 'negative' ? 'red-500' : '[#F6A34A]'} text-xs mt-1 flex items-center`}>
                        {stat.tendance === 'positive' && <FontAwesomeIcon icon={faArrowUp} className="mr-1" />}
                        {stat.tendance === 'neutre' && <FontAwesomeIcon icon={faCircle} className="mr-1 text-xs" />}
                        {stat.tendance === 'positive' && stat.variation.includes('confirmées') && <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />}
                        {stat.variation}
                      </p>
                    </div>
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${stat.couleur}10` }}
                    >
                      <FontAwesomeIcon 
                        icon={stat.icone} 
                        className="text-xl"
                        style={{ color: stat.couleur }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Graphique et annonces récentes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Graphique */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">Statistiques des vues</h2>
                  <select className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent">
                    <option>7 derniers jours</option>
                    <option>30 derniers jours</option>
                    <option>3 derniers mois</option>
                    <option>Cette année</option>
                  </select>
                </div>
                
                <div className="chart-container">
                  <div className="w-full h-full flex items-end justify-between pt-4">
                    {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                      <div 
                        key={index}
                        className="flex-1 mx-1 bg-[#2C5CD5]/20 rounded-t barre-graphique"
                        style={{ height: '0%', transition: 'height 0.6s ease' }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 text-xs text-gray-500">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mer</span>
                  <span>Jeu</span>
                  <span>Ven</span>
                  <span>Sam</span>
                  <span>Dim</span>
                </div>
              </div>
              
              {/* Derniers messages */}
              <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <h2 className="text-lg font-bold text-gray-800 mb-6">Derniers messages</h2>
                
                <div className="space-y-4">
                  {derniersMessages.map((message, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
                        <img src={message.avatar} alt="Étudiant" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{message.nom}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{message.date}</p>
                      </div>
                      {message.nonLu && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-[#F6A34A]"></span>
                      )}
                    </div>
                  ))}
                </div>
                
                <a href="#" className="block text-center text-[#2C5CD5] hover:text-[#2351C0] font-medium mt-4 text-sm">
                  Voir tous les messages <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                </a>
              </div>
            </div>
            
            {/* Annonces récentes */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Vos annonces récentes</h2>
                <a href="#" className="text-[#2C5CD5] hover:text-[#2351C0] text-sm font-medium">
                  Voir toutes <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                </a>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annonce</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vues</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Messages</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {annoncesRecentes.map((annonce, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden">
                              <img className="h-full w-full object-cover" src={annonce.image} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{annonce.titre}</div>
                              <div className="text-sm text-gray-500">{annonce.lieu}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            annonce.statut === "Active" 
                              ? "bg-[#3CB371]/10 text-[#3CB371]" 
                              : "bg-[#F0F0F0] text-gray-600"
                          }`}>
                            {annonce.statut}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{annonce.vues}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{annonce.messages}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a href="#" className="text-[#2C5CD5] hover:text-[#2351C0] mr-3">
                            <FontAwesomeIcon icon={faEye} />
                          </a>
                          <a href="#" className="text-[#3CB371] hover:text-[#2E9E64] mr-3">
                            <FontAwesomeIcon icon={faEdit} />
                          </a>
                          <a href="#" className="text-[#F6A34A] hover:text-[#E5943A]">
                            <FontAwesomeIcon icon={faChartLine} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Réservations récentes */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Réservations récentes</h2>
                <a href="#" className="text-[#2C5CD5] hover:text-[#2351C0] text-sm font-medium">
                  Voir toutes <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                </a>
              </div>
              
              <div className="space-y-4">
                {reservationsRecentes.map((reservation, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 rounded-lg overflow-hidden mr-4">
                      <img className="w-full h-full object-cover" src={reservation.image} alt="" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{reservation.titre}</h4>
                      <p className="text-sm text-gray-600">Réservé par {reservation.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">{reservation.prix}</p>
                      <p className={`text-sm ${
                        reservation.statut === "Confirmée" 
                          ? "text-[#3CB371]" 
                          : "text-[#F6A34A]"
                      }`}>
                        {reservation.statut}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default TableauDeBordProprietaire;