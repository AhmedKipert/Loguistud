import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faSearch,
  faHeart,
  faEnvelope,
  faFileAlt,
  faUserEdit,
  faCog,
  faSignOutAlt,
  faBell,
  faUpload,
  faEdit,
  faQuestionCircle,
  faShareAlt,
  faMapMarkerAlt,
  faChevronRight,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { me } from '../../services/authService';
import ParametreCompte from './EtudiantParametre';
import AccueilDashboard from './AccueilDashboard';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Navbar from '../autres/Navbar';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Loading } from '../autres/Loading';

const TableauDeBordEtudiant = () => {
  // Etat pour le menu mobile
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [nomComplet, setNomComplet] = useState('');
  const [compte, setCompte] = useState({});
  const lien = import.meta.env.VITE_API_URL;
  const [imageSrc, setImageSrc] = useState(null);
  const [activeTab, setActiveTab] = useState('main');

  // Donnees des logements suggeres
  const [logementsSuggeres, setLogementsSuggeres] = useState([
    {
      id: 1,
      titre: "Colocation etudiante a Dixinn",
      prix: "1 250 000 GNF",
      localisation: "10 min de l'UGANC",
      tags: ["2 chambres", "Wi-Fi"],
      image: "https://via.placeholder.com/400x300",
      nouveau: true
    },
    {
      id: 2,
      titre: "Studio meuble a Matam",
      prix: "1 800 000 GNF",
      localisation: "15 min en taxi",
      tags: ["Studio", "Climatise"],
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 3,
      titre: "Chambre chez l'habitant",
      prix: "900 000 GNF",
      localisation: "Ratoma, 12 min a pied",
      tags: ["Cuisine", "Gardien"],
      image: "https://via.placeholder.com/400x300"
    }
  ]);

  const { user, loading } = useContext(AuthContext)

  // Activites recentes
  const activitesRecentes = [
    {
      date: "12/05/2024",
      action: "Message envoye",
      details: "Colocation Dixinn",
      statut: "Reponse recue",
      couleurStatut: "green"
    },
    {
      date: "10/05/2024",
      action: "Document uploadé",
      details: "Certificat de scolarite",
      statut: "Valide",
      couleurStatut: "blue"
    },
    {
      date: "08/05/2024",
      action: "Favori ajoute",
      details: "Studio Matam",
      statut: "En attente",
      couleurStatut: "gray"
    }
  ];

  useEffect(() => {
    setNomComplet(user.compte.prenom + " " + user.compte.nom);
    setPrenom(user.compte.prenom);
    setCompte(user.compte);
    setImageSrc(user.compte.photoProfil);
  }, []);


  if (!user || loading) return <Loading />

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex bg-gray-50">

        {/* Menu lateral */}
        <aside
          className={`w-64 bg-white shadow-sm ${menuMobileOuvert ? 'block' : 'hidden'} md:block sticky top-0`}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-2 items-center">
              <div className="w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                <img
                  src={`${lien}/${imageSrc}`}
                  alt="Profil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className='col-span-2'>
                <h3 className="font-semibold">{nomComplet}</h3>
                <p className="text-xs text-gray-500">Etudiant {compte.universite}</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <NavLink
              to="/etudiant/dashboard"
              end
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
            >
              <FontAwesomeIcon
                icon={faTachometerAlt}
                className="text-blue-600 mr-3"
              />
              Tableau de bord
            </NavLink>
            <NavLink
              to="favories"
              end
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
            >
              <FontAwesomeIcon icon={faHeart} className="text-gray-500 mr-3" />
              Mes favoris
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
            </NavLink>
            <NavLink
              to="messagerie"
              end
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-3" />
              Messages
              <div className="ml-auto relative">
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
              </div>
            </NavLink>
            <NavLink
              to="documents"
              end
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
            >
              <FontAwesomeIcon icon={faFileAlt} className="text-gray-500 mr-3" />
              Mes documents
            </NavLink>
            <NavLink
              to="modifier-profil"
              end
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
            >
              <FontAwesomeIcon icon={faFileAlt} className="text-gray-500 mr-3" />
              Modifier mon profil
            </NavLink>
            <NavLink
              to="parametres"
              end
              className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg text-gray-800 hover:text-gray-800 hover:bg-blue-50 ${isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""}`}
            >
              <FontAwesomeIcon icon={faCog} className="text-gray-500 mr-3" />
              Paramètres
            </NavLink>
          </nav>

          <div className="p-4 border-t border-gray-200 mt-auto">
            <button
              className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Déconnexion
            </button>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 overflow-x-hidden">
          {/* En-tete */}
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <button
              className="md:hidden text-gray-600"
              onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Tableau de bord</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FontAwesomeIcon icon={faBell} className="text-gray-600 text-xl" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={`${lien}/${imageSrc}`}
                  alt="Profil"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </header>

          <Outlet />

        </main>
      </div>
    </div>
  );
};

export default TableauDeBordEtudiant;