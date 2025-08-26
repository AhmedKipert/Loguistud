import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../pages/autres/Navbar';
import Footer from '../Footer';

export const ConfirmationEmail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar/>
    <main className="flex-grow flex items-center justify-center py-10">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center animate-fade-in">
        <div className="mb-6 text-[#3CB371]">
          <FontAwesomeIcon icon={faCheckCircle} size="4x" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Inscription reussie !
        </h1>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-center text-blue-800 mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <span className="font-medium">Email de confirmation envoye</span>
          </div>
          <p className="text-gray-700">
            Nous avons envoye un email de confirmation a l'adresse que vous avez fournie.
          </p>
        </div>
        
        <div className="space-y-4 text-gray-600">
          <p>
            Veuillez verifier votre boite mail et cliquer sur le lien de confirmation pour activer votre compte.
          </p>
          <p>
            Si vous ne recevez pas l'email dans les 5 minutes, verifiez votre dossier spam.
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link 
            to={'/connexion'}
            className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Se connecter
          </Link>
        </div>
      </div>
      {/* Footer */}
    </main>
      <Footer/>
    </div>
  );
};
