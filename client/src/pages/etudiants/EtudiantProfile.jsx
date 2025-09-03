import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faGraduationCap, faUniversity, faMapMarkerAlt, faStar,
  faEnvelope, faShareAlt, faUserGraduate, faBirthdayCake, faPhone,
  faBook, faLayerGroup, faCalendarAlt, faUsers, faBed,
  faBell, faPercentage, faInfoCircle, faCalendarCheck, faSignInAlt,
  faSignOutAlt, faStarHalfAlt, faCheck, faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const EtudiantProfile = () => {
  const [activeTab, setActiveTab] = useState('Profil');
  const [compatibilityAnimated, setCompatibilityAnimated] = useState(false);

  useEffect(() => {
    // Animation de la compatibilité après le rendu
    const timer = setTimeout(() => {
      setCompatibilityAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const tabs = ['Profil', 'Recherche', 'Favoris', 'Avis', 'Documents'];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* En-tête */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center mr-2">
              <FontAwesomeIcon icon={faHome} className="text-white text-sm" />
            </div>
            <span className="text-lg font-bold text-gray-800">Logui<span className="text-blue-600">Stud</span></span>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/logements" className="text-gray-600 hover:text-blue-600 hidden md:inline">Logements</a>
            <a href="/messages" className="text-gray-600 hover:text-blue-600 hidden md:inline">Messages</a>
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer">
                <img src="https://via.placeholder.com/150" alt="Profil" className="w-full h-full object-cover" />
              </div>
              <div className="online-dot absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </header>

      {/* En-tête du profil */}
      <div className="profile-header text-white bg-gradient-to-r from-blue-600 to-green-500">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative mb-6 md:mb-0 md:mr-8">
              <div className="w-32 h-32 rounded-full bg-white overflow-hidden border-4 border-white shadow-xl">
                <img src="https://via.placeholder.com/150" alt="Photo de profil" className="w-full h-full object-cover" />
              </div>
              <div className="verified-badge absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-1">
                <FontAwesomeIcon icon={faCheck} className="text-xs" />
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">Mamadou Diallo</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                <span className="badge bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm hover:-translate-y-1 transition-transform">
                  <FontAwesomeIcon icon={faGraduationCap} className="mr-1" /> Étudiant
                </span>
                <span className="badge bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm hover:-translate-y-1 transition-transform">
                  <FontAwesomeIcon icon={faUniversity} className="mr-1" /> UGANC
                </span>
                <span className="badge bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm hover:-translate-y-1 transition-transform">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> Conakry
                </span>
                <span className="badge bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm hover:-translate-y-1 transition-transform">
                  <FontAwesomeIcon icon={faStar} className="mr-1" /> 4.8/5
                </span>
              </div>
              
              <p className="max-w-2xl mb-4 opacity-90">
                Étudiant en 3ème année de Génie Logiciel à l'Université Gamal Abdel Nasser de Conakry.
                Je recherche une colocation sympa près du campus pour l'année académique 2024-2025.
              </p>
              
              <div className="flex justify-center md:justify-start space-x-4">
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Contacter
                </button>
                <button className="bg-white bg-opacity-20 px-6 py-2 rounded-lg font-medium hover:bg-opacity-30 transition">
                  <FontAwesomeIcon icon={faShareAlt} className="mr-2" /> Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab-button px-6 py-4 whitespace-nowrap relative ${activeTab === tab ? 'active text-blue-600 font-medium' : 'text-gray-600'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne de gauche */}
          <div className="lg:col-span-2">
            {/* À propos */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faUserGraduate} className="text-blue-600 mr-2" />
                À propos
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Informations personnelles</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <FontAwesomeIcon icon={faBirthdayCake} className="text-gray-400 mr-2 w-5" />
                      <span>25 ans</span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-2 w-5" />
                      <span>+224 123 456 789</span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2 w-5" />
                      <span>m.diallo@student.uganc.edu.gn</span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 mr-2 w-5" />
                      <span>Actuellement à Dixinn, Conakry</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Informations académiques</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <FontAwesomeIcon icon={faUniversity} className="text-gray-400 mr-2 w-5" />
                      <span>UGANC - Université Gamal Abdel Nasser</span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon icon={faBook} className="text-gray-400 mr-2 w-5" />
                      <span>Génie Logiciel</span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon icon={faLayerGroup} className="text-gray-400 mr-2 w-5" />
                      <span>3ème année (Licence 3)</span>
                    </li>
                    <li className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 mr-2 w-5" />
                      <span>2021 - 2024</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Préférences de logement */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faHome} className="text-green-500 mr-2" />
                Recherche de logement
              </h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Type de logement recherché</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="badge bg-green-100 text-green-600 px-4 py-2 rounded-full hover:-translate-y-1 transition-transform">
                    <FontAwesomeIcon icon={faUsers} className="mr-2" /> Colocation
                  </span>
                  <span className="badge bg-green-100 text-green-600 px-4 py-2 rounded-full hover:-translate-y-1 transition-transform">
                    <FontAwesomeIcon icon={faBed} className="mr-2" /> Chambre individuelle
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Budget mensuel</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">1 200 000 GNF</span>
                    <span className="text-sm text-gray-500">max 1 500 000 GNF</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Localisation préférée</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon icon={faUniversity} className="text-blue-600 mr-2" />
                      <h4 className="font-medium">Proximité université</h4>
                    </div>
                    <p className="text-sm text-gray-600">Moins de 30 minutes de transport</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600 mr-2" />
                      <h4 className="font-medium">Quartiers préférés</h4>
                    </div>
                    <p className="text-sm text-gray-600">Dixinn, Ratoma, Matam</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Annonces correspondantes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faBell} className="text-orange-400 mr-2" />
                  Suggestions pour vous
                </h2>
                <a href="/logements" className="text-sm text-blue-600 hover:underline">Voir tout</a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Annonce 1 */}
                <div className="housing-card bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img src="https://via.placeholder.com/400x300" alt="Logement" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Nouveau
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">Colocation étudiante à Dixinn</h3>
                      <span className="font-bold text-green-500">1 250 000 GNF</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                      <span>10 min de l'UGANC</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">2 chambres</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Meublé</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Wi-Fi</span>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
                      Voir détails
                    </button>
                  </div>
                </div>
                
                {/* Annonce 2 */}
                <div className="housing-card bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img src="https://via.placeholder.com/400x300" alt="Logement" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">Chambre chez l'habitant</h3>
                      <span className="font-bold text-green-500">900 000 GNF</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                      <span>Ratoma, 15 min de l'UGANC</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Chambre simple</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Cuisine commune</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Gardien</span>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Colonne de droite */}
          <div>
            {/* Compatibilité */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faPercentage} className="text-blue-600 mr-2" />
                Compatibilité
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Budget</span>
                    <span className="text-sm font-medium text-green-500">95%</span>
                  </div>
                  <div className="skill-bar w-full h-2 bg-gray-200 rounded overflow-hidden">
                    <div 
                      className="skill-progress h-full bg-gradient-to-r from-blue-600 to-green-500 rounded transition-all duration-1000 ease-out" 
                      style={{ width: compatibilityAnimated ? '95%' : '0%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Localisation</span>
                    <span className="text-sm font-medium text-green-500">85%</span>
                  </div>
                  <div className="skill-bar w-full h-2 bg-gray-200 rounded overflow-hidden">
                    <div 
                      className="skill-progress h-full bg-gradient-to-r from-blue-600 to-green-500 rounded transition-all duration-1000 ease-out" 
                      style={{ width: compatibilityAnimated ? '85%' : '0%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Équipements</span>
                    <span className="text-sm font-medium text-green-500">78%</span>
                  </div>
                  <div className="skill-bar w-full h-2 bg-gray-200 rounded overflow-hidden">
                    <div 
                      className="skill-progress h-full bg-gradient-to-r from-blue-600 to-green-500 rounded transition-all duration-1000 ease-out" 
                      style={{ width: compatibilityAnimated ? '78%' : '0%' }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Type de logement</span>
                    <span className="text-sm font-medium text-green-500">90%</span>
                  </div>
                  <div className="skill-bar w-full h-2 bg-gray-200 rounded overflow-hidden">
                    <div 
                      className="skill-progress h-full bg-gradient-to-r from-blue-600 to-green-500 rounded transition-all duration-1000 ease-out" 
                      style={{ width: compatibilityAnimated ? '90%' : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600 mt-1 mr-2" />
                  <p className="text-sm text-gray-700">Votre profil est complet à 87%. Complétez-le pour améliorer vos suggestions.</p>
                </div>
              </div>
            </div>
            
            {/* Disponibilité */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-green-500 mr-2" />
                Disponibilité
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faSignInAlt} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Date d'emménagement</h3>
                    <p className="text-sm text-gray-500">15 septembre 2024</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center mr-3">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Durée souhaitée</h3>
                    <p className="text-sm text-gray-500">10 mois (année académique)</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Avis récents */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FontAwesomeIcon icon={faStar} className="text-orange-400 mr-2" />
                Avis reçus
              </h2>
              
              <div className="space-y-4">
                {/* Avis 1 */}
                <div className="review-card bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                      <img src="https://via.placeholder.com/150" alt="Auteur" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">Aïcha B.</h4>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">12/05/2024</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Mamadou est un colocataire idéal, propre et respectueux. Je recommande !</p>
                </div>
                
                {/* Avis 2 */}
                <div className="review-card bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                      <img src="https://via.placeholder.com/150" alt="Auteur" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">Mohamed C.</h4>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(4)].map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />
                          ))}
                          <FontAwesomeIcon icon={faStarHalfAlt} className="text-sm" />
                        </div>
                        <span className="text-xs text-gray-500 ml-1">22/03/2024</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Très bon étudiant, sérieux dans ses engagements. Un peu discret mais très agréable.</p>
                </div>
              </div>
              
              <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:underline">
                Voir tous les avis (5)
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <a href="/" className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mr-2">
                  <FontAwesomeIcon icon={faHome} className="text-white text-sm" />
                </div>
                <span className="text-lg font-bold">Logui<span className="text-blue-600">Stud</span></span>
              </a>
              <p className="text-gray-400 text-sm">La solution de logement étudiant en Guinée. Trouvez votre chez-vous en quelques clics.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition">Accueil</a></li>
                <li><a href="/logements" className="text-gray-400 hover:text-white transition">Logements</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><a href="/conditions" className="text-gray-400 hover:text-white transition">Conditions d'utilisation</a></li>
                <li><a href="/confidentialite" className="text-gray-400 hover:text-white transition">Politique de confidentialité</a></li>
                <li><a href="/cookies" className="text-gray-400 hover:text-white transition">Politique des cookies</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 mr-2" />
                  <span className="text-gray-400">Conakry, Guinée</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-400 mr-2" />
                  <span className="text-gray-400">+224 123 456 789</span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-2" />
                  <span className="text-gray-400">contact@loguistud.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 LoguiStud. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EtudiantProfile;