import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faHome,
  faUserShield,
  faChartLine,
  faCalendarAlt,
  faEye,
  faMessage,
  faArrowUp,
  faArrowDown,
  faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const Ctest = () => {
  const [periode, setPeriode] = useState('mois');
  const [donneesStats, setDonneesStats] = useState({});
  const [chargement, setChargement] = useState(true);

  // Données simulées - à remplacer par des appels API réels
  useEffect(() => {
    const simulerChargement = async () => {
      setChargement(true);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const donnees = {
        utilisateurs: {
          total: 1245,
          etudiants: 889,
          proprietaires: 356,
          nouveauxCeMois: 89,
          evolution: 12 // pourcentage
        },
        annonces: {
          total: 542,
          actives: 487,
          enAttente: 55,
          nouvellesCeMois: 42,
          evolution: 23 // pourcentage
        },
        reservations: {
          total: 327,
          confirmees: 285,
          enAttente: 42,
          nouvellesCeMois: 38,
          evolution: 15 // pourcentage
        },
        revenus: {
          total: "28 450 000",
          ceMois: "3 450 000",
          evolution: 18 // pourcentage
        },
        activiteMensuelle: [
          { mois: 'Jan', utilisateurs: 45, annonces: 32, reservations: 28 },
          { mois: 'Fév', utilisateurs: 78, annonces: 45, reservations: 35 },
          { mois: 'Mar', utilisateurs: 102, annonces: 56, reservations: 42 },
          { mois: 'Avr', utilisateurs: 145, annonces: 67, reservations: 51 },
          { mois: 'Mai', utilisateurs: 189, annonces: 78, reservations: 63 },
          { mois: 'Jun', utilisateurs: 234, annonces: 92, reservations: 78 },
          { mois: 'Jul', utilisateurs: 267, annonces: 105, reservations: 89 },
          { mois: 'Aoû', utilisateurs: 312, annonces: 124, reservations: 103 },
          { mois: 'Sep', utilisateurs: 378, annonces: 156, reservations: 124 },
          { mois: 'Oct', utilisateurs: 445, annonces: 187, reservations: 156 },
          { mois: 'Nov', utilisateurs: 523, annonces: 223, reservations: 189 },
          { mois: 'Déc', utilisateurs: 624, annonces: 267, reservations: 223 }
        ],
        repartitionAnnonces: [
          { ville: 'Conakry', nombre: 267 },
          { ville: 'Kindia', nombre: 89 },
          { ville: 'Kankan', nombre: 67 },
          { ville: 'Labé', nombre: 45 },
          { ville: 'Autres', nombre: 74 }
        ],
        tauxConversion: [
          { semaine: 'Sem 1', vues: 1245, contacts: 345, reservations: 89 },
          { semaine: 'Sem 2', vues: 1356, contacts: 378, reservations: 102 },
          { semaine: 'Sem 3', vues: 1423, contacts: 412, reservations: 124 },
          { semaine: 'Sem 4', vues: 1567, contacts: 456, reservations: 145 }
        ]
      };
      
      setDonneesStats(donnees);
      setChargement(false);
    };

    simulerChargement();
  }, [periode]);

  // Couleurs pour les graphiques
  const COULEURS = ['#2C5CD5', '#3CB371', '#F6A34A', '#9C27B0', '#E91E63'];
  
  const CarteStatistique = ({ titre, valeur, sousTitre, evolution, icone, couleur }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600">{titre}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{valeur}</h3>
          <div className={`flex items-center mt-2 ${evolution >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <FontAwesomeIcon icon={evolution >= 0 ? faArrowUp : faArrowDown} className="text-xs mr-1" />
            <span className="text-sm font-medium">{Math.abs(evolution)}%</span>
            <span className="text-sm text-gray-500 ml-2">{sousTitre}</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${couleur} text-white`}>
          <FontAwesomeIcon icon={icone} className="w-5" />
        </div>
      </div>
    </div>
  );

  if (chargement) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Statistiques de la plateforme</h1>
          <p className="text-gray-600">Analyse des performances et de l'activité de LoguiStud</p>
        </div>
        <div className="flex space-x-2">
          <select 
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
          >
            <option value="semaine">Cette semaine</option>
            <option value="mois">Ce mois</option>
            <option value="trimestre">Ce trimestre</option>
            <option value="annee">Cette année</option>
          </select>
        </div>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CarteStatistique 
          titre="Utilisateurs totaux" 
          valeur={donneesStats.utilisateurs?.total.toLocaleString() || '0'} 
          sousTitre="ce mois"
          evolution={donneesStats.utilisateurs?.evolution || 0}
          icone={faUsers}
          couleur="bg-blue-500"
        />
        <CarteStatistique 
          titre="Propriétaires" 
          valeur={donneesStats.utilisateurs?.proprietaires.toLocaleString() || '0'} 
          sousTitre="inscrits"
          evolution={8}
          icone={faUserShield}
          couleur="bg-green-500"
        />
        <CarteStatistique 
          titre="Étudiants" 
          valeur={donneesStats.utilisateurs?.etudiants.toLocaleString() || '0'} 
          sousTitre="inscrits"
          evolution={15}
          icone={faUsers}
          couleur="bg-purple-500"
        />
        <CarteStatistique 
          titre="Annonces actives" 
          valeur={donneesStats.annonces?.total.toLocaleString() || '0'} 
          sousTitre="ce mois"
          evolution={donneesStats.annonces?.evolution || 0}
          icone={faHome}
          couleur="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Graphique d'activité mensuelle */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Activité mensuelle</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donneesStats.activiteMensuelle}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="utilisateurs" fill="#2C5CD5" name="Nouveaux utilisateurs" />
                <Bar dataKey="annonces" fill="#3CB371" name="Nouvelles annonces" />
                <Bar dataKey="reservations" fill="#F6A34A" name="Réservations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Répartition des annonces par ville */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Annonces par ville</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donneesStats.repartitionAnnonces}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="nombre"
                  label={({ ville, nombre }) => `${ville}: ${nombre}`}
                >
                  {donneesStats.repartitionAnnonces.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COULEURS[index % COULEURS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Taux de conversion */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Taux de conversion</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donneesStats.tauxConversion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="semaine" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vues" stroke="#2C5CD5" name="Vues d'annonces" strokeWidth={2} />
                <Line type="monotone" dataKey="contacts" stroke="#3CB371" name="Contacts" strokeWidth={2} />
                <Line type="monotone" dataKey="reservations" stroke="#F6A34A" name="Réservations" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistiques supplémentaires */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Performances</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Taux de réservation</span>
                <span className="text-sm font-bold text-green-500">+12%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Annonces vérifiées</span>
                <span className="text-sm font-bold text-blue-500">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Utilisateurs actifs</span>
                <span className="text-sm font-bold text-purple-500">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Temps de réponse moyen</span>
                <span className="text-sm font-bold text-orange-500">4.2h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ctest;



// const Ctest = () => {
//   const [parametres, setParametres] = useState({
//     // Paramètres de notification
//     notificationsEmail: true,
//     notificationsSMS: false,
//     alertesNouvellesAnnonces: true,
//     alertesReservations: true,
//     alertesMessages: true,
    
//     // Paramètres de confidentialité
//     profilPublic: false,
//     afficherContact: true,
//     partageDonnees: false,
    
//     // Paramètres d'apparence
//     theme: 'clair',
//     langue: 'fr',
//     densiteAffichage: 'normal',
    
//     // Paramètres de compte
//     email: 'admin@loguistud.com',
//     telephone: '+224 123 456 789',
//     newsletter: true,
    
//     // Paramètres système
//     tailleCache: '250 Mo',
//     autoSauvegarde: true,
//     frequenceSauvegarde: 'quotidienne'
//   });

//   const [sauvegardeMessage, setSauvegardeMessage] = useState('');
//   const [sectionActive, setSectionActive] = useState('notifications');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setParametres(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const sauvegarderParametres = () => {
//     // Simulation de sauvegarde
//     setSauvegardeMessage('Paramètres sauvegardés avec succès!');
//     setTimeout(() => setSauvegardeMessage(''), 3000);
    
//     // Ici, vous ajouterez l'appel API pour sauvegarder les paramètres
//     console.log('Paramètres sauvegardés:', parametres);
//   };

//   const reinitialiserParametres = () => {
//     if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres?')) {
//       setParametres({
//         notificationsEmail: true,
//         notificationsSMS: false,
//         alertesNouvellesAnnonces: true,
//         alertesReservations: true,
//         alertesMessages: true,
//         profilPublic: false,
//         afficherContact: true,
//         partageDonnees: false,
//         theme: 'clair',
//         langue: 'fr',
//         densiteAffichage: 'normal',
//         email: 'admin@loguistud.com',
//         telephone: '+224 123 456 789',
//         newsletter: true,
//         tailleCache: '250 Mo',
//         autoSauvegarde: true,
//         frequenceSauvegarde: 'quotidienne'
//       });
//       setSauvegardeMessage('Paramètres réinitialisés!');
//       setTimeout(() => setSauvegardeMessage(''), 3000);
//     }
//   };

//   const SectionBouton = ({ icone, titre, nomSection }) => (
//     <button
//       onClick={() => setSectionActive(nomSection)}
//       className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-left w-full ${
//         sectionActive === nomSection 
//           ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
//           : 'text-gray-700 hover:bg-gray-100'
//       }`}
//     >
//       <FontAwesomeIcon icon={icone} className="w-5" />
//       <span>{titre}</span>
//     </button>
//   );

//   const GroupeParametres = ({ titre, enfants }) => (
//     <div className="mb-6">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">{titre}</h3>
//       <div className="space-y-4">
//         {enfants}
//       </div>
//     </div>
//   );

//   const OptionParametre = ({ type, nom, valeur, etiquette, description, options }) => (
//     <div className="flex items-center justify-between py-3">
//       <div className="flex-1">
//         <label htmlFor={nom} className="block text-sm font-medium text-gray-700">
//           {etiquette}
//         </label>
//         {description && (
//           <p className="text-xs text-gray-500 mt-1">{description}</p>
//         )}
//       </div>
//       <div className="ml-4">
//         {type === 'checkbox' ? (
//           <div className="flex items-center">
//             <input
//               id={nom}
//               name={nom}
//               type="checkbox"
//               checked={valeur}
//               onChange={handleChange}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//           </div>
//         ) : type === 'select' ? (
//           <select
//             id={nom}
//             name={nom}
//             value={valeur}
//             onChange={handleChange}
//             className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//           >
//             {options.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         ) : type === 'text' ? (
//           <input
//             type="text"
//             id={nom}
//             name={nom}
//             value={valeur}
//             onChange={handleChange}
//             className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//           />
//         ) : null}
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
//         <p className="text-gray-600">Gérez les préférences et configurations de votre compte administrateur</p>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Navigation latérale */}
//         <div className="lg:w-64 flex-shrink-0">
//           <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
//             <nav className="space-y-1">
//               <SectionBouton 
//                 icone={faBell} 
//                 titre="Notifications" 
//                 nomSection="notifications" 
//               />
//               <SectionBouton 
//                 icone={faShield} 
//                 titre="Confidentialité" 
//                 nomSection="confidentialite" 
//               />
//               <SectionBouton 
//                 icone={faPalette} 
//                 titre="Apparence" 
//                 nomSection="apparence" 
//               />
//               <SectionBouton 
//                 icone={faUserCog} 
//                 titre="Compte" 
//                 nomSection="compte" 
//               />
//               <SectionBouton 
//                 icone={faDatabase} 
//                 titre="Système" 
//                 nomSection="systeme" 
//               />
//               <SectionBouton 
//                 icone={faGlobe} 
//                 titre="Préférences régionales" 
//                 nomSection="regional" 
//               />
//             </nav>
//           </div>
//         </div>

//         {/* Contenu principal */}
//         <div className="flex-1">
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             {sauvegardeMessage && (
//               <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
//                 {sauvegardeMessage}
//               </div>
//             )}

//             {/* Section Notifications */}
//             {sectionActive === 'notifications' && (
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                   <FontAwesomeIcon icon={faBell} className="mr-3 text-blue-600" />
//                   Paramètres de notifications
//                 </h2>
                
//                 <GroupeParametres titre="Canaux de notification">
//                   <OptionParametre
//                     type="checkbox"
//                     nom="notificationsEmail"
//                     valeur={parametres.notificationsEmail}
//                     etiquette="Notifications par email"
//                     description="Recevez des notifications importantes par email"
//                   />
//                   <OptionParametre
//                     type="checkbox"
//                     nom="notificationsSMS"
//                     valeur={parametres.notificationsSMS}
//                     etiquette="Notifications par SMS"
//                     description="Recevez des alertes urgentes par SMS"
//                   />
//                 </GroupeParametres>

//                 <GroupeParametres titre="Types d'alertes">
//                   <OptionParametre
//                     type="checkbox"
//                     nom="alertesNouvellesAnnonces"
//                     valeur={parametres.alertesNouvellesAnnonces}
//                     etiquette="Nouvelles annonces"
//                     description="Être alerté lorsqu'une nouvelle annonce est publiée"
//                   />
//                   <OptionParametre
//                     type="checkbox"
//                     nom="alertesReservations"
//                     valeur={parametres.alertesReservations}
//                     etiquette="Nouvelles réservations"
//                     description="Être alerté lorsqu'une réservation est effectuée"
//                   />
//                   <OptionParametre
//                     type="checkbox"
//                     nom="alertesMessages"
//                     valeur={parametres.alertesMessages}
//                     etiquette="Nouveaux messages"
//                     description="Être alerté lorsqu'un nouveau message est reçu"
//                   />
//                 </GroupeParametres>
//               </div>
//             )}

//             {/* Section Confidentialité */}
//             {sectionActive === 'confidentialite' && (
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                   <FontAwesomeIcon icon={faShield} className="mr-3 text-blue-600" />
//                   Paramètres de confidentialité
//                 </h2>
                
//                 <GroupeParametres titre="Visibilité du profil">
//                   <OptionParametre
//                     type="checkbox"
//                     nom="profilPublic"
//                     valeur={parametres.profilPublic}
//                     etiquette="Profil public"
//                     description="Rendre votre profil visible par tous les utilisateurs"
//                   />
//                   <OptionParametre
//                     type="checkbox"
//                     nom="afficherContact"
//                     valeur={parametres.afficherContact}
//                     etiquette="Afficher mes coordonnées"
//                     description="Permettre aux utilisateurs de voir vos informations de contact"
//                   />
//                 </GroupeParametres>

//                 <GroupeParametres titre="Données et confidentialité">
//                   <OptionParametre
//                     type="checkbox"
//                     nom="partageDonnees"
//                     valeur={parametres.partageDonnees}
//                     etiquette="Partage de données analytiques"
//                     description="Autoriser le partage de données anonymisées à des fins d'amélioration de la plateforme"
//                   />
//                 </GroupeParametres>
//               </div>
//             )}

//             {/* Section Apparence */}
//             {sectionActive === 'apparence' && (
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                   <FontAwesomeIcon icon={faPalette} className="mr-3 text-blue-600" />
//                   Apparence et interface
//                 </h2>
                
//                 <GroupeParametres titre="Thème">
//                   <OptionParametre
//                     type="select"
//                     nom="theme"
//                     valeur={parametres.theme}
//                     etiquette="Thème de l'interface"
//                     options={[
//                       { value: 'clair', label: 'Clair' },
//                       { value: 'sombre', label: 'Sombre' },
//                       { value: 'auto', label: 'Automatique' }
//                     ]}
//                   />
//                 </GroupeParametres>

//                 <GroupeParametres titre="Affichage">
//                   <OptionParametre
//                     type="select"
//                     nom="densiteAffichage"
//                     valeur={parametres.densiteAffichage}
//                     etiquette="Densité d'affichage"
//                     options={[
//                       { value: 'compact', label: 'Compact' },
//                       { value: 'normal', label: 'Normal' },
//                       { value: 'comfortable', label: 'Confortable' }
//                     ]}
//                   />
//                 </GroupeParametres>
//               </div>
//             )}

//             {/* Section Compte */}
//             {sectionActive === 'compte' && (
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                   <FontAwesomeIcon icon={faUserCog} className="mr-3 text-blue-600" />
//                   Paramètres du compte
//                 </h2>
                
//                 <GroupeParametres titre="Informations de contact">
//                   <OptionParametre
//                     type="text"
//                     nom="email"
//                     valeur={parametres.email}
//                     etiquette="Adresse email"
//                   />
//                   <OptionParametre
//                     type="text"
//                     nom="telephone"
//                     valeur={parametres.telephone}
//                     etiquette="Numéro de téléphone"
//                   />
//                 </GroupeParametres>

//                 <GroupeParametres titre="Préférences de communication">
//                   <OptionParametre
//                     type="checkbox"
//                     nom="newsletter"
//                     valeur={parametres.newsletter}
//                     etiquette="Recevoir la newsletter"
//                     description="Recevoir les actualités et les mises à jour de LoguiStud"
//                   />
//                 </GroupeParametres>
//               </div>
//             )}

//             {/* Section Système */}
//             {sectionActive === 'systeme' && (
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                   <FontAwesomeIcon icon={faDatabase} className="mr-3 text-blue-600" />
//                   Paramètres système
//                 </h2>
                
//                 <GroupeParametres titre="Gestion des données">
//                   <OptionParametre
//                     type="checkbox"
//                     nom="autoSauvegarde"
//                     valeur={parametres.autoSauvegarde}
//                     etiquette="Sauvegarde automatique"
//                     description="Sauvegarder automatiquement les paramètres et préférences"
//                   />
                  
//                   {parametres.autoSauvegarde && (
//                     <OptionParametre
//                       type="select"
//                       nom="frequenceSauvegarde"
//                       valeur={parametres.frequenceSauvegarde}
//                       etiquette="Fréquence de sauvegarde"
//                       options={[
//                         { value: 'quotidienne', label: 'Quotidienne' },
//                         { value: 'hebdomadaire', label: 'Hebdomadaire' },
//                         { value: 'mensuelle', label: 'Mensuelle' }
//                       ]}
//                     />
//                   )}
                  
//                   <div className="flex items-center justify-between py-3">
//                     <div className="flex-1">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Taille du cache
//                       </label>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Espace utilisé pour le stockage temporaire
//                       </p>
//                     </div>
//                     <div className="ml-4">
//                       <span className="text-sm text-gray-700">{parametres.tailleCache}</span>
//                       <button className="ml-4 text-sm text-blue-600 hover:text-blue-800">
//                         Vider le cache
//                       </button>
//                     </div>
//                   </div>
//                 </GroupeParametres>
//               </div>
//             )}

//             {/* Section Préférences régionales */}
//             {sectionActive === 'regional' && (
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
//                   <FontAwesomeIcon icon={faGlobe} className="mr-3 text-blue-600" />
//                   Préférences régionales
//                 </h2>
                
//                 <GroupeParametres titre="Langue et région">
//                   <OptionParametre
//                     type="select"
//                     nom="langue"
//                     valeur={parametres.langue}
//                     etiquette="Langue"
//                     options={[
//                       { value: 'fr', label: 'Français' },
//                       { value: 'en', label: 'English' }
//                     ]}
//                   />
                  
//                   <OptionParametre
//                     type="select"
//                     nom="fuseauHoraire"
//                     valeur="Africa/Conakry"
//                     etiquette="Fuseau horaire"
//                     options={[
//                       { value: 'Africa/Conakry', label: 'Guinée (GMT)' }
//                     ]}
//                   />
                  
//                   <OptionParametre
//                     type="select"
//                     nom="formatDate"
//                     valeur="jj/mm/aaaa"
//                     etiquette="Format de date"
//                     options={[
//                       { value: 'jj/mm/aaaa', label: 'JJ/MM/AAAA' },
//                       { value: 'aaaa-mm-jj', label: 'AAAA-MM-JJ' },
//                       { value: 'mm/jj/aaaa', label: 'MM/JJ/AAAA' }
//                     ]}
//                   />
//                 </GroupeParametres>
//               </div>
//             )}

//             {/* Boutons d'action */}
//             <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
//               <button
//                 onClick={reinitialiserParametres}
//                 className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <FontAwesomeIcon icon={faUndo} className="mr-2" />
//                 Réinitialiser
//               </button>
              
//               <button
//                 onClick={sauvegarderParametres}
//                 className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <FontAwesomeIcon icon={faSave} className="mr-2" />
//                 Sauvegarder les modifications
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Ctest;