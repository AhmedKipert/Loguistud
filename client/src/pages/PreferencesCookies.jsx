import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PreferencesCookies = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    analytics: true,
    personalization: true,
    marketing: false
  });

  const handleToggle = (cookieType) => {
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  const handleRejectAll = () => {
    setCookiePreferences({
      analytics: false,
      personalization: false,
      marketing: false
    });
  };

  const handleSave = () => {
    // Here you would typically send the preferences to your backend
    console.log('Preferences saved:', cookiePreferences);
    alert('Vos préférences ont été enregistrées !');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      {/* En-tête */}
      <div className="border-b border-[#F0F0F0] pb-4 mb-6">
        <h1 className="text-2xl font-bold text-[#2C5CD5]">Gestion des préférences cookies</h1>
        <p className="text-gray-600 mt-2">Contrôlez les données collectées pour améliorer LoguiStud.</p>
      </div>
    
      {/* Bloc de catégories */}
      <div className="space-y-6">
        {/* Cookies Essentiels (désactivés) */}
        <div className="flex items-start justify-between p-4 bg-[#F0F0F0]/50 rounded-lg">
          <div className="flex-1 mr-4">
            <h3 className="font-semibold text-[#2C5CD5]">Cookies essentiels</h3>
            <p className="text-sm text-gray-600 mt-1">Authentification, sécurité et fonctionnalité de base. <span className="text-[#3CB371]">(Toujours activés)</span></p>
          </div>
          <div className="flex items-center">
            <input type="checkbox" checked disabled className="h-5 w-5 text-[#3CB371] cursor-not-allowed" />
          </div>
        </div>
    
        {/* Cookies Analytics */}
        <div className="flex items-start justify-between p-4 border border-[#F0F0F0] rounded-lg hover:bg-blue-50/50">
          <div className="flex-1 mr-4">
            <h3 className="font-semibold text-[#2C5CD5]">Analytics</h3>
            <p className="text-sm text-gray-600 mt-1">Mesure d'audience (Google Analytics) pour optimiser la plateforme.</p>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={cookiePreferences.analytics} 
              onChange={() => handleToggle('analytics')}
              className="h-5 w-5 text-[#3CB371] cursor-pointer" 
            />
          </div>
        </div>
    
        {/* Cookies de Personnalisation */}
        <div className="flex items-start justify-between p-4 border border-[#F0F0F0] rounded-lg hover:bg-blue-50/50">
          <div className="flex-1 mr-4">
            <h3 className="font-semibold text-[#2C5CD5]">Personnalisation</h3>
            <p className="text-sm text-gray-600 mt-1">Mémorisation de vos filtres de recherche et préférences d'affichage.</p>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={cookiePreferences.personalization} 
              onChange={() => handleToggle('personalization')}
              className="h-5 w-5 text-[#3CB371] cursor-pointer" 
            />
          </div>
        </div>
    
        {/* Cookies Marketing */}
        <div className="flex items-start justify-between p-4 border border-[#F0F0F0] rounded-lg hover:bg-blue-50/50">
          <div className="flex-1 mr-4">
            <h3 className="font-semibold text-[#2C5CD5]">Marketing</h3>
            <p className="text-sm text-gray-600 mt-1">Publicités ciblées (désactivé par défaut pour respecter la RGPD).</p>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={cookiePreferences.marketing} 
              onChange={() => handleToggle('marketing')}
              className="h-5 w-5 text-[#3CB371] cursor-pointer" 
            />
          </div>
        </div>
      </div>
    
      {/* Boutons de validation */}
      <div className="flex flex-wrap gap-3 justify-end mt-8 pt-4 border-t border-[#F0F0F0]">
        <button 
          onClick={handleRejectAll}
          className="px-4 py-2 bg-[#F0F0F0] text-[#2C5CD5] rounded-lg hover:bg-gray-200 transition-colors"
        >
          Tout refuser
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-[#3CB371] text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Enregistrer mes choix
        </button>
      </div>
    
      {/* Lien politique */}
      <p className="text-xs text-gray-400 mt-8 text-center">
        Consultez notre <Link to="/politiques-cookies" className="text-[#2C5CD5] hover:underline">Politique de Cookies</Link  > pour plus de détails.
      </p>
    </div>
  );
};

export default PreferencesCookies;