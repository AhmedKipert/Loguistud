import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelopeOpenText, 
  faInfoCircle, 
  faRedo, 
  faArrowLeft, 
  faCheckCircle,
  faCircleNotch
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ResetPasswordInstructions = () => {
  const [tempsRestant, setTempsRestant] = useState(15 * 60); // 15 minutes en secondes
  const [emailEnvoye, setEmailEnvoye] = useState(false);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [emailUtilisateur] = useState('user@example.com');

  useEffect(() => {
    const timer = setInterval(() => {
      setTempsRestant(prevTemps => {
        if (prevTemps <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTemps - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formaterTemps = (secondes) => {
    const minutes = Math.floor(secondes / 60);
    const secs = secondes % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renvoyerEmail = async () => {
    setEnvoiEnCours(true);
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEmailEnvoye(true);
      setTempsRestant(15 * 60); // Réinitialiser le timer
      
      setTimeout(() => {
        setEmailEnvoye(false);
      }, 5000);
    } catch (erreur) {
      console.error("Erreur:", erreur);
      alert("Service temporairement indisponible");
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-md w-full mx-auto p-6">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] flex items-center justify-center text-white text-xl font-bold mr-3">
              LS
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Logui<span className="text-[#2C5CD5]">Stud</span>
            </span>
          </div>
        </div>

        {/* Carte principale */}
        <div className="bg-white rounded-xl shadow-sm p-8 border-l-4 border-[#2C5CD5]">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faEnvelopeOpenText} className="text-green-600 text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Consultez votre email</h1>
            <p className="text-gray-600">
              Nous avons envoyé les instructions à <span className="font-medium">{emailUtilisateur}</span>
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-800 flex items-center mb-2">
              <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Procédez comme suit :
            </h3>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 pl-2">
              <li>Ouvrez l'email envoyé par LoguiStud</li>
              <li>Cliquez sur le lien de réinitialisation</li>
              <li>Créez un nouveau mot de passe sécurisé</li>
              <li>Connectez-vous avec vos nouveaux identifiants</li>
            </ol>
          </div>

          {/* Compte à rebours */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Lien valable pendant : <span className="font-mono font-medium">{formaterTemps(tempsRestant)}</span>
            </p>
          </div>

          {/* Problèmes ? */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Vous n'avez pas reçu l'email ?</p>
            <button
              onClick={renvoyerEmail}
              disabled={envoiEnCours}
              className="text-sm text-[#2C5CD5] font-medium hover:underline focus:outline-none"
            >
              {envoiEnCours ? (
                <>
                  <FontAwesomeIcon icon={faCircleNotch} spin className="mr-1" /> Envoi en cours...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faRedo} className="mr-1" /> Renvoyer les instructions
                </>
              )}
            </button>
            {emailEnvoye && (
              <p className="text-green-600 text-xs mt-2">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Email renvoyé avec succès
              </p>
            )}
            <p className="text-xs text-gray-500 mt-4">
              Vérifiez votre dossier spam ou{' '}
              <a href="mailto:support@loguistud.com" className="text-[#2C5CD5]">
                contactez le support
              </a>
            </p>
          </div>
        </div>

        {/* Retour à la connexion */}
        <div className="text-center mt-6">
          <Link to="/connexion" className="text-sm text-[#2C5CD5] hover:underline">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Retour à la page de connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordInstructions;