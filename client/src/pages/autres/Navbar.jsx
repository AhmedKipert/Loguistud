import { useContext } from 'react';
import { useState } from 'react';

import {
  FaPhone, FaEnvelope, FaQuestionCircle,
  FaComments, FaGlobe, FaSearch,
  FaHome, FaLightbulb, FaInfoCircle,
  FaPlus, FaChevronDown, FaBell,
  FaUserCircle, FaSignOutAlt
} from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { deconnexion } from '../../services/authService';


const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeconnexion = async () => {
    const res = await deconnexion();
    if (res.success) {
      setUser(null);
      return navigate('/');
    }
    else {
      return navigate('/500');
    }
  }

  return (
    <>
      {/* Barre supérieure */}
      <div className="bg-primary-gradient text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="tel:+22412345678" className="flex items-center hover:text-amber-400 transition">
              <FaPhone className="mr-2 text-amber-400" />
              +224 622 40 26 38
            </a>
            <a href="mailto:contact@loguistud.com" className="flex items-center hover:text-amber-400 transition">
              <FaEnvelope className="mr-2 text-amber-400" />
              fkipertino@gmail.com
            </a>
          </div>
          <div className="flex space-x-4">
            <div className="flex space-x-4">
              <Link to="/aide" className="hover:text-[#F6A34A] transition-colors duration-200 flex items-center">
                <FaQuestionCircle className="mr-1" />
                Aide
              </Link>
              <span className="text-white/30">|</span>
              <Link to="/faq" className="hover:text-[#F6A34A] transition-colors duration-200 flex items-center">
                <FaComments className="mr-1" />
                FAQ
              </Link>
            </div>
          </div>
        </div>
        <div className="h-1 bg-white/10"></div>
      </div>

      {/* Navigation principale */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-lg transition">
                LS
              </div>
              <span className="text-2xl font-bold text-gray-800">
                Logui<span className="text-blue-700">Stud</span>
              </span>
            </Link>

            {/* Liens principaux */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                Accueil
              </Link>
              <Link to="/annonces" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                Annonces
              </Link>
              <Link to="/espace-etudiants" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                Espace étudiants
              </Link>
              <Link to="/conseils" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                Conseils
              </Link>
              <Link to="/about" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                À propos
              </Link>
              <div className='flex'>
                <Link to="/connexion" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                  Connexion
                </Link>
                <span className='mx-1'>/</span>
                <Link to="/choix-profile" className="nav-link text-gray-700 hover:text-blue-600 font-medium">
                  Inscription
                </Link>
              </div>

              {/* Bouton publication */}
              {user?.role === "proprietaire" && <Link to="/annonces/creer" className="ml-4 px-3 py-1.5 bg-secondary-gradient text-white rounded-full hover:shadow-md transition flex items-center font-medium">
                <FaPlus className="mr-2" />
                Publier
              </Link>}
            </div>

            {/* Menu utilisateur */}
            {user && <div className="hidden lg:flex items-center space-x-6">
              <div className="relative group">
                <button
                  className="flex items-center space-x-2 cursor-pointer focus:outline-none"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-medium shadow">
                    {user.compte.prenom.charAt(0).toUpperCase() + user.compte.nom.charAt(0).toUpperCase()}
                  </div>
                  <FaChevronDown className={`text-gray-500 text-xs transition-transform ${isUserDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.compte.prenom + ' ' + user.compte.nom}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to={user.role === 'proprietaire' ? '/proprietaire/dashboard' : '/etudiant/dashboard'} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                      <FaUserCircle className="inline mr-2 text-blue-600" />
                      Mon profil
                    </Link>
                    {user.role === 'proprietaire' && <Link to="/proprietaire/dashboard/annonces" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition">
                      <FaHome className="inline mr-2 text-green-500" />
                      Mes annonces
                    </Link>}
                    <div className="border-t border-gray-200 my-1"></div>
                    <button onClick={() => handleDeconnexion()} className=" w-full text-start block px-4 py-3 text-gray-700 hover:bg-gray-100 transition">
                      <FaSignOutAlt className="inline mr-2 text-gray-500" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button className="p-2 text-gray-500 cursor-pointer hover:text-blue-600 relative transition">
                  <FaBell className="text-xl" />
                  <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </button>
              </div>
            </div>}

            {/* Menu mobile - Bouton */}
            <button
              className="lg:hidden focus:outline-none p-2 rounded-full hover:bg-gray-100 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menu mobile - Contenu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white py-4 px-4 shadow-md rounded-b-lg">
              <div className="flex flex-col space-y-4">
                <Link to={'/'} className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded hover:bg-gray-50">
                  Accueil
                </Link>
                <Link to="/annonces" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded hover:bg-gray-50">
                  Annonces
                </Link>
                <Link to="/conseils" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded hover:bg-gray-50">
                  Conseils
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded hover:bg-gray-50">
                  À propos
                </Link>
                <div>
                  <Link to="/connexion" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded hover:bg-gray-50">
                    Connexion
                  </Link>
                  /
                  <Link to="/choix-profile" className="text-gray-700 hover:text-blue-600 font-medium py-2 px-3 rounded hover:bg-gray-50">
                    Inscription
                  </Link>
                </div>

                {user?.role === 'proprietaire' && <Link to="/annonce/creer" className="mt-2 px-5 py-2.5 bg-secondary-gradient text-white rounded-full hover:shadow-md transition flex items-center justify-center font-medium">
                  <FaPlus className="mr-2" />
                  Publier une annonce
                </Link>}
              </div>

              {user && <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-medium shadow">
                    {user.compte.prenom.charAt(0).toUpperCase() + user.compte.nom.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.compte.prenom + ' ' + user.compte.nom}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Link to={user.role === 'proprietaire' ? '/proprietaire/dashboard' : '/etudiant/dashboard'} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                    <FaUserCircle className="inline mr-2 text-blue-600" />
                    Mon profil
                  </Link>
                  {user?.role === 'proprietaire' && <a href="/mes-annonces" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                    <FaHome className="inline mr-2 text-green-500" />
                    Mes annonces
                  </a>}
                  <button onClick={() => handleDeconnexion()} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition">
                    <FaSignOutAlt className="inline mr-2 text-gray-500" />
                    Déconnexion
                  </button>
                </div>
              </div>}
            </div>
          )}
        </div>
      </nav>

      {/* Styles */}
      <style>{`
        .bg-primary-gradient { 
          background: linear-gradient(135deg, #2C5CD5 0%, #3A66E0 100%); 
        }
        .bg-secondary-gradient { 
          background: linear-gradient(to right, #3CB371 0%, #4DC381 100%); 
        }
        .bg-accent-hover { 
          background: linear-gradient(to bottom, #F6A34A 0%, #F8B05C 100%); 
        }
        
        .nav-link::after {
          content: '';
          display: block;
          width: 0;
          height: 3px;
          background: linear-gradient(to right, #F6A34A, #3CB371);
          transition: width 0.3s;
          margin-top: 2px;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Navbar;