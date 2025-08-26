import React, { useState } from 'react';
import { FaEnvelope, FaPaperPlane, FaArrowLeft, FaCheckCircle, FaLock, FaShieldAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Afficher le message de confirmation
    setShowConfirmation(true);
    
    // Ici, ajouter la logique réelle d'envoi d'email
    console.log('Envoi des instructions à:', email);
    navigate('/reset-password-instructions');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Section Formulaire */}
        <div className="flex-1 flex items-center justify-center p-6 auth-container">
          <div className="w-full max-w-md">
            {/* Titre */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Mot de passe oublié</h1>
              <p className="text-gray-600">Entrez votre email pour recevoir les instructions de réinitialisation</p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              {/* Champ Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email ou numéro mobile
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    className="w-full input-field px-4 py-3 rounded-lg border border-gray-300 focus:outline-none"
                    placeholder="exemple@email.com ou 622 123 456"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </div>
                </div>
              </div>

              {/* Bouton de soumission */}
              <button
                type="submit"
                className="w-full btn-primary text-white py-3 px-4 rounded-lg font-medium mb-4"
              >
                <FaPaperPlane className="inline mr-2" /> Envoyer les instructions
              </button>

              {/* Lien de retour */}
              <div className="text-center mt-4">
                <Link to="/connexion" className="text-sm text-[#2C5CD5] hover:underline">
                  <FaArrowLeft className="inline mr-1" /> Retour à la connexion
                </Link>
              </div>
            </form>

            {/* Message confirmation */}
            {showConfirmation && (
              <div id="confirmation-message" className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-800">
                  <FaCheckCircle className="mr-2" />
                  <p>Un email avec les instructions a été envoyé à votre adresse.</p>
                </div>
                <p className="text-sm mt-2 text-green-700">
                  Si vous ne recevez pas l'email, vérifiez votre dossier spam ou{' '}
                  <a href="#" className="font-medium">
                    renvoyez les instructions
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#2C5CD5] to-[#3CB371] items-center justify-center p-12">
          <div className="text-white text-center max-w-md">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Sécurité mot de passe"
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-8"
            />
            <h2 className="text-3xl font-bold mb-4">Sécurité du compte</h2>
            <p className="text-lg opacity-90 mb-6">
              Nous protégeons vos informations personnelles avec les meilleures pratiques de sécurité.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <FaLock className="text-2xl mb-2 mx-auto" />
                <p className="text-sm">Cryptage SSL</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <FaShieldAlt className="text-2xl mb-2 mx-auto" />
                <p className="text-sm">Protection des données</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles globaux */}
      <style jsx global>{`
        .auth-container {
          background: linear-gradient(
            135deg,
            rgba(44, 92, 213, 0.05) 0%,
            rgba(60, 179, 113, 0.05) 100%
          );
        }
        .btn-primary {
          background: linear-gradient(to right, #2c5cd5, #3cb371);
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        .input-field:focus {
          border-color: #2c5cd5;
          box-shadow: 0 0 0 3px rgba(44, 92, 213, 0.1);
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;