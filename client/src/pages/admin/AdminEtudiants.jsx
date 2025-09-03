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
  faSortDown,
  faGraduationCap,
  faSchool,
  faBook,
  faUser,
  faPhone,
  faLocationDot,
  faCalendar,
  faClock
} from '@fortawesome/free-solid-svg-icons';

const AdminEtudiants = () => {
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [filtreUniversite, setFiltreUniversite] = useState('toutes');
  const [filtreNiveau, setFiltreNiveau] = useState('tous');
  const [termeRecherche, setTermeRecherche] = useState('');
  const [tri, setTri] = useState({ champ: 'date', ordre: 'desc' });
  const [menuActionOuvert, setMenuActionOuvert] = useState(null);
  const [etudiantSelectionne, setEtudiantSelectionne] = useState(null);
  const [voirDetails, setVoirDetails] = useState(false);

  // Données simulées des étudiants
  const etudiants = [
    {
      id: 1,
      nom: "Mamadou Diallo",
      email: "mamadou@email.com",
      dateInscription: "2023-10-15",
      statut: "Vérifié",
      telephone: "622 12 34 56",
      universite: "Université Gamal Abdel Nasser",
      filiere: "Informatique",
      niveau: "Licence 2",
      anneeEtude: "2023-2024",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      dateNaissance: "2000-05-15",
      adresse: "Dixinn, Conakry",
      interessePar: "Colocation, Studio",
      budgetMax: "500 000 GNF",
      derniereConnexion: "2023-10-20 14:30"
    },
    {
      id: 2,
      nom: "Aïssatou Bah",
      email: "aissatou@email.com",
      dateInscription: "2023-10-14",
      statut: "En attente",
      telephone: "655 98 76 54",
      universite: "Université Sonfonia",
      filiere: "Droit",
      niveau: "Licence 3",
      anneeEtude: "2023-2024",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      dateNaissance: "2001-08-22",
      adresse: "Matam, Conakry",
      interessePar: "Chambre individuelle",
      budgetMax: "350 000 GNF",
      derniereConnexion: "2023-10-19 09:15"
    },
    {
      id: 3,
      nom: "Fatoumata Binta",
      email: "fatoumata@email.com",
      dateInscription: "2023-10-13",
      statut: "Vérifié",
      telephone: "611 22 33 44",
      universite: "Institut Supérieur de Technologie",
      filiere: "Génie Civil",
      niveau: "Master 1",
      anneeEtude: "2023-2024",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      dateNaissance: "1999-12-03",
      adresse: "Ratoma, Conakry",
      interessePar: "Appartement T2",
      budgetMax: "750 000 GNF",
      derniereConnexion: "2023-10-21 16:20"
    },
    {
      id: 4,
      nom: "Mariama Sow",
      email: "mariama@email.com",
      dateInscription: "2023-10-11",
      statut: "Vérifié",
      telephone: "677 88 99 00",
      universite: "Université Julius Nyerere",
      filiere: "Commerce",
      niveau: "Licence 1",
      anneeEtude: "2023-2024",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      dateNaissance: "2002-03-18",
      adresse: "Kagbelen, Dubreka",
      interessePar: "Colocation",
      budgetMax: "250 000 GNF",
      derniereConnexion: "2023-10-20 08:50"
    },
    {
      id: 5,
      nom: "Aissatou Diallo",
      email: "aissatoud@email.com",
      dateInscription: "2023-10-09",
      statut: "Vérifié",
      telephone: "633 55 77 99",
      universite: "Université Gamal Abdel Nasser",
      filiere: "Médecine",
      niveau: "Licence 3",
      anneeEtude: "2023-2024",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      dateNaissance: "2000-11-27",
      adresse: "Kipé, Conakry",
      interessePar: "Studio",
      budgetMax: "600 000 GNF",
      derniereConnexion: "2023-10-21 11:30"
    },
    {
      id: 6,
      nom: "Ibrahima Keita",
      email: "ibrahima@email.com",
      dateInscription: "2023-10-08",
      statut: "Rejeté",
      telephone: "699 11 22 33",
      universite: "Université Sonfonia",
      filiere: "Économie",
      niveau: "Licence 2",
      anneeEtude: "2023-2024",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      dateNaissance: "2001-06-14",
      adresse: "Kaloum, Conakry",
      interessePar: "Chambre individuelle",
      budgetMax: "300 000 GNF",
      derniereConnexion: "2023-10-12 15:45"
    }
  ];

  // Options pour les filtres
  const universites = [...new Set(etudiants.map(e => e.universite))];
  const niveaux = [...new Set(etudiants.map(e => e.niveau))];

  // Filtrer les étudiants en fonction des critères
  const etudiantsFiltres = etudiants.filter(etudiant => {
    const correspondStatut = filtreStatut === 'tous' || etudiant.statut === filtreStatut;
    const correspondUniversite = filtreUniversite === 'toutes' || etudiant.universite === filtreUniversite;
    const correspondNiveau = filtreNiveau === 'tous' || etudiant.niveau === filtreNiveau;
    const correspondRecherche = 
      termeRecherche === '' || 
      etudiant.nom.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      etudiant.email.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      etudiant.filiere.toLowerCase().includes(termeRecherche.toLowerCase());
    
    return correspondStatut && correspondUniversite && correspondNiveau && correspondRecherche;
  });

  // Trier les étudiants
  const etudiantsTries = [...etudiantsFiltres].sort((a, b) => {
    if (tri.champ === 'nom') {
      return tri.ordre === 'asc' 
        ? a.nom.localeCompare(b.nom) 
        : b.nom.localeCompare(a.nom);
    } else if (tri.champ === 'date') {
      return tri.ordre === 'asc' 
        ? new Date(a.dateInscription) - new Date(b.dateInscription)
        : new Date(b.dateInscription) - new Date(a.dateInscription);
    } else if (tri.champ === 'universite') {
      return tri.ordre === 'asc' 
        ? a.universite.localeCompare(b.universite)
        : b.universite.localeCompare(a.universite);
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

  // Actions sur les étudiants
  const verifierEtudiant = (id) => {
    console.log(`Vérifier l'étudiant ${id}`);
    setMenuActionOuvert(null);
  };

  const rejeterEtudiant = (id) => {
    console.log(`Rejeter l'étudiant ${id}`);
    setMenuActionOuvert(null);
  };

  const envoyerMessage = (id) => {
    console.log(`Envoyer un message à l'étudiant ${id}`);
    setMenuActionOuvert(null);
  };

  const modifierEtudiant = (id) => {
    console.log(`Modifier l'étudiant ${id}`);
    setMenuActionOuvert(null);
  };

  const voirDetailsEtudiant = (etudiant) => {
    setEtudiantSelectionne(etudiant);
    setVoirDetails(true);
  };

  // Statistiques des étudiants
  const statsEtudiants = {
    total: etudiants.length,
    verifies: etudiants.filter(e => e.statut === 'Vérifié').length,
    enAttente: etudiants.filter(e => e.statut === 'En attente').length,
    rejetes: etudiants.filter(e => e.statut === 'Rejeté').length
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec titre et boutons */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Gestion des Étudiants</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Exporter les données
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition">
            Ajouter un étudiant
          </button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total étudiants</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{statsEtudiants.total}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <FontAwesomeIcon icon={faUser} className="w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Étudiants vérifiés</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{statsEtudiants.verifies}</h3>
              <p className="text-xs text-green-500 mt-1">
                {((statsEtudiants.verifies / statsEtudiants.total) * 100).toFixed(0)}% du total
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">En attente</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{statsEtudiants.enAttente}</h3>
              <p className="text-xs text-yellow-500 mt-1">À vérifier</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <FontAwesomeIcon icon={faClock} className="w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Rejetés</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{statsEtudiants.rejetes}</h3>
              <p className="text-xs text-red-500 mt-1">À réexaminer</p>
            </div>
            <div className="p-3 rounded-full bg-red-100 text-red-500">
              <FontAwesomeIcon icon={faTimesCircle} className="w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="relative w-full lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher un étudiant..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={termeRecherche}
              onChange={(e) => setTermeRecherche(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="text-gray-400 mr-2" />
              <select 
                className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
                value={filtreStatut}
                onChange={(e) => setFiltreStatut(e.target.value)}
              >
                <option value="tous">Tous les statuts</option>
                <option value="Vérifié">Vérifié</option>
                <option value="En attente">En attente</option>
                <option value="Rejeté">Rejeté</option>
              </select>
            </div>

            <select 
              className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filtreUniversite}
              onChange={(e) => setFiltreUniversite(e.target.value)}
            >
              <option value="toutes">Toutes universités</option>
              {universites.map(universite => (
                <option key={universite} value={universite}>{universite}</option>
              ))}
            </select>

            <select 
              className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filtreNiveau}
              onChange={(e) => setFiltreNiveau(e.target.value)}
            >
              <option value="tous">Tous niveaux</option>
              {niveaux.map(niveau => (
                <option key={niveau} value={niveau}>{niveau}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des étudiants */}
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
                    <span>Étudiant</span>
                    <FontAwesomeIcon icon={obtenirIconeTri('nom')} className="ml-1 text-gray-400" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => changerTri('universite')}
                  >
                    <span>Université & Filière</span>
                    <FontAwesomeIcon icon={obtenirIconeTri('universite')} className="ml-1 text-gray-400" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => changerTri('date')}
                  >
                    <span>Inscription</span>
                    <FontAwesomeIcon icon={obtenirIconeTri('date')} className="ml-1 text-gray-400" />
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {etudiantsTries.map((etudiant) => (
                <tr key={etudiant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={etudiant.avatar} alt={etudiant.nom} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{etudiant.nom}</div>
                        <div className="text-sm text-gray-500">{etudiant.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{etudiant.universite}</div>
                    <div className="text-sm text-gray-500">{etudiant.filiere} - {etudiant.niveau}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{etudiant.telephone}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                      {etudiant.adresse}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${etudiant.statut === 'Vérifié' ? 'bg-green-100 text-green-800' : etudiant.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {etudiant.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {etudiant.dateInscription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button 
                      className="text-gray-500 hover:text-gray-700 p-2"
                      onClick={() => setMenuActionOuvert(menuActionOuvert === etudiant.id ? null : etudiant.id)}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>

                    {menuActionOuvert === etudiant.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => voirDetailsEtudiant(etudiant)}
                          >
                            <FontAwesomeIcon icon={faEye} className="mr-2 text-blue-500" />
                            Voir détails
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => envoyerMessage(etudiant.id)}
                          >
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-purple-500" />
                            Contacter
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => modifierEtudiant(etudiant.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="mr-2 text-gray-500" />
                            Modifier
                          </button>
                          {etudiant.statut === 'Vérifié' || etudiant.statut === 'Rejeté' ? (
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => rejeterEtudiant(etudiant.id)}
                            >
                              <FontAwesomeIcon icon={faTimesCircle} className="mr-2 text-red-500" />
                              Désactiver
                            </button>
                          ) : (
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => verifierEtudiant(etudiant.id)}
                            >
                              <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
                              Vérifier
                            </button>
                          )}
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
                Affichage de <span className="font-medium">1</span> à <span className="font-medium">6</span> sur{' '}
                <span className="font-medium">6</span> résultats
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
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Suivant</span>
                  Suivant
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de détails de l'étudiant */}
      {voirDetails && etudiantSelectionne && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-800">Détails de l'étudiant</h3>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setVoirDetails(false)}
                >
                  <FontAwesomeIcon icon={faTimesCircle} className="w-5" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-shrink-0">
                  <img 
                    src={etudiantSelectionne.avatar} 
                    alt={etudiantSelectionne.nom}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{etudiantSelectionne.nom}</h4>
                  <p className="text-gray-600">{etudiantSelectionne.email}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="text-gray-800">{etudiantSelectionne.telephone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date de naissance</p>
                      <p className="text-gray-800">{etudiantSelectionne.dateNaissance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Statut</p>
                      <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${etudiantSelectionne.statut === 'Vérifié' ? 'bg-green-100 text-green-800' : etudiantSelectionne.statut === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {etudiantSelectionne.statut}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dernière connexion</p>
                      <p className="text-gray-800 text-sm">{etudiantSelectionne.derniereConnexion}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                    <FontAwesomeIcon icon={faSchool} className="mr-2" />
                    Informations académiques
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Université</span>
                      <span className="font-medium text-right">{etudiantSelectionne.universite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Filière</span>
                      <span className="font-medium">{etudiantSelectionne.filiere}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Niveau</span>
                      <span className="font-medium">{etudiantSelectionne.niveau}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Année d'étude</span>
                      <span className="font-medium">{etudiantSelectionne.anneeEtude}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                    Recherche de logement
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Intéressé par</span>
                      <span className="font-medium text-right">{etudiantSelectionne.interessePar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget maximum</span>
                      <span className="font-medium">{etudiantSelectionne.budgetMax}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adresse</span>
                      <span className="font-medium text-right">{etudiantSelectionne.adresse}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date d'inscription</span>
                      <span className="font-medium">{etudiantSelectionne.dateInscription}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setVoirDetails(false)}
                >
                  Fermer
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => envoyerMessage(etudiantSelectionne.id)}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEtudiants;