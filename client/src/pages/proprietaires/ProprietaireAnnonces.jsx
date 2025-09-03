import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faBell, faChevronDown, faUser, faCog, faSignOutAlt,
  faTachometerAlt, faPlusCircle, faEnvelope, faCalendarAlt,
  faChartLine, faWallet, faQuestionCircle, faHeadset,
  faPlus, faArrowUp, faCircle, faCheckCircle, faArrowRight,
  faEye, faEdit, faTrash, faFilter, faSearch, faSyncAlt,
  faTimes, faEllipsisV, faCheck, faClock, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../autres/Navbar';
import AuthContext from '../../context/AuthContext';
import { Loading } from '../autres/Loading';
import { deleteAnnonce, getMesAnnonces } from '../../services/logementService';
import { formaterPrix } from '../../utils/formaterPrix';
import ConfirmatonAction from '../../components/ConfirmationAction';
import {Toaster, toast} from 'sonner';

const ProprietaireAnnonces = () => {
  const [menuUtilisateurOuvert, setMenuUtilisateurOuvert] = useState(false);
  const [filtreOuvert, setFiltreOuvert] = useState(false);
  const [filtres, setFiltres] = useState({
    statut: 'tous',
    type: 'tous',
    tri: 'recent'
  });
  const [recherche, setRecherche] = useState('');
  const { user, lien } = useContext(AuthContext);
  const [mesAnnonces, setMesAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(null);

  const [popUp, setPopUp] = useState(false);
  const [supprimerAnnonceID, setSupprimerAnnonceID] = useState(null);
  const [operationEnCours, setOperationEnCours] = useState(false);


  if (!user.compte) return <Loading />

  // LISTE DE MES ANNONCES
  useEffect(() => {
    const get = async () => {
      const res = await getMesAnnonces();
      if (res.success) {
        setMesAnnonces(res.mesAnnonces);
        console.log(res.mesAnnonces)
        setTotal(res.mesAnnonces.length)
        setLoading(false);
      } else {
        alert(res.message);
        setLoading(false);
      }
    };

    get();
  }, []);


  // Clique et mis a jour de l'id à supprimer
  const handleClick = (id) => {
    setSupprimerAnnonceID(id);
    setPopUp(true);
  };


  // Supprimer une annonce
  const handleDelete = async (id) => {
    setOperationEnCours(true);
    const res = await deleteAnnonce(supprimerAnnonceID);
    if (res.success) {
      setPopUp(false)
      setOperationEnCours(false);
      setMesAnnonces(mesAnnonces.filter(a => a._id !== id));
      toast.success(res.message, {
        description: 'Votre annonce ne sera plus visible sur la plateforme'
      })
    }
    else {
      setPopUp(false)
      setOperationEnCours(false)
      toast.success(res.message);
    }
  }

  // Données simulées des annonces
  const [annonces, setAnnonces] = useState([
    {
      id: 1,
      titre: "Studio moderne",
      lieu: "Conakry, Kaloum",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      statut: "active",
      type: "studio",
      vues: 124,
      messages: 8,
      prix: "750 000 GNF",
      dateCreation: "2023-10-15",
      dateModification: "2023-10-28"
    },
    {
      id: 2,
      titre: "Colocation 3 places",
      lieu: "Kindia, Centre-ville",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      statut: "active",
      type: "colocation",
      vues: 87,
      messages: 5,
      prix: "450 000 GNF",
      dateCreation: "2023-10-10",
      dateModification: "2023-10-25"
    },
    {
      id: 3,
      titre: "Appartement T2",
      lieu: "Kankan",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      statut: "en_attente",
      type: "appartement",
      vues: 42,
      messages: 3,
      prix: "950 000 GNF",
      dateCreation: "2023-10-20",
      dateModification: "2023-10-20"
    },
    {
      id: 4,
      titre: "Chambre individuelle meublée",
      lieu: "Conakry, Ratoma",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      statut: "active",
      type: "chambre",
      vues: 156,
      messages: 12,
      prix: "350 000 GNF",
      dateCreation: "2023-09-30",
      dateModification: "2023-10-22"
    },
    {
      id: 5,
      titre: "Studio F2 avec balcon",
      lieu: "Conakry, Matam",
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      statut: "expiree",
      type: "studio",
      vues: 98,
      messages: 4,
      prix: "850 000 GNF",
      dateCreation: "2023-09-15",
      dateModification: "2023-10-10"
    },
    {
      id: 6,
      titre: "Appartement T3 moderne",
      lieu: "Conakry, Matoto",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      statut: "brouillon",
      type: "appartement",
      vues: 0,
      messages: 0,
      prix: "1 200 000 GNF",
      dateCreation: "2023-10-27",
      dateModification: "2023-10-27"
    }
  ]);

  // Filtrer les annonces en fonction des critères
  const annoncesFiltrees = annonces.filter(annonce => {
    // Filtre par statut
    if (filtres.statut !== 'tous' && annonce.statut !== filtres.statut) {
      return false;
    }

    // Filtre par type
    if (filtres.type !== 'tous' && annonce.type !== filtres.type) {
      return false;
    }

    // Filtre par recherche
    if (recherche && !annonce.titre.toLowerCase().includes(recherche.toLowerCase()) &&
      !annonce.lieu.toLowerCase().includes(recherche.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Trier les annonces
  const annoncesTriees = [...annoncesFiltrees].sort((a, b) => {
    if (filtres.tri === 'recent') {
      return new Date(b.dateModification) - new Date(a.dateModification);
    } else if (filtres.tri === 'vues') {
      return b.vues - a.vues;
    } else if (filtres.tri === 'messages') {
      return b.messages - a.messages;
    }
    return 0;
  });

  // Gérer le changement de statut d'une annonce
  const changerStatutAnnonce = (id, nouveauStatut) => {
    setAnnonces(annonces.map(annonce =>
      annonce.id === id ? { ...annonce, statut: nouveauStatut } : annonce
    ));
  };

  // Supprimer une annonce
  const supprimerAnnonce = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      setAnnonces(annonces.filter(annonce => annonce.id !== id));
    }
  };

  // Obtenir le libellé du statut
  const getStatutLabel = (statut) => {
    switch (statut) {
      case 'active': return 'Active';
      case 'en_attente': return 'En attente';
      case 'expiree': return 'Expirée';
      case 'brouillon': return 'Brouillon';
      default: return statut;
    }
  };

  // Obtenir la classe CSS pour le statut
  const getStatutClass = (statut) => {
    switch (statut) {
      case 'active': return "bg-[#3CB371]/10 text-[#3CB371]";
      case 'en_attente': return "bg-[#F6A34A]/10 text-[#F6A34A]";
      case 'expiree': return "bg-gray-200 text-gray-600";
      case 'brouillon': return "bg-blue-100 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Obtenir l'icône pour le statut
  const getStatutIcon = (statut) => {
    switch (statut) {
      case 'active': return faCheck;
      case 'en_attente': return faClock;
      case 'expiree': return faExclamationTriangle;
      case 'brouillon': return faEdit;
      default: return faCircle;
    }
  };

  if (loading) return <Loading />

  return (
    <div className="bg-gray-50 w-full min-h-screen">

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">

          {/* Contenu principal - Page Mes annonces */}
          <main className="flex-1">
            {/* En-tête */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Mes annonces</h1>
                  <p className="text-gray-600">Gérez toutes vos annonces de logement étudiant</p>
                </div>
                <Link to={'/annonces/creer'} className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition flex items-center">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Nouvelle annonce
                </Link>
              </div>
            </div>

            {/* Filtres et recherche */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher une annonce..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent"
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setFiltreOuvert(!filtreOuvert)}
                  >
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500" />
                    <span>Filtrer</span>
                    <FontAwesomeIcon icon={filtreOuvert ? faChevronDown : faChevronDown} className="text-gray-500" />
                  </button>

                  <button className="p-2 text-gray-500 hover:text-gray-700" onClick={() => {
                    setFiltres({ statut: 'tous', type: 'tous', tri: 'recent' });
                    setRecherche('');
                  }}>
                    <FontAwesomeIcon icon={faSyncAlt} />
                  </button>
                </div>
              </div>

              {/* Panneau de filtres détaillés */}
              {filtreOuvert && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent"
                        value={filtres.statut}
                        onChange={(e) => setFiltres({ ...filtres, statut: e.target.value })}
                      >
                        <option value="tous">Tous les statuts</option>
                        <option value="active">Active</option>
                        <option value="en_attente">En attente</option>
                        <option value="expiree">Expirée</option>
                        <option value="brouillon">Brouillon</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type de logement</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent"
                        value={filtres.type}
                        onChange={(e) => setFiltres({ ...filtres, type: e.target.value })}
                      >
                        <option value="tous">Tous les types</option>
                        <option value="studio">Studio</option>
                        <option value="appartement">Appartement</option>
                        <option value="colocation">Colocation</option>
                        <option value="chambre">Chambre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent"
                        value={filtres.tri}
                        onChange={(e) => setFiltres({ ...filtres, tri: e.target.value })}
                      >
                        <option value="recent">Plus récent</option>
                        <option value="vues">Plus de vues</option>
                        <option value="messages">Plus de messages</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Résumé des annonces */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{total}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
                    <FontAwesomeIcon icon={faHome} className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Actives</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">
                      {annonces.filter(a => a.statut === 'active').length}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                    <FontAwesomeIcon icon={faCheck} className="text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">En attente</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">
                      {annonces.filter(a => a.statut === 'en_attente').length}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-100">
                    <FontAwesomeIcon icon={faClock} className="text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Expirées</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">
                      {annonces.filter(a => a.statut === 'expiree').length}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Liste des annonces */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                  Toutes vos annonces ({total})
                </h2>

                <div className="text-sm text-gray-500">
                  {annoncesTriees.length} sur {annonces.length} annonces
                </div>
              </div>

              {annoncesTriees.length === 0 ? (
                <div className="text-center py-10">
                  <FontAwesomeIcon icon={faHome} className="text-gray-300 text-5xl mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune annonce trouvée</h3>
                  <p className="text-gray-500 mb-4">
                    {recherche || filtres.statut !== 'tous' || filtres.type !== 'tous'
                      ? "Essayez de modifier vos filtres ou votre recherche"
                      : "Vous n'avez pas encore créé d'annonce"
                    }
                  </p>
                  {(recherche || filtres.statut !== 'tous' || filtres.type !== 'tous') ? (
                    <button
                      className="text-[#2C5CD5] hover:text-[#2351C0] font-medium"
                      onClick={() => {
                        setFiltres({ statut: 'tous', type: 'tous', tri: 'recent' });
                        setRecherche('');
                      }}
                    >
                      Réinitialiser les filtres
                    </button>
                  ) : (
                    <Link
                      to="/annonces/creer"
                      className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                      Créer une annonce
                    </Link>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {mesAnnonces.map((annonce) => (
                    <div key={annonce._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-48 flex-shrink-0">
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <img
                              src={lien + '/' + annonce.photos[0]}
                              alt={annonce.titre}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                            <div>
                              <h3 className="font-bold text-gray-800 text-lg">{annonce.titre}</h3>
                              <p className="text-gray-600">{annonce.ville}, {annonce.quartier}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatutClass(annonce.statut)}`}>
                                <FontAwesomeIcon icon={getStatutIcon(annonce.statut)} className="mr-1" />
                                {getStatutLabel(annonce.statut)}
                              </span>

                              <div className="relative">
                                <button className="p-1 text-gray-400 hover:text-gray-600">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </button>

                                {/* Menu déroulant des actions */}
                                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10 hidden">
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => changerStatutAnnonce(annonce.id, 'active')}
                                  >
                                    <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-500" />
                                    Marquer comme active
                                  </button>
                                  <Link
                                    to={`editer/${annonce._id}`}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <FontAwesomeIcon icon={faEdit} className="mr-2 text-blue-500" />
                                    Modifier
                                  </Link>
                                  <button
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    onClick={() => supprimerAnnonce(annonce.id)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                    Supprimer
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-500">Prix</p>
                              <p className="font-medium text-gray-800">{formaterPrix(annonce.prix)} GNF</p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">Vues</p>
                              <p className="font-medium text-gray-800">{annonce.vues}</p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">Messages</p>
                              <p className="font-medium text-gray-800">{annonce.messages}</p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">Modifiée le</p>
                              <p className="font-medium text-gray-800">
                                {new Date(annonce.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Link
                              // to={`/annonces/${annonce.id}`}
                              to={annonce._id}
                              className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                            >
                              <FontAwesomeIcon icon={faEye} />
                              Voir
                            </Link>

                            <Link
                              to={`${annonce._id}/modifier`}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              Modifier
                            </Link>

                            {annonce.statut === 'active' && (
                              <button
                                className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm hover:bg-yellow-200"
                                onClick={() => changerStatutAnnonce(annonce.id, 'en_attente')}
                              >
                                <FontAwesomeIcon icon={faClock} />
                                Désactiver
                              </button>
                            )}

                            {annonce.statut === 'en_attente' && (
                              <button
                                className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                                onClick={() => changerStatutAnnonce(annonce.id, 'active')}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                                Activer
                              </button>
                            )}

                            <button
                              className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                              onClick={() => handleClick(annonce._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>

        <ConfirmatonAction
          isOpen={popUp}
          onConfirm={() => handleDelete(supprimerAnnonce)}
          onCancel={() => setPopUp(false)}
          operation = {operationEnCours}
        />
        <Toaster position='bottom-right' richColors/>
      </div>

      {/* Styles */}
      <style>{`
        /* Animations personnalisées */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
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
      `}</style>
    </div>
  );
};

export default ProprietaireAnnonces;