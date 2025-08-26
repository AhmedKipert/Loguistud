import React, { useState, useEffect } from 'react';
import { faTachometerAlt, faUsers, faHome, faComments, faBell, faCog, faSignOutAlt, faBars, faCheck, faEdit, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableauDeBordAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    users: 1248,
    listings: 576,
    messages: 3421
  });

  useEffect(() => {
    // Animation pour les statistiques
    const timer = setTimeout(() => {
      const statsElements = document.querySelectorAll('.stat-value');
      statsElements.forEach(el => {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
          el.style.transform = 'scale(1)';
        }, 300);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const recentActivities = [
    {
      id: 1,
      type: "Nouvel utilisateur inscrit",
      details: "Mamadou Diallo (Étudiant)",
      time: "10 min",
      avatar: "https://via.placeholder.com/40"
    },
    {
      id: 2,
      type: "Nouvelle annonce",
      details: "Appartement à Coléah",
      time: "45 min",
      avatar: "https://via.placeholder.com/40"
    },
    {
      id: 3,
      type: "Message signalé",
      details: "Conversation #1245",
      time: "2h",
      avatar: "https://via.placeholder.com/40"
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Aissatou Bah",
      email: "aissatou@example.com",
      role: "Étudiant",
      status: "Vérifié",
      avatar: "https://via.placeholder.com/40"
    }
    // Plus d'utilisateurs peuvent être ajoutés ici
  ];

  return (
    <div className="bg-gray-50 font-sans">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'flex' : 'hidden'} md:flex md:flex-shrink-0`}>
          <div className="flex flex-col w-64 bg-light border-r">
            <div className="flex items-center justify-center h-16 bg-primary">
              <span className="text-white font-bold text-xl">LoguiStud Admin</span>
            </div>
            <div className="flex flex-col flex-grow p-4 overflow-y-auto">
              <nav className="flex-1 space-y-2">
                <a href="#" className="flex items-center px-4 py-2 text-primary bg-white rounded-lg">
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
                  Tableau de bord
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-white hover:text-primary rounded-lg">
                  <FontAwesomeIcon icon={faUsers} className="mr-3" />
                  Utilisateurs
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-white hover:text-primary rounded-lg">
                  <FontAwesomeIcon icon={faHome} className="mr-3" />
                  Annonces
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-white hover:text-primary rounded-lg">
                  <FontAwesomeIcon icon={faComments} className="mr-3" />
                  Messages
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-white hover:text-primary rounded-lg">
                  <FontAwesomeIcon icon={faBell} className="mr-3" />
                  Notifications
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-white hover:text-primary rounded-lg">
                  <FontAwesomeIcon icon={faCog} className="mr-3" />
                  Paramètres
                </a>
              </nav>
            </div>
            <div className="p-4">
              <button className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center">
                <button className="md:hidden mr-4 text-gray-500" onClick={toggleSidebar}>
                  <FontAwesomeIcon icon={faBars} />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">Tableau de bord</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative text-gray-500 hover:text-primary">
                  <FontAwesomeIcon icon={faBell} />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="flex items-center">
                  <img src="https://via.placeholder.com/40" alt="Admin" className="h-8 w-8 rounded-full" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Utilisateurs</p>
                    <h3 className="text-2xl font-bold stat-value">{stats.users.toLocaleString()}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-secondary bg-opacity-20 text-secondary">
                    <FontAwesomeIcon icon={faUsers} className="text-xl" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm">↑ 12% ce mois</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Annonces</p>
                    <h3 className="text-2xl font-bold stat-value">{stats.listings.toLocaleString()}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-accent bg-opacity-20 text-accent">
                    <FontAwesomeIcon icon={faHome} className="text-xl" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm">↑ 8% ce mois</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Messages</p>
                    <h3 className="text-2xl font-bold stat-value">{stats.messages.toLocaleString()}</h3>
                  </div>
                  <div className="p-3 rounded-full bg-primary bg-opacity-20 text-primary">
                    <FontAwesomeIcon icon={faComments} className="text-xl" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm">↑ 24% ce mois</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Activité récente</h2>
                <a href="#" className="text-primary text-sm">Voir tout</a>
              </div>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                    <img src={activity.avatar} alt="User" className="h-10 w-10 rounded-full" />
                    <div className="ml-4">
                      <p className="font-medium">{activity.type}</p>
                      <p className="text-gray-500 text-sm">{activity.details}</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Utilisateurs récents</h2>
                  <div className="flex space-x-2">
                    <select className="border rounded px-3 py-1 text-sm">
                      <option>Tous</option>
                      <option>Étudiants</option>
                      <option>Propriétaires</option>
                    </select>
                    <button className="bg-primary text-white px-3 py-1 rounded text-sm">
                      Exporter
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentUsers.map(user => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img src={user.avatar} alt="User" className="h-10 w-10 rounded-full" />
                            <div className="ml-4">
                              <div className="font-medium">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{user.role}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{user.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-secondary hover:text-green-700 mr-2">
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button className="text-accent hover:text-orange-700 mr-2">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <FontAwesomeIcon icon={faBan} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Affichage de 1 à 5 sur {stats.users.toLocaleString()} utilisateurs
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border rounded text-sm">Précédent</button>
                  <button className="px-3 py-1 border rounded bg-primary text-white text-sm">Suivant</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TableauDeBordAdmin;