import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faEnvelope,
  faEye,
  faEyeSlash,
  faHome,
  faUniversity,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../autres/Navbar';
import SmallFooter from '../../components/SmallFooter';
import { connexion } from '../../services/authService';
import AuthContext from '../../context/AuthContext';
import {Loading} from '../autres/Loading'

export const Connexion = () => {
  // États pour le formulaire
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [montrerMotdepasse, setMontrerMotdepasse] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);

  // Basculer la visibilité du mot de passe
  const voirMotdepasse = () => {
    setMontrerMotdepasse(!montrerMotdepasse);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await connexion({ email, motdepasse });
    setIsSubmitting(false);
    if (res.type === 'success') {
      await setUser(res.user);
      setMessage('');
      
      if(res.user.role === 'etudiant')
        navigate('/etudiant/dashboard');
      else
        navigate('/proprietaire/dashboard');
    } else {
      // alert(res.message)
      if(res.type === 'infos_error' || res.type === 'zod_error') {
        setMessage(res.message);
      } else {
        navigate('/500');
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Section Illustration (mobile) */}
        <div className="md:hidden h-48 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Étudiants guinéens"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Section Formulaire */}
        <div
          className="flex-1 flex items-center justify-center p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(44, 92, 213, 0.05) 0%, rgba(60, 179, 113, 0.05) 100%)'
          }}
        >
          <div className="w-full max-w-md">

            {/* Titre */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Connectez-vous</h1>
              <p className="text-gray-600">Accédez à votre espace étudiant ou propriétaire</p>
            </div>

            {/* Formulaire */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
            >
              {/* Champ Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2C5CD5] focus:ring-1 focus:ring-[#2C5CD5]"
                    placeholder="fkipertino@email.com"
                  // required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div className="mb-6">
                <label htmlFor="motdepasse" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="motdepasse"
                    type={montrerMotdepasse ? "text" : "password"}
                    value={motdepasse}
                    onChange={(e) => setMotdepasse(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#2C5CD5] focus:ring-1 focus:ring-[#2C5CD5]"
                    placeholder="••••••••"
                    required
                  // minLength="8"
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={voirMotdepasse}
                  >
                    <FontAwesomeIcon icon={montrerMotdepasse ? faEyeSlash : faEye} />
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <Link to="/forgot-password" className="text-xs text-[#2C5CD5] hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <p className='text-red-500 mt-3 text-center'>{message}</p>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-3 px-4 rounded-lg font-medium mb-4 transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(to right, #2C5CD5, #3CB371)'
                }}
              >
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
              </button>

              {/* Séparateur */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">OU</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Bouton Inscription */}
              <Link
                to="/choix-profile"
                className="block w-full bg-white border border-[#2C5CD5] text-[#2C5CD5] py-3 px-4 rounded-lg font-medium text-center hover:bg-[#2C5CD5]/10 transition duration-300"
              >
                Créer un compte
              </Link>
            </form>
          </div>
        </div>

        {/* Section Illustration (desktop) */}
        <div
          className="hidden md:flex md:w-1/2 items-center justify-center p-12"
          style={{
            background: 'linear-gradient(to bottom right, #2C5CD5, #3CB371)'
          }}
        >
          <div className="text-white text-center max-w-md">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Campus universitaire en Guinée"
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-8"
            />
            <h2 className="text-3xl font-bold mb-4">Bienvenue sur LoguiStud</h2>
            <p className="text-lg opacity-90 mb-6">
              La nouvelle plateforme pour le logement étudiant en Guinée
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <FontAwesomeIcon icon={faHome} className="text-2xl mb-2" />
                <p className="text-sm">500+ logements</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <FontAwesomeIcon icon={faUniversity} className="text-2xl mb-2" />
                <p className="text-sm">15 villes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <FontAwesomeIcon icon={faShieldAlt} className="text-2xl mb-2" />
                <p className="text-sm">100% sécurisé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <SmallFooter />
    </div>
  );
};
