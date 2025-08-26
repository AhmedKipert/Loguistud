import React, { useState } from 'react';
import { FaChevronDown, FaSearch, FaHeadset } from 'react-icons/fa';
import Navbar from './autres/Navbar';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqItems = [
    {
      question: "Comment créer un compte étudiant ?",
      answer: (
        <>
          <p>Pour créer un compte étudiant :</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Cliquez sur "S'inscrire"</li>
            <li>Sélectionnez "Je suis étudiant"</li>
            <li>Remplissez le formulaire avec vos informations</li>
            <li>Confirmez votre email</li>
            <li>Complétez votre profil universitaire</li>
          </ol>
        </>
      )
    },
    {
      question: "Comment publier une annonce de logement ?",
      answer: (
        <>
          <p>Les propriétaires peuvent publier des annonces :</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Connectez-vous à votre compte</li>
            <li>Allez dans "Mes annonces"</li>
            <li>Cliquez sur "Publier une nouvelle annonce"</li>
            <li>Remplissez les détails du logement</li>
            <li>Ajoutez des photos claires</li>
            <li>Publiez l'annonce</li>
          </ol>
        </>
      )
    },
    {
      question: "Comment contacter un propriétaire ?",
      answer: (
        <>
          <p>Pour contacter un propriétaire :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Trouvez un logement qui vous intéresse</li>
            <li>Cliquez sur "Contacter le propriétaire"</li>
            <li>Envoyez un message via notre messagerie sécurisée</li>
            <li>Vous recevrez les réponses dans votre espace message</li>
          </ul>
          <p className="mt-3 text-sm text-orange-400">⚠️ Ne communiquez pas vos coordonnées personnelles avant d'avoir visité le logement.</p>
        </>
      )
    },
    {
      question: "Comment signaler un problème ?",
      answer: (
        <>
          <p>Pour signaler un problème :</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Allez dans "Aide" puis "Signaler un problème"</li>
            <li>Décrivez le problème rencontré</li>
            <li>Joignez des captures d'écran si nécessaire</li>
            <li>Notre équipe vous contactera sous 24h</li>
          </ol>
        </>
      )
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Navbar/>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">FAQ LoguiStud</h1>
          <p className="text-lg">Trouvez rapidement les réponses à vos questions</p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-6 py-8 max-w-3xl">
        {/* Barre de recherche */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Rechercher dans les questions..."
            className="w-full py-3 px-5 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="h-5 w-5 absolute right-4 top-3.5 text-gray-400" />
        </div>

        {/* Liste des questions */}
        <div className="space-y-4">
          {filteredItems.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-blue-600">{item.question}</h3>
                <FaChevronDown 
                  className={`h-5 w-5 text-orange-400 transition-transform duration-200 ${
                    activeIndex === index ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              {activeIndex === index && (
                <div className="mt-3 text-gray-600 animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-green-500 mb-3">
            Vous ne trouvez pas votre réponse ?
          </h3>
          <button className="inline-flex items-center bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            <FaHeadset className="mr-2" />
            Contactez notre support
          </button>
        </div>
      </main>

      {/* Styles globaux */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;