
















import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faEye,
  faEdit,
  faCheckCircle,
  faTimesCircle,
  faEnvelope,
  faEllipsisVertical,
  faSort,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons';

const AdminUtilisateurs = () => {
  const [filtreRole, setFiltreRole] = useState('tous');
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [termeRecherche, setTermeRecherche] = useState('');
  const [tri, setTri] = useState({ champ: 'date', ordre: 'desc' });
  const [menuActionOuvert, setMenuActionOuvert] = useState(null);

  // Données simulées des utilisateurs
  const utilisateurs = [
    {
      id: 1,
      nom: "Mamadou Diallo",
      email: "mamadou@email.com",
      role: "Étudiant",
      dateInscription: "2023-10-15",
      statut: "Vérifié",
      telephone: "622 12 34 56",
      universite: "Université Gamal Abdel Nasser",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      nom: "Aïssatou Bah",
      email: "aissatou@email.com",
      role: "Étudiant",
      dateInscription: "2023-10-14",
      statut: "En attente",
      telephone: "655 98 76 54",
      universite: "Université Sonfonia",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      nom: "Sékou Traoré",
      email: "sekou@email.com",
      role: "Propriétaire",
      dateInscription: "2023-10-14",
      statut: "Vérifié",
      telephone: "664 56 78 90",
      adresse: "Dixinn, Conakry",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 4,
      nom: "Fatoumata Binta",
      email: "fatoumata@email.com",
      role: "Étudiant",
      dateInscription: "2023-10-13",
      statut: "Vérifié",
      telephone: "611 22 33 44",
      universite: "Institut Supérieur de Technologie",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      id: 5,
      nom: "Mohamed Camara",
      email: "mohamed@email.com",
      role: "Propriétaire",
      dateInscription: "2023-10-12",
      statut: "Rejeté",
      telephone: "633 44 55 66",
      adresse: "Matoto, Conakry",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 6,
      nom: "Mariama Sow",
      email: "mariama@email.com",
      role: "Étudiant",
      dateInscription: "2023-10-11",
      statut: "Vérifié",
      telephone: "677 88 99 00",
      universite: "Université Julius Nyerere",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
      id: 7,
      nom: "Ibrahima Barry",
      email: "ibrahima@email.com",
      role: "Propriétaire",
      dateInscription: "2023-10-10",
      statut: "En attente",
      telephone: "699 00 11 22",
      adresse: "Ratoma, Conakry",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg"
    },
    {
      id: 8,
      nom: "Aissatou Diallo",
      email: "aissatoud@email.com",
      role: "Étudiant",
      dateInscription: "2023-10-09",
      statut: "Vérifié",
      telephone: "633 55 77 99",
      universite: "Université Gamal Abdel Nasser",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  ];

  // Filtrer les utilisateurs en fonction des critères
  const utilisateursFiltres = utilisateurs.filter(utilisateur => {
    const correspondRole = filtreRole === 'tous' || utilisateur.role === filtreRole;
    const correspondStatut = filtreStatut === 'tous' || utilisateur.statut === filtreStatut;
    const correspondRecherche = 
      termeRecherche === '' || 
      utilisateur.nom.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      utilisateur.email.toLowerCase().includes(termeRecherche.toLowerCase());
    
    return correspondRole && correspondStatut && correspondRecherche;
  });

  // Trier les utilisateurs
  const utilisateursTries = [...utilisateursFiltres].sort((a, b) => {
    if (tri.champ === 'nom') {
      return tri.ordre === 'asc' 
        ? a.nom.localeCompare(b.nom) 
        : b.nom.localeCompare(a.nom);
    } else if (tri.champ === 'date') {
      return tri.ordre === 'asc' 
        ? new Date(a.dateInscription) - new Date(b.dateInscription)
        : new Date(b.dateInscription) - new Date(a.dateInscription);
    }
    return 0;
  });

  // Changer le tri
  const changerTri = (champ) => {
    if (tri.champ === champ) {
      setTri({ champ, ordre: tri.ordre === 'asc' ? 'desc' : 'asc' });
    } else {
      setTri({ champ, ordre: 'desc' });
    }
  };

  // Obtenir l'icône de tri
  const obtenirIconeTri = (champ) => {
    if (tri.champ !== champ) return faSort;
    return tri.ordre === 'asc' ? faSortUp : faSortDown;
  };

  // Actions sur les utilisateurs
  const verifierUtilisateur = (id) => {
    console.log(`Vérifier l'utilisateur ${id}`);
    setMenuActionOuvert(null);
  };

  const rejeterUtilisateur = (id) => {
    console.log(`Rejeter l'utilisateur ${id}`);
    setMenuActionOuvert(null);
  };

  const envoyerMessage = (id) => {
    console.log(`Envoyer un message à l'utilisateur ${id}`);
    setMenuActionOuvert(null);
  };

  const modifierUtilisateur = (id) => {
    console.log(`Modifier l'utilisateur ${id}`);
    setMenuActionOuvert(null);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec titre et boutons */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Gestion des Utilisateurs</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Exporter les données
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition">
            Ajouter un utilisateur
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={termeRecherche}
              onChange={(e) => setTermeRecherche(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="text-gray-400 mr-2" />
              <select 
                className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filtreRole}
                onChange={(e) => setFiltreRole(e.target.value)}
              >
                <option value="tous">Tous les rôles</option>
                <option value="Étudiant">Étudiants</option>
                <option value="Propriétaire">Propriétaires</option>
              </select>
            </div>

            <select 
              className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filtreStatut}
              onChange={(e) => setFiltreStatut(e.target.value)}
            >
              <option value="tous">Tous les statuts</option>
              <option value="Vérifié">Vérifié</option>
              <option value="En attente">En attente</option>
              <option value="Rejeté">Rejeté</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => changerTri('nom')}
                  >
                    <span>Utilisateur</span>
                    <FontAwesomeIcon icon={obtenirIconeTri('nom')} className="ml-1 text-gray-400" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => changerTri('date')}
                  >
                    <span>Date d'inscription</span>
                    <FontAwesomeIcon icon={obtenirIconeTri('date')} className="ml-1 text-gray-400" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {utilisateursTries.map((utilisateur) => (
                <tr key={utilisateur.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={utilisateur.avatar} alt={utilisateur.nom} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{utilisateur.nom}</div>
                        <div className="text-sm text-gray-500">{utilisateur.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex text-xs leading-5 font-semibold rounded-full ${utilisateur.role === 'Étudiant' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {utilisateur.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {utilisateur.telephone}
                    {utilisateur.universite && (
                      <div className="text-xs text-gray-400">{utilisateur.universite}</div>
                    )}
                    {utilisateur.adresse && (
                      <div className="text-xs text-gray-400">{utilisateur.adresse}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {utilisateur.dateInscription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${utilisateur.statut === 'Vérifié' ? 'bg-green-100 text-green-800' : utilisateur.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {utilisateur.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button 
                      className="text-gray-500 hover:text-gray-700 p-2"
                      onClick={() => setMenuActionOuvert(menuActionOuvert === utilisateur.id ? null : utilisateur.id)}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>

                    {menuActionOuvert === utilisateur.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => verifierUtilisateur(utilisateur.id)}
                          >
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
                            Vérifier
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => rejeterUtilisateur(utilisateur.id)}
                          >
                            <FontAwesomeIcon icon={faTimesCircle} className="mr-2 text-red-500" />
                            Rejeter
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => envoyerMessage(utilisateur.id)}
                          >
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
                            Envoyer message
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => modifierUtilisateur(utilisateur.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="mr-2 text-gray-500" />
                            Modifier
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setMenuActionOuvert(null)}
                          >
                            <FontAwesomeIcon icon={faEye} className="mr-2 text-purple-500" />
                            Voir détails
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Affichage de <span className="font-medium">1</span> à <span className="font-medium">8</span> sur{' '}
                <span className="font-medium">8</span> résultats
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Précédent</span>
                  Précédent
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                  1
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  3
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Suivant</span>
                  Suivant
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUtilisateurs;