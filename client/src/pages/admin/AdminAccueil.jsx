import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEdit,
  faCheckCircle,
  faTimesCircle,
  faArrowUp,
  faArrowDown,
  faUser,
  faHome,
  faMessage,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';

const AdminAccueil = () => {
  const [periode, setPeriode] = useState('mois');
  
  // Données simulées pour le tableau de bord
  const statistiques = [
    { 
      titre: "Utilisateurs totaux", 
      valeur: "1,245", 
      variation: "+12% ce mois", 
      icone: faUser, 
      couleur: "bg-blue-500",
      tendance: "positive" 
    },
    { 
      titre: "Propriétaires", 
      valeur: "356", 
      variation: "+8% ce mois", 
      icone: faUser, 
      couleur: "bg-green-500",
      tendance: "positive" 
    },
    { 
      titre: "Étudiants", 
      valeur: "889", 
      variation: "+15% ce mois", 
      icone: faUser, 
      couleur: "bg-purple-500",
      tendance: "positive" 
    },
    { 
      titre: "Annonces actives", 
      valeur: "542", 
      variation: "+23% ce mois", 
      icone: faHome, 
      couleur: "bg-orange-500",
      tendance: "positive" 
    }
  ];

  const utilisateursRecents = [
    { 
      nom: "Mamadou Diallo", 
      email: "mamadou@email.com", 
      role: "Étudiant", 
      date: "2023-10-15", 
      statut: "Vérifié",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg" 
    },
    { 
      nom: "Aïssatou Bah", 
      email: "aissatou@email.com", 
      role: "Étudiant", 
      date: "2023-10-14", 
      statut: "En attente",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg" 
    },
    { 
      nom: "Sékou Traoré", 
      email: "sekou@email.com", 
      role: "Propriétaire", 
      date: "2023-10-14", 
      statut: "Vérifié",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg" 
    },
    { 
      nom: "Fatoumata Binta", 
      email: "fatoumata@email.com", 
      role: "Étudiant", 
      date: "2023-10-13", 
      statut: "Vérifié",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg" 
    },
    { 
      nom: "Mohamed Camara", 
      email: "mohamed@email.com", 
      role: "Propriétaire", 
      date: "2023-10-12", 
      statut: "Rejeté",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg" 
    }
  ];

  const annoncesRecentes = [
    {
      titre: "Studio moderne à Conakry",
      proprietaire: "Sékou Traoré",
      prix: "750 000 GNF",
      date: "2023-10-15",
      statut: "Active",
      vues: 124
    },
    {
      titre: "Colocation 3 places à Kindia",
      proprietaire: "Mohamed Camara",
      prix: "450 000 GNF",
      date: "2023-10-14",
      statut: "Active",
      vues: 87
    },
    {
      titre: "Appartement T2 à Kankan",
      proprietaire: "Aïssatou Bah",
      prix: "950 000 GNF",
      date: "2023-10-13",
      statut: "En attente",
      vues: 42
    },
    {
      titre: "Chambre individuelle à Labé",
      proprietaire: "Mamadou Diallo",
      prix: "350 000 GNF",
      date: "2023-10-12",
      statut: "Active",
      vues: 67
    },
    {
      titre: "Studio meublé à Nzérékoré",
      proprietaire: "Fatoumata Binta",
      prix: "600 000 GNF",
      date: "2023-10-11",
      statut: "Rejetée",
      vues: 23
    }
  ];

  // Données pour le graphique
  const donneesGraphique = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct'],
    utilisateurs: [450, 520, 600, 680, 750, 830, 920, 1010, 1120, 1245],
    annonces: [120, 180, 240, 290, 330, 380, 420, 470, 510, 542]
  };

  // Animation des barres du graphique
  useEffect(() => {
    const timer = setTimeout(() => {
      const barresUtilisateurs = document.querySelectorAll('.barre-utilisateurs');
      const barresAnnonces = document.querySelectorAll('.barre-annonces');
      
      barresUtilisateurs.forEach((barre, index) => {
        const hauteur = (donneesGraphique.utilisateurs[index] / 1500) * 100;
        barre.style.height = `${hauteur}%`;
      });
      
      barresAnnonces.forEach((barre, index) => {
        const hauteur = (donneesGraphique.annonces[index] / 600) * 100;
        barre.style.height = `${hauteur}%`;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [periode]);

  return (
    <div className="space-y-6">
      {/* Filtres de période */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Aperçu de la plateforme</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded-lg text-sm ${periode === 'semaine' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setPeriode('semaine')}
          >
            Semaine
          </button>
          <button 
            className={`px-3 py-1 rounded-lg text-sm ${periode === 'mois' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setPeriode('mois')}
          >
            Mois
          </button>
          <button 
            className={`px-3 py-1 rounded-lg text-sm ${periode === 'annee' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setPeriode('annee')}
          >
            Année
          </button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {statistiques.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.titre}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.valeur}</h3>
                <div className={`flex items-center mt-2 text-xs ${stat.tendance === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  <FontAwesomeIcon icon={stat.tendance === 'positive' ? faArrowUp : faArrowDown} className="mr-1" />
                  <span>{stat.variation}</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.couleur} text-white`}>
                <FontAwesomeIcon icon={stat.icone} className="w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique et données récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Activité de la plateforme</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">Utilisateurs</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm text-gray-600">Annonces</span>
              </div>
            </div>
          </div>
          
          <div className="chart-container" style={{ height: '250px' }}>
            <div className="flex items-end justify-between h-full">
              {donneesGraphique.labels.map((label, index) => (
                <div key={index} className="flex flex-col items-center" style={{ width: '8%' }}>
                  <div className="flex items-end justify-center h-5/6 w-full" style={{ height: '85%' }}>
                    <div 
                      className="barre-utilisateurs w-3 bg-blue-500 rounded-t transition-all duration-700"
                      style={{ height: '0%', marginRight: '2px' }}
                    ></div>
                    <div 
                      className="barre-annonces w-3 bg-orange-500 rounded-t transition-all duration-700"
                      style={{ height: '0%' }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Utilisateurs récents */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Utilisateurs récents</h3>
            <button className="text-blue-600 text-sm font-medium">Voir tout</button>
          </div>
          
          <div className="space-y-4">
            {utilisateursRecents.map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src={user.avatar} alt={user.nom} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-800">{user.nom}</h4>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${user.statut === 'Vérifié' ? 'bg-green-100 text-green-800' : user.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {user.statut}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{user.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Annonces récentes */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800">Annonces récentes</h3>
          <button className="text-blue-600 text-sm font-medium">Voir tout</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b">
                <th className="pb-3">Annonce</th>
                <th className="pb-3">Propriétaire</th>
                <th className="pb-3">Prix</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Statut</th>
                <th className="pb-3">Vues</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {annoncesRecentes.map((annonce, index) => (
                <tr key={index} className="text-sm">
                  <td className="py-4">
                    <div className="font-medium text-gray-800">{annonce.titre}</div>
                  </td>
                  <td className="py-4">{annonce.proprietaire}</td>
                  <td className="py-4">{annonce.prix}</td>
                  <td className="py-4">{annonce.date}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${annonce.statut === 'Active' ? 'bg-green-100 text-green-800' : annonce.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {annonce.statut}
                    </span>
                  </td>
                  <td className="py-4">{annonce.vues}</td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .chart-container {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default AdminAccueil;