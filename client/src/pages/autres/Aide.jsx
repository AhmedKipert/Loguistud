import React, { useState } from 'react';
import { 
  FaHome, 
  FaArrowLeft, 
  FaBars,
  FaUser,
  FaHome as FaHomeIcon,
  FaComments,
  FaEnvelope,
  FaPhone,
  FaCommentAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter
} from 'react-icons/fa';
import Navbar from './Navbar';

const CentreAide = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Comment vérifier mon compte ?",
      answer: (
        <>
          <p>Pour vérifier votre compte étudiant ou propriétaire :</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Connectez-vous à votre compte</li>
            <li>Allez dans les paramètres de votre profil</li>
            <li>Cliquez sur "Vérifier mon compte"</li>
            <li>Suivez les instructions pour fournir les documents nécessaires</li>
            <li>Notre équipe traitera votre demande sous 24-48h</li>
          </ol>
        </>
      )
    },
    {
      question: "Quels sont les frais pour utiliser LoguiStud ?",
      answer: (
        <>
          <p>LoguiStud est entièrement gratuit pour les étudiants. Pour les propriétaires :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Publication d'annonce : gratuite</li>
            <li>Mise en avant d'annonce : options payantes disponibles</li>
            <li>Nous ne prenons aucune commission sur les locations</li>
          </ul>
        </>
      )
    },
    {
      question: "Comment filtrer les annonces de logement ?",
      answer: (
        <>
          <p>Notre système de filtrage avancé vous permet de trouver le logement parfait :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Prix (min/max)</li>
            <li>Localisation (quartier, distance de votre université)</li>
            <li>Type de logement (chambre, studio, appartement)</li>
            <li>Équipements (internet, eau courante, électricité, etc.)</li>
            <li>Colocation possible</li>
          </ul>
        </>
      )
    },
    {
      question: "Comment signaler un problème ou une annonce suspecte ?",
      answer: (
        <>
          <p>La sécurité de notre communauté est notre priorité :</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Sur chaque annonce, cliquez sur les trois points en haut à droite</li>
            <li>Sélectionnez "Signaler cette annonce"</li>
            <li>Choisissez la raison du signalement</li>
            <li>Ajoutez des détails si nécessaire</li>
            <li>Notre équipe examinera rapidement le signalement</li>
          </ol>
          <p className="mt-2">Pour les urgences, contactez directement notre support.</p>
        </>
      )
    }
  ];

  const quickHelpItems = [
    {
      icon: <FaUser className="h-6 w-6 text-[#2C5CD5]" />,
      title: "Créer un compte",
      description: "Apprenez à créer un compte étudiant ou propriétaire en quelques étapes simples.",
      link: "#"
    },
    {
      icon: <FaHomeIcon className="h-6 w-6 text-[#3CB371]" />,
      title: "Publier une annonce",
      description: "Découvrez comment publier votre logement et attirer des étudiants.",
      link: "#"
    },
    {
      icon: <FaComments className="h-6 w-6 text-[#F6A34A]" />,
      title: "Utiliser le chat",
      description: "Apprenez à communiquer avec les propriétaires ou étudiants via notre messagerie.",
      link: "#"
    }
  ];

  const videoTutorials = [
    {
      title: "Premiers pas sur LoguiStud",
      description: "Découvrez comment naviguer sur la plateforme et configurer votre profil.",
      duration: "4 min 32 sec"
    },
    {
      title: "Publier une annonce efficace",
      description: "Apprenez à créer une annonce attractive qui attire les étudiants.",
      duration: "6 min 15 sec"
    },
    {
      title: "Messagerie et notifications",
      description: "Maîtrisez notre système de chat et de notifications pour ne rien manquer.",
      duration: "5 min 02 sec"
    }
  ];

  const contactMethods = [
    {
      icon: <FaEnvelope className="h-6 w-6" />,
      title: "Email",
      detail1: "support@loguistud.com",
      detail2: "Réponse sous 24h"
    },
    {
      icon: <FaPhone className="h-6 w-6" />,
      title: "Téléphone",
      detail1: "+224 123 456 789",
      detail2: "8h-20h, 7j/7"
    },
    {
      icon: <FaCommentAlt className="h-6 w-6" />,
      title: "Chat en direct",
      detail1: "Disponible sur l'application",
      detail2: "8h-22h, 7j/7"
    }
  ];

  return (
    <div className="bg-gray-50 font-sans">
      <Navbar/>
      {/* Header */}
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-6 py-3">
          <div className="mt-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Centre d'Aide LoguiStud</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Trouvez toutes les réponses à vos questions pour une expérience optimale sur notre plateforme
            </p>
            <div className="mt-8 max-w-2xl mx-auto relative">
              <input 
                type="text" 
                placeholder="Rechercher dans l'aide..." 
                className="w-full py-4 px-6 rounded-full shadow-soft focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-gray-800"
              />
              <button className="absolute right-2 top-2 bg-[#F6A34A] text-white py-2 px-6 rounded-full hover:bg-[#e8933a] transition">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Quick Help Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2C5CD5] mb-8">Aide Rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickHelpItems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-soft hover-scale">
                <div className={`w-12 h-12 ${index === 0 ? 'bg-[#2C5CD5]' : index === 1 ? 'bg-[#3CB371]' : 'bg-[#F6A34A]'} bg-opacity-10 rounded-full flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <a href={item.link} className="mt-4 inline-block text-[#3CB371] font-medium">Voir le guide →</a>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2C5CD5] mb-8">Foire Aux Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-soft">
                <button 
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 text-[#F6A34A] transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`mt-4 text-gray-600 ${activeFaq === index ? 'block' : 'hidden'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#2C5CD5] mb-8">Tutoriels Vidéo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTutorials.map((video, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-soft hover-scale">
                <div className="relative pb-[56.25%] bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-16 w-16 text-[#F6A34A]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <span className="text-sm text-[#3CB371]">Durée : {video.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="gradient-bg text-white rounded-2xl p-8 md:p-12 shadow-soft">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Besoin d'aide supplémentaire ?</h2>
            <p className="text-xl mb-8">Notre équipe support est là pour vous aider 7j/7.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="mb-2">{method.detail1}</p>
                  <p>{method.detail2}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaHome className="h-8 w-8 text-[#F6A34A]" />
                <span className="text-2xl font-bold">LoguiStud</span>
              </div>
              <p className="text-gray-400">La solution de logement étudiant solidaire en Guinée.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Accueil</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Rechercher un logement</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Publier une annonce</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Aide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Guide du locataire</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Guide du propriétaire</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Politique de confidentialité</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Mentions légales</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2025 LoguiStud. Tous droits réservés.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .gradient-bg {
          background: linear-gradient(135deg, #2C5CD5 0%, #3CB371 100%);
        }
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.03);
        }
        .shadow-soft {
          box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CentreAide;