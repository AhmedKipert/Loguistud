import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BanniereCookies = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAcceptAll = () => {
    // Logic to accept all cookies
    console.log('All cookies accepted');
    setIsVisible(false);
    // Typically you would set a cookie or localStorage item here
    localStorage.setItem('cookiesAccepted', 'all');
  };

  const handleCustomize = () => {
    // Logic to open cookie preferences modal
    console.log('Open cookie preferences');
    // You would typically set state to show a modal here
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#F0F0F0] shadow-lg z-50">
      <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Texte explicatif */}
        <div className="flex-1 text-[#2C5CD5]">
          <p className="text-sm md:text-base">
            🍪 LoguiStud utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre 
            <a 
              href="/politique-cookies" 
              className="font-semibold underline hover:text-[#3CB371] ml-1"
            >
              Politique de Cookies
            </a>.
          </p>
        </div>
        
        {/* Boutons d'action */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleAcceptAll}
            className="px-4 py-2 bg-[#3CB371] text-white rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base"
          >
            Tout accepter
          </button>
          <Link
            to={'/preferences-cookies'}
            className="px-4 py-2 bg-[#F0F0F0] border border-[#2C5CD5] text-[#2C5CD5] rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base"
          >
            Personnaliser
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BanniereCookies;