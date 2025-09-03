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
  faHome,
  faStar,
  faPhone,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';

const AdminProprietaires = () => {
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [filtreVerification, setFiltreVerification] = useState('tous');
  const [termeRecherche, setTermeRecherche] = useState('');
  const [tri, setTri] = useState({ champ: 'date', ordre: 'desc' });
  const [menuActionOuvert, setMenuActionOuvert] = useState(null);
  const [proprietaireSelectionne, setProprietaireSelectionne] = useState(null);
  const [voirDetails, setVoirDetails] = useState(false);

  // Données simulées des propriétaires
  const proprietaires = [
    {
      id: 1,
      nom: "Sékou Traoré",
      email: "sekou@email.com",
      dateInscription: "2023-10-14",
      statut: "Actif",
      telephone: "664 56 78 90",
      adresse: "Dixinn, Conakry",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      verifie: true,
      nbAnnonces: 5,
      nbAnnoncesActives: 3,
      note: 4.5,
      revenuMensuel: "2 450 000 GNF",
      derniereConnexion: "2023-10-20 14:30"
    },
    {
      id: 2,
      nom: "Mohamed Camara",
      email: "mohamed@email.com",
      dateInscription: "2023-10-12",
      statut: "Inactif",
      telephone: "633 44 55 66",
      adresse: "Matoto, Conakry",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      verifie: false,
      nbAnnonces: 2,
      nbAnnoncesActives: 0,
      note: 3.8,
      revenuMensuel: "850 000 GNF",
      derniereConnexion: "2023-10-15 09:15"
    },
    {
      id: 3,
      nom: "Ibrahima Barry",
      email: "ibrahima@email.com",
      dateInscription: "2023-10-10",
      statut: "Actif",
      telephone: "699 00 11 22",
      adresse: "Ratoma, Conakry",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
      verifie: true,
      nbAnnonces: 7,
      nbAnnoncesActives: 5,
      note: 4.2,
      revenuMensuel: "3 150 000 GNF",
      derniereConnexion: "2023-10-21 10:45"
    },
    {
      id: 4,
      nom: "Fatoumata Condé",
      email: "fatoumac@email.com",
      dateInscription: "2023-10-08",
      statut: "Actif",
      telephone: "655 33 44 55",
      adresse: "Kaloum, Conakry",
      avatar: "https://randomuser.me/api/portraits/women/56.jpg",
      verifie: true,
      nbAnnonces: 4,
      nbAnnoncesActives: 4,
      note: 4.8,
      revenuMensuel: "1 980 000 GNF",
      derniereConnexion: "2023-10-21 16:20"
    },
    {
      id: 5,
      nom: "Paul Keita",
      email: "paul@email.com",
      dateInscription: "2023-10-05",
      statut: "Suspendu",
      telephone: "622 77 88 99",
      adresse: "Kagbelen, Dubreka",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
      verifie: true,
      nbAnnonces: 3,
      nbAnnoncesActives: 0,
      note: 3.5,
      revenuMensuel: "0 GNF",
      derniereConnexion: "2023-10-12 11:30"
    },
    {
      id: 6,
      nom: "Aissatou Diallo",
      email: "aissatoud@email.com",
      dateInscription: "2023-10-04",
      statut: "Actif",
      telephone: "611 99 88 77",
      adresse: "Kipé, Conakry",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      verifie: false,
      nbAnnonces: 6,
      nbAnnoncesActives: 4,
      note: 4.0,
      revenuMensuel: "2 750 000 GNF",
      derniereConnexion: "2023-10-20 08:50"
    }
  ];

  // Filtrer les propriétaires en fonction des critères
  const proprietairesFiltres = proprietaires.filter(proprietaire => {
    const correspondStatut = filtreStatut === 'tous' || proprietaire.statut === filtreStatut;
    const correspondVerification = filtreVerification === 'tous' || 
      (filtreVerification === 'verifie' && proprietaire.verifie) ||
      (filtreVerification === 'nonVerifie' && !proprietaire.verifie);
    const correspondRecherche = 
      termeRecherche === '' || 
      proprietaire.nom.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      proprietaire.email.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      proprietaire.adresse.toLowerCase().includes(termeRecherche.toLowerCase());
    
    return correspondStatut && correspondVerification && correspondRecherche;
  });

  // Trier les propriétaires
  const proprietairesTries = [...proprietairesFiltres].sort((a, b) => {
    if (tri.champ === 'nom') {
      return tri.ordre === 'asc' 
        ? a.nom.localeCompare(b.nom) 
        : b.nom.localeCompare(a.nom);
    } else if (tri.champ === 'date') {
      return tri.ordre === 'asc' 
        ? new Date(a.dateInscription) - new Date(b.dateInscription)
        : new Date(b.dateInscription) - new Date(a.dateInscription);
    } else if (tri.champ === 'annonces') {
      return tri.ordre === 'asc' 
        ? a.nbAnnonces - b.nbAnnonces
        : b.nbAnnonces - a.nbAnnonces;
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

  // Actions sur les propriétaires
  const verifierProprietaire = (id) => {
    console.log(`Vérifier le propriétaire ${id}`);
    setMenuActionOuvert(null);
  };

  const suspendreProprietaire = (id) => {
    console.log(`Suspendre le propriétaire ${id}`);
    setMenuActionOuvert(null);
  };

  const activerProprietaire = (id) => {
    console.log(`Activer le propriétaire ${id}`);
    setMenuActionOuvert(null);
  };

  const envoyerMessage = (id) => {
    console.log(`Envoyer un message au propriétaire ${id}`);
    setMenuActionOuvert(null);
  };

  const modifierProprietaire = (id) => {
    console.log(`Modifier le propriétaire ${id}`);
    setMenuActionOuvert(null);
  };

  const voirDetailsProprietaire = (proprietaire) => {
    setProprietaireSelectionne(proprietaire);
    setVoirDetails(true);
  };

  // Statistiques des propriétaires
  const statsProprietaires = {
    total: proprietaires.length,
    actifs: proprietaires.filter(p => p.statut === 'Actif').length,
    verifies: proprietaires.filter(p => p.verifie).length,
    moyenneAnnonces: (proprietaires.reduce((sum, p) => sum + p.nbAnnonces, 0) / proprietaires.length).toFixed(1)
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec titre et boutons */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Gestion des Propriétaires</h2>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
            Exporter les données
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition">
            Ajouter un propriétaire
          </button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total propriétaires</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{statsProprietaires.total}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <FontAwesomeIcon icon={faHome} className="w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Propriétaires actifs</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{statsProprietaires.actifs}</h3>
              <p className="text-xs text-green-500 mt-1">+12% ce mois</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Propriétaires vérifiés</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{statsProprietaires.verifies}</h3>
              <p className="text-xs text-blue-500 mt-1">{((statsProprietaires.verifies / statsProprietaires.total) * 100).toFixed(0)}% du total</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <FontAwesomeIcon icon={faStar} className="w-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Moyenne annonces</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{statsProprietaires.moyenneAnnonces}</h3>
              <p className="text-xs text-gray-500 mt-1">par propriétaire</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100 text-orange-500">
              <FontAwesomeIcon icon={faHome} className="w-5" />
            </div>
          </div>
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
              placeholder="Rechercher un propriétaire..."
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
                value={filtreStatut}
                onChange={(e) => setFiltreStatut(e.target.value)}
              >
                <option value="tous">Tous les statuts</option>
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
                <option value="Suspendu">Suspendu</option>
              </select>
            </div>

            <select 
              className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filtreVerification}
              onChange={(e) => setFiltreVerification(e.target.value)}
            >
              <option value="tous">Tous</option>
              <option value="verifie">Vérifiés</option>
              <option value="nonVerifie">Non vérifiés</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des propriétaires */}
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
                    <span>Propriétaire</span>
                    <FontAwesomeIcon icon={obtenirIconeTri('nom')} className="ml-1 text-gray-400" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center focus:outline-none"
                    onClick={() => changerTri('annonces')}
                  >
                    <span>Annonces</span>
                    <FontAwesomeIcon icon={obtenirIconeTri('annonces')} className="ml-1 text-gray-400" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vérification
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
              {proprietairesTries.map((proprietaire) => (
                <tr key={proprietaire.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={proprietaire.avatar} alt={proprietaire.nom} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{proprietaire.nom}</div>
                        <div className="text-sm text-gray-500">{proprietaire.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{proprietaire.telephone}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                      {proprietaire.adresse}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{proprietaire.nbAnnonces} annonces</div>
                    <div className="text-xs text-gray-500">
                      {proprietaire.nbAnnoncesActives} active(s)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${proprietaire.statut === 'Actif' ? 'bg-green-100 text-green-800' : proprietaire.statut === 'Inactif' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {proprietaire.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {proprietaire.verifie ? (
                      <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                        Vérifié
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                        Non vérifié
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {proprietaire.dateInscription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                    <button 
                      className="text-gray-500 hover:text-gray-700 p-2"
                      onClick={() => setMenuActionOuvert(menuActionOuvert === proprietaire.id ? null : proprietaire.id)}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>

                    {menuActionOuvert === proprietaire.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => voirDetailsProprietaire(proprietaire)}
                          >
                            <FontAwesomeIcon icon={faEye} className="mr-2 text-blue-500" />
                            Voir détails
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => envoyerMessage(proprietaire.id)}
                          >
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-purple-500" />
                            Contacter
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => modifierProprietaire(proprietaire.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="mr-2 text-gray-500" />
                            Modifier
                          </button>
                          {proprietaire.verifie ? (
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => verifierProprietaire(proprietaire.id)}
                            >
                              <FontAwesomeIcon icon={faTimesCircle} className="mr-2 text-orange-500" />
                              Retirer vérification
                            </button>
                          ) : (
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => verifierProprietaire(proprietaire.id)}
                            >
                              <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
                              Vérifier
                            </button>
                          )}
                          {proprietaire.statut === 'Actif' ? (
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => suspendreProprietaire(proprietaire.id)}
                            >
                              <FontAwesomeIcon icon={faTimesCircle} className="mr-2 text-red-500" />
                              Suspendre
                            </button>
                          ) : (
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => activerProprietaire(proprietaire.id)}
                            >
                              <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-500" />
                              Activer
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

      {/* Modal de détails du propriétaire */}
      {voirDetails && proprietaireSelectionne && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-800">Détails du propriétaire</h3>
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
                    src={proprietaireSelectionne.avatar} 
                    alt={proprietaireSelectionne.nom}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{proprietaireSelectionne.nom}</h4>
                  <p className="text-gray-600">{proprietaireSelectionne.email}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="text-gray-800">{proprietaireSelectionne.telephone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Adresse</p>
                      <p className="text-gray-800">{proprietaireSelectionne.adresse}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Statut</p>
                      <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${proprietaireSelectionne.statut === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {proprietaireSelectionne.statut}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vérification</p>
                      {proprietaireSelectionne.verifie ? (
                        <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                          <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                          Vérifié
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                          Non vérifié
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-3">Informations annonces</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nombre total d'annonces</span>
                      <span className="font-medium">{proprietaireSelectionne.nbAnnonces}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annonces actives</span>
                      <span className="font-medium">{proprietaireSelectionne.nbAnnoncesActives}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Note moyenne</span>
                      <span className="font-medium">{proprietaireSelectionne.note}/5</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-700 mb-3">Informations financières</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenu mensuel</span>
                      <span className="font-medium">{proprietaireSelectionne.revenuMensuel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date d'inscription</span>
                      <span className="font-medium">{proprietaireSelectionne.dateInscription}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dernière connexion</span>
                      <span className="font-medium">{proprietaireSelectionne.derniereConnexion}</span>
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
                  onClick={() => envoyerMessage(proprietaireSelectionne.id)}
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

export default AdminProprietaires;