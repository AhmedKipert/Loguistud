import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from '../../pages/autres/Navbar';
import Footer from '../../components/Footer';

export const VerificationFailed = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center animate-fade-in">
          <div className="mb-6 text-red-500">
            <FontAwesomeIcon icon={faTimesCircle} size="4x" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Échec de la vérification
          </h1>
          
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center text-red-800 mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <span className="font-medium">Lien invalide ou expiré</span>
            </div>
            <p className="text-gray-700">
              Le lien de vérification a expiré ou n'est pas valide.
            </p>
          </div>
          
          <div className="space-y-4 text-gray-600">
            <p>
              Ce lien de vérification a peut-être déjà été utilisé ou a expiré.
            </p>
            <p>
              Veuillez demander un nouveau lien ci-dessous.
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
            <button
              className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition w-full"
            >
              Renvoyer le lien de vérification
            </button>
            <Link 
              to={'/'}
              className="inline-block text-[#2C5CD5] hover:text-[#2351C0] font-medium transition"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};