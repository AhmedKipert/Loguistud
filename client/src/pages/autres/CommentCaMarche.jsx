import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faSearch,
  faComments,
  faHome,
  faUserTie,
  faEdit,
  faUsers,
  faLightbulb,
  faShieldAlt,
  faChartLine,
  faChevronDown,
  faArrowRight,
  faHome as faHomeSolid
} from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const CommentCaMarche = () => {
  const [faqOuvert, setFaqOuvert] = useState({});

  const basculerFaq = (index) => {
    setFaqOuvert(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const etapesEtudiants = [
    {
      icone: faUserPlus,
      couleur: '#2C5CD5',
      titre: '1. Créez votre compte',
      description: 'Inscrivez-vous gratuitement en tant qu\'étudiant avec votre email universitaire'
    },
    {
      icone: faSearch,
      couleur: '#3CB371',
      titre: '2. Recherchez des annonces',
      description: 'Filtrez par localisation, prix et critères importants pour vous'
    },
    {
      icone: faComments,
      couleur: '#F6A34A',
      titre: '3. Contactez le propriétaire',
      description: 'Envoyez un message directement via notre messagerie sécurisée'
    },
    {
      icone: faHome,
      couleur: '#2C5CD5',
      titre: '4. Visitez et emménagez',
      description: 'Organisez une visite et signez votre contrat en toute confiance'
    }
  ];

  const etapesProprietaires = [
    {
      icone: faUserTie,
      couleur: '#2C5CD5',
      titre: '1. Inscription rapide',
      description: 'Créez votre compte propriétaire en 2 minutes'
    },
    {
      icone: faEdit,
      couleur: '#3CB371',
      titre: '2. Publiez votre annonce',
      description: 'Remplissez les détails de votre logement et ajoutez des photos'
    },
    {
      icone: faUsers,
      couleur: '#F6A34A',
      titre: '3. Gérez les demandes',
      description: 'Recevez et traitez les demandes via votre tableau de bord'
    }
  ];

  const faqs = [
    {
      question: 'Est-ce que LoguiStud est vraiment gratuit ?',
      reponse: 'Oui, l\'inscription et l\'utilisation de la plateforme sont totalement gratuites pour les étudiants. Les propriétaires peuvent publier jusqu\'à 3 annonces gratuitement, avec des options premium disponibles pour ceux qui ont plus de propriétés.'
    },
    {
      question: 'Comment sont vérifiés les utilisateurs ?',
      reponse: 'Les étudiants doivent valider leur email universitaire (.edu ou équivalent). Les propriétaires doivent fournir un justificatif de propriété ou un mandat de gestion. Nous vérifions manuellement ces documents pour assurer la sécurité de tous.'
    },
    {
      question: 'Puis-je visiter le logement avant de m\'engager ?',
      reponse: 'Absolument ! Nous encourageons même les visites avant toute signature de contrat. Notre messagerie interne vous permet d\'organiser facilement un rendez-vous avec le propriétaire ou le gestionnaire.'
    },
    {
      question: 'Que faire en cas de problème avec un locataire/propriétaire ?',
      reponse: 'Notre équipe est là pour vous aider. Vous pouvez signaler tout problème via notre centre d\'aide. Dans les cas graves, nous pouvons suspendre temporairement un compte le temps de régler le différend.'
    }
  ];

  return (
    <div className="bg-gray-50">
      <Navbar/>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Comment fonctionne LoguiStud ?</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Découvrez en quelques étapes simples comment trouver ou proposer un logement étudiant en Guinée
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#etudiant" 
              className="px-6 py-3 bg-white text-[#2C5CD5] rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Je cherche un logement
            </a>
            <a 
              href="#proprietaire" 
              className="px-6 py-3 bg-[#F6A34A] text-white rounded-full font-medium hover:bg-[#e67e22] transition-all shadow-lg hover:shadow-xl"
            >
              Je propose un logement
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/10 backdrop-blur-sm"></div>
      </section>

      {/* Section Étudiants */}
      <section id="etudiant" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#2C5CD5]/10 text-[#2C5CD5] rounded-full font-medium mb-4">
              Pour les étudiants
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trouvez votre logement idéal en 4 étapes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">LoguiStud simplifie votre recherche de logement étudiant en Guinée</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {etapesEtudiants.map((etape, index) => (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div 
                  className="w-16 h-16 bg-[${etape.couleur}]/10 text-[${etape.couleur}] rounded-full flex items-center justify-center mb-4 mx-auto transition-all group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: `${etape.couleur}10`, color: etape.couleur }}
                >
                  <FontAwesomeIcon icon={etape.icone} className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">{etape.titre}</h3>
                <p className="text-gray-600 text-center">{etape.description}</p>
              </div>
            ))}
          </div>

          <div 
            className="p-6 rounded-lg mb-12 bg-gradient-to-r from-[#2C5CD5]/10 to-[#3CB371]/10 border-l-4 border-[#2C5CD5]"
          >
            <h3 className="text-xl font-semibold mb-3 text-[#2C5CD5] flex items-center">
              <FontAwesomeIcon icon={faLightbulb} className="mr-2" /> Conseil pratique
            </h3>
            <p className="text-gray-700">
              Activez les notifications pour être alerté dès qu'une nouvelle annonce correspondant à vos critères est publiée.
            </p>
          </div>

          <div className="text-center">
            <Link 
              to="/etudiant/inscription" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              Commencez maintenant <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section Propriétaires */}
      <section id="proprietaire" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-[#F6A34A]/10 text-[#F6A34A] rounded-full font-medium mb-4">
              Pour les propriétaires
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Proposez votre logement en toute simplicité</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Gagnez du temps et trouvez des locataires fiables</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {etapesProprietaires.map((etape, index) => (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
              >
                <div 
                  className="w-16 h-16 bg-[${etape.couleur}]/10 text-[${etape.couleur}] rounded-full flex items-center justify-center mb-4 mx-auto transition-all group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: `${etape.couleur}10`, color: etape.couleur }}
                >
                  <FontAwesomeIcon icon={etape.icone} className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">{etape.titre}</h3>
                <p className="text-gray-600 text-center">{etape.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 rounded-lg bg-gradient-to-r from-[#2C5CD5]/10 to-[#3CB371]/10 border-l-4 border-[#3CB371]">
              <h3 className="text-xl font-semibold mb-3 text-[#3CB371] flex items-center">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" /> Sécurité
              </h3>
              <p className="text-gray-700">
                Tous les étudiants sont vérifiés via leur email universitaire pour plus de sécurité.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-r from-[#2C5CD5]/10 to-[#3CB371]/10 border-l-4 border-[#F6A34A]">
              <h3 className="text-xl font-semibold mb-3 text-[#F6A34A] flex items-center">
                <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Avantages
              </h3>
              <p className="text-gray-700">
                Augmentez vos chances de trouver des locataires sérieux et évitez les logements vides.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/proprietaire/inscription" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#F6A34A] to-[#e67e22] text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              Publier une annonce <FontAwesomeIcon icon={faHomeSolid} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Questions fréquentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trouvez rapidement des réponses à vos questions</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  onClick={() => basculerFaq(index)}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`transition-transform ${faqOuvert[index] ? 'transform rotate-180' : ''}`}
                  />
                </button>
                <div className={`px-6 py-4 bg-white ${faqOuvert[index] ? 'block' : 'hidden'}`}>
                  <p className="text-gray-700">{faq.reponse}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="/contact" 
              className="inline-flex items-center text-[#2C5CD5] font-medium hover:text-[#3CB371] transition-colors"
            >
              Vous avez d'autres questions ? Contactez-nous
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommentCaMarche;