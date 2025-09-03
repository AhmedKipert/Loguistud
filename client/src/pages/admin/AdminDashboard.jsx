import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faHome,
  faBell,
  faEnvelope,
  faCog,
  faSignOutAlt,
  faChartLine,
  faUserShield,
  faChevronDown,
  faSearch,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, Outlet } from 'react-router-dom';

const AdminDashboard = ({ children }) => {
  const [menuUtilisateurOuvert, setMenuUtilisateurOuvert] = useState(false);
  const [sidebarOuverte, setSidebarOuverte] = useState(true);

  // Données simulées pour l'admin
  const adminData = {
    nom: "Admin LoguiStud",
    email: "admin@loguistud.com",
    role: "superadmin",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg"
  };

  // Statistiques pour le tableau de bord
  const stats = [
    { titre: "Utilisateurs totaux", valeur: "1,245", variation: "+12% ce mois", icone: faUsers, couleur: "bg-blue-500" },
    { titre: "Propriétaires", valeur: "356", variation: "+8% ce mois", icone: faUserShield, couleur: "bg-green-500" },
    { titre: "Étudiants", valeur: "889", variation: "+15% ce mois", icone: faUsers, couleur: "bg-purple-500" },
    { titre: "Annonces actives", valeur: "542", variation: "+23% ce mois", icone: faHome, couleur: "bg-orange-500" }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOuverte ? 'w-64' : 'w-20'} bg-white shadow-md transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b">
          {sidebarOuverte && (
            <h1 className="text-xl font-bold text-blue-600">LoguiStud Admin</h1>
          )}
          <button 
            onClick={() => setSidebarOuverte(!sidebarOuverte)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={sidebarOuverte ? faTimes : faBars} className="text-gray-600" />
          </button>
        </div>

        {/* Menu de navigation */}
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-1">
            <li>
              <NavLink to="/admin/dashboard" className="flex items-center px-4 py-3 text-white bg-blue-600 rounded-lg">
                <FontAwesomeIcon icon={faTachometerAlt} className="w-5" />
                {sidebarOuverte && <span className="ml-3">Tableau de bord</span>}
              </NavLink>
            </li>
            <li>
              <NavLink end to="utilisateurs" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FontAwesomeIcon icon={faUsers} className="w-5" />
                {sidebarOuverte && <span className="ml-3">Utilisateurs</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="proprietaires" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FontAwesomeIcon icon={faUserShield} className="w-5" />
                {sidebarOuverte && <span className="ml-3">Propriétaires</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="etudiants" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FontAwesomeIcon icon={faUsers} className="w-5" />
                {sidebarOuverte && <span className="ml-3">Étudiants</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="annonces" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FontAwesomeIcon icon={faHome} className="w-5" />
                {sidebarOuverte && <span className="ml-3">Annonces</span>}
              </NavLink>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FontAwesomeIcon icon={faChartLine} className="w-5" />
                {sidebarOuverte && <span className="ml-3">Statistiques</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FontAwesomeIcon icon={faBell} className="w-5" />
                {sidebarOuverte && <span className="ml-3">Notifications</span>}
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FontAwesomeIcon icon={faCog} className="w-5" />
                {sidebarOuverte && <span className="ml-3">Paramètres</span>}
              </a>
            </li>
          </ul>
        </nav>

        {/* Déconnexion */}
        <div className="p-4 border-t">
          <a href="#" className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5" />
            {sidebarOuverte && <span className="ml-3">Déconnexion</span>}
          </a>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            {/* Recherche */}
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Notifications et profil */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800">
                <FontAwesomeIcon icon={faBell} className="w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-800">
                <FontAwesomeIcon icon={faEnvelope} className="w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setMenuUtilisateurOuvert(!menuUtilisateurOuvert)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                    <img src={adminData.avatar} alt={adminData.nom} className="h-full w-full object-cover" />
                  </div>
                  {sidebarOuverte && (
                    <>
                      <span className="text-sm font-medium text-gray-700">{adminData.nom}</span>
                      <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />
                    </>
                  )}
                </button>

                {/* Menu déroulant profil */}
                {menuUtilisateurOuvert && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-800">{adminData.nom}</p>
                      <p className="text-xs text-gray-500">{adminData.email}</p>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Paramètres</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Déconnexion</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {/* Contenu spécifique à chaque page */}
          <Outlet/>
        </main>
      </div>

      {/* Fermer le menu déroulant si on clique ailleurs */}
      {menuUtilisateurOuvert && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setMenuUtilisateurOuvert(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;