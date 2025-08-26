import { useEffect } from 'react';
import { FaEnvelope, FaServer } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const ServerErrorPage = () => {

  useEffect(() => {
    // Animation de la barre de progression
    document.querySelector('.progress-bar').style.width = '100%';

    // Effet de clignotement pour l'icône serveur
    const interval = setInterval(() => {
      const serverIcon = document.querySelector('.server-icon');
      if (serverIcon) {
        serverIcon.classList.toggle('text-blue-500');
        serverIcon.classList.toggle('text-blue-700');
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);



  return (
    <div>
      <Navbar/>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 font-['Poppins'] relative">

        <style jsx global>{`        
        .server-container {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .progress-bar {
          transition: width 3s ease-out;
        }
      `}</style>

        <div className="text-center max-w-2xl relative z-10">
          {/* Icône serveur avec animation */}
          <div className="server-container mb-8">
            <FaServer className="server-icon text-blue-500 text-8xl mx-auto" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Erreur interne</h1>
          <p className="text-xl text-gray-600 mb-6">
            Une erreur interne est survenue, veuillez réessayez plus tard.
          </p>

          {/* Barre de progression de reconnexion */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-8 overflow-hidden">
            <div
              className="progress-bar h-full bg-blue-500 rounded-full"
              style={{ width: '0%' }}
            ></div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={'/contact'}
              className="px-8 py-3 rounded-full font-bold text-gray-700 border-2 border-gray-700 hover:bg-blue-700 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <FaEnvelope /> Support
            </Link>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-left">
            <p className="text-blue-700">
              <strong>Conseil :</strong> Vérifiez votre connexion internet. Si le problème persiste, notre équipe technique est déjà au courant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorPage;