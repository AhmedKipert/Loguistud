import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserGraduate, 
  faHome, 
  faCheck 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import SmallFooter from '../../components/SmallFooter';

const ChoixProfil = () => {
  const [selectedCard, setSelectedCard] = useState('student');

  const handleCardClick = (profil) => {
    setSelectedCard(profil);
    // Simulation de la redirection après sélection
    setTimeout(() => {
      if (profil === 'student') {
        console.log('Redirection vers /register/student');
        // window.location.href = '/register/student';
      } else {
        console.log('Redirection vers /register/owner');
        // window.location.href = '/register/owner';
      }
    }, 300);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <Navbar/>

      {/* Contenu principal */}
      <main className="flex-grow flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Créez votre compte</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Sélectionnez votre profil pour commencer l'inscription</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Carte Étudiant */}
            <div 
              id="student-card" 
              className={`account-card student-bg rounded-xl p-8 cursor-pointer ${selectedCard === 'student' ? 'selected' : ''}`}
              onClick={() => handleCardClick('student')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#2C5CD5] rounded-full flex items-center justify-center text-white mb-6">
                  <FontAwesomeIcon icon={faUserGraduate} className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Je suis Étudiant</h3>
                <p className="text-gray-600 mb-6">
                  Recherchez un logement ou une colocation près de votre université
                </p>
                <ul className="text-left text-gray-600 space-y-2 mb-8">
                  <li className="flex items-start">
                    <FontAwesomeIcon icon={faCheck} className="text-[#2C5CD5] mr-2 mt-1" />
                    <span>Trouvez des logements vérifiés</span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon icon={faCheck} className="text-[#2C5CD5] mr-2 mt-1" />
                    <span>Contactez directement les propriétaires</span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon icon={faCheck} className="text-[#2C5CD5] mr-2 mt-1" />
                    <span>Gérez vos favoris et recherches</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link to={"/etudiant/inscription"} className="inline-block px-6 py-3 bg-[#2C5CD5] text-white rounded-lg font-medium">
                    Choisir ce profil
                  </Link>
                </div>
              </div>
            </div>

            {/* Carte Propriétaire */}
            <div 
              id="owner-card" 
              className={`account-card owner-bg rounded-xl p-8 cursor-pointer ${selectedCard === 'owner' ? 'selected' : ''}`}
              onClick={() => handleCardClick('owner')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#3CB371] rounded-full flex items-center justify-center text-white mb-6">
                  <FontAwesomeIcon icon={faHome} className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Je suis Propriétaire</h3>
                <p className="text-gray-600 mb-6">
                  Publiez et gérez vos annonces de logement pour étudiants
                </p>
                <ul className="text-left text-gray-600 space-y-2 mb-8">
                  <li className="flex items-start">
                    <FontAwesomeIcon icon={faCheck} className="text-[#3CB371] mr-2 mt-1" />
                    <span>Publiez vos annonces gratuitement</span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon icon={faCheck} className="text-[#3CB371] mr-2 mt-1" />
                    <span>Gérez vos biens et locations</span>
                  </li>
                  <li className="flex items-start">
                    <FontAwesomeIcon icon={faCheck} className="text-[#3CB371] mr-2 mt-1" />
                    <span>Contactez des étudiants sérieux</span>
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link to="/proprietaire/inscription" className="inline-block px-6 py-3 bg-[#3CB371] text-white rounded-lg font-medium">
                    Choisir ce profil
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">Vous avez déjà un compte ? 
              <Link to="/connexion" className="text-[#2C5CD5] font-medium hover:underline"> Connectez-vous</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SmallFooter/>

      {/* Styles */}
      <style jsx>{`
        .account-card {
          transition: all 0.3s ease;
          border: 3px solid transparent;
        }
        .account-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .account-card.selected {
          border-color: #2C5CD5;
          background-color: #f8fafc;
        }
        .student-bg {
          background: linear-gradient(135deg, rgba(44, 92, 213, 0.05) 0%, rgba(44, 92, 213, 0.15) 100%);
        }
        .owner-bg {
          background: linear-gradient(135deg, rgba(60, 179, 113, 0.05) 0%, rgba(60, 179, 113, 0.15) 100%);
        }
      `}</style>
    </div>
  );
};

export default ChoixProfil;