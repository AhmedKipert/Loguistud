import React, { useEffect, useRef } from 'react';
import { FaHome, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const cloudsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Animation de la porte
    const door = document.querySelector('.door');
    const house = document.querySelector('.house');
    
    const handleDoorClick = () => {
      if (door && house) {
        door.style.transform = 'rotate(-45deg)';
        door.style.transformOrigin = 'bottom';
        house.querySelector('rect').style.fill = '#3CB371';
        
        setTimeout(() => {
          door.style.transform = '';
          house.querySelector('rect').style.fill = '#2C5CD5';
        }, 1000);
      }
    };

    if (door) {
      door.addEventListener('click', handleDoorClick);
    }

    // Création de nuages dynamiques
    const createCloud = () => {
      const cloud = document.createElement('div');
      cloud.className = 'cloud absolute opacity-80 z-0';
      
      const top = Math.random() * 30 + 5;
      const duration = Math.random() * 40 + 40;
      const delay = Math.random() * -40;
      const size = Math.random() * 100 + 80;
      
      cloud.style.top = `${top}%`;
      cloud.style.animationDuration = `${duration}s`;
      cloud.style.animationDelay = `${delay}s`;
      
      const cloudSVG = Math.random() > 0.5 ? 
        `<svg width="${size}" height="${size/2}" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M30 40C13.431 40 0 26.569 0 10C0 4.477 4.477 0 10 0C10 0 20 5 30 5C40 5 50 0 50 0C55.523 0 60 4.477 60 10C60 26.569 46.569 40 30 40Z" fill="white"/>
        </svg>` :
        `<svg width="${size}" height="${size/2.5}" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M60 60C26.863 60 0 33.137 0 0C0 0 30 10 60 10C90 10 120 0 120 0C120 33.137 93.137 60 60 60Z" fill="white"/>
        </svg>`;
      
      cloud.innerHTML = cloudSVG;
      document.body.appendChild(cloud);
      cloudsRef.current.push(cloud);
    };

    // Créer 3 nuages initiaux
    for (let i = 0; i < 3; i++) {
      createCloud();
    }

    return () => {
      // Nettoyage des nuages et event listeners
      if (door) {
        door.removeEventListener('click', handleDoorClick);
      }
      
      cloudsRef.current.forEach(cloud => {
        if (cloud && cloud.parentNode) {
          cloud.parentNode.removeChild(cloud);
        }
      });
      cloudsRef.current = [];
    };
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/accueil');
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate('/contact');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 overflow-x-hidden font-['Poppins'] relative">
      {/* Styles globaux pour les animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .house-container {
          position: relative;
          height: 220px;
          margin-bottom: 2.5rem;
        }
        
        .house {
          position: relative;
          animation: bounce 2s infinite alternate;
        }
        
        .roof {
          position: absolute;
          top: -2.5rem;
          left: 50%;
          transform: translateX(-50%);
          animation: shake 3s infinite;
          z-index: 10;
        }
        
        .window {
          animation: glow 4s infinite;
        }
        
        .door {
          transform-origin: bottom;
          animation: knock 5s infinite;
        }
        
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(-50%) rotate(0deg); }
          25% { transform: translateX(-50%) rotate(-2deg); }
          75% { transform: translateX(-50%) rotate(2deg); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; box-shadow: 0 0 15px #F6A34A; }
        }
        
        @keyframes knock {
          0%, 95%, 100% { transform: rotate(0deg); }
          97% { transform: rotate(-5deg); }
          98% { transform: rotate(5deg); }
        }
        
        .cloud {
          animation: moveCloud linear infinite;
          z-index: 0;
        }
        
        @keyframes moveCloud {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
      `}</style>

      {/* Nuages fixes */}
      <div className="cloud absolute top-[15%] opacity-80 z-0" style={{ animationDuration: '40s' }}>
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M30 40C13.431 40 0 26.569 0 10C0 4.477 4.477 0 10 0C10 0 20 5 30 5C40 5 50 0 50 0C55.523 0 60 4.477 60 10C60 26.569 46.569 40 30 40Z" fill="white"/>
        </svg>
      </div>
      
      <div className="cloud absolute top-[25%] opacity-80 z-0" style={{ animationDuration: '60s', animationDelay: '-20s' }}>
        <svg width="180" height="80" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M60 60C26.863 60 0 33.137 0 0C0 0 30 10 60 10C90 10 120 0 120 0C120 33.137 93.137 60 60 60Z" fill="white"/>
        </svg>
      </div>
      
      {/* Contenu principal */}
      <div className="text-center relative z-10 max-w-2xl">
        <div className="house-container">
          <div className="house inline-block relative">
            {/* Toit - positionné correctement */}
            <div className="roof">
              <svg width="180" height="80" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M90 0L180 80H0L90 0Z" fill="#F6A34A"/>
              </svg>
            </div>
            
            {/* Corps de la maison avec 404 bien visible */}
            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="160" rx="10" fill="#2C5CD5"/>
              
              {/* Fenêtres */}
              <rect x="30" y="40" width="40" height="40" rx="5" fill="#F0F0F0" className="window"/>
              <rect x="130" y="40" width="40" height="40" rx="5" fill="#F0F0F0" className="window"/>
              
              {/* Porte */}
              <rect x="80" y="80" width="40" height="80" rx="5" fill="#3CB371" className="door" style={{ transformOrigin: 'bottom' }}/>
              
              {/* Poignée de porte */}
              <circle cx="110" cy="130" r="3" fill="#F6A34A"/>
              
              {/* Numéro 404 - amélioré */}
              <text x="100" y="50" fontFamily="Arial" fontSize="48" fontWeight="bold" fill="white" textAnchor="middle">404</text>
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Oups ! Page introuvable</h1>
        <p className="text-xl text-gray-600 mb-8">La page que vous cherchez semble avoir été déplacée ou n'existe pas. Peut-être que cette maison peut vous héberger ?</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleHomeClick}
            className="px-8 py-3 rounded-full text-white font-bold bg-[#2C5CD5] hover:bg-[#2351C0] transition-all duration-300 hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-lg active:translate-y-0"
          >
            <FaHome className="inline mr-2" /> Retour à l'accueil
          </button>
          <button
            onClick={handleContactClick}
            className="px-8 py-3 rounded-full font-bold text-[#2C5CD5] border-2 border-[#2C5CD5] hover:bg-[#2C5CD5] hover:text-white transition-colors duration-300"
          >
            <FaEnvelope className="inline mr-2" /> Nous contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;