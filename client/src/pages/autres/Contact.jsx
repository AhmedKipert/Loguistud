import React, { useState, useEffect } from 'react';
import { FaHome, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaPaperPlane, FaChevronDown, FaCheck } from 'react-icons/fa';
import { RiSendPlaneFill } from 'react-icons/ri';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, 
  FaYoutube, FaWhatsapp, FaTiktok, FaTelegramPlane 
} from 'react-icons/fa';
import Footer from '../../components/Footer';
import Navbar from './Navbar';

const ContactPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    consentement: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Coordonnées de l'UGANC
  const ugancCoords = { lat: 9.022722591132976, lng: -13.71286792473033 };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Réinitialisation après 3 secondes
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          prenom: '',
          nom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: '',
          consentement: false
        });
      }, 3000);
    }, 2000);
  };

  // Effet d'animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const faqItems = [
    {
      question: "Comment trouver un logement sur LoguiStud ?",
      answer: "Notre plateforme vous permet de rechercher des logements selon vos critères (localisation, budget, type de logement). Utilisez nos filtres avancés pour affiner votre recherche et sauvegardez vos favoris."
    },
    {
      question: "Quels sont les documents nécessaires pour réserver ?",
      answer: "Généralement, vous aurez besoin de : une pièce d'identité valide, une preuve de statut étudiant, et parfois une garantie locative. Les propriétaires peuvent demander des documents supplémentaires selon leurs critères."
    },
    {
      question: "Puis-je visiter un logement avant de réserver ?",
      answer: "Oui, nous encourageons les visites avant réservation. Vous pouvez contacter directement le propriétaire via notre plateforme pour organiser une visite. Nous proposons également des visites virtuelles pour certains logements."
    },
    {
      question: "Que faire en cas de problème avec mon logement ?",
      answer: "Notre équipe est là pour vous aider. Contactez-nous via ce formulaire ou par téléphone en décrivant le problème. Nous ferons le nécessaire pour trouver une solution avec le propriétaire."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      {/* Styles globaux */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .gradient-bg {
          background: linear-gradient(135deg, #2C5CD5 0%, #3CB371 100%);
        }
        .card-glass {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .floating {
          animation: floating 6s ease-in-out infinite;
        }
        .floating-delay {
          animation: floating 6s ease-in-out infinite 2s;
        }
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* Formes décoratives animées */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full gradient-bg opacity-10 floating blur-xl -z-10"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full gradient-bg opacity-10 floating-delay blur-xl -z-10"></div>

      {/* En-tête */}
      <Navbar/>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Contactez notre <span className="text-blue-600">équipe</span></h1>
            <p className="text-xl text-gray-600 mb-8">Nous sommes là pour répondre à toutes vos questions sur votre logement étudiant.</p>
            <div className="flex justify-center space-x-4">
              <a href="#form-contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition transform hover:-translate-y-1 shadow-md">
                Envoyer un message
              </a>
              <a href="tel:+224000000000" className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-medium border border-gray-200 transition transform hover:-translate-y-1 shadow-md">
                <FaPhone className="inline mr-2" /> Nous appeler
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Carte de contact */}
            <div className="space-y-8">
              <div className="animate-on-scroll bg-white p-8 rounded-2xl shadow-lg transform transition hover:-translate-y-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <FaMapMarkerAlt className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Adresse</h3>
                      <p className="text-gray-600">123 Avenue des Étudiants, Conakry, Guinée</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <FaPhone className="text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Téléphone</h3>
                      <p className="text-gray-600">+224 000 000 000</p>
                      <p className="text-gray-600">+224 000 000 000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                      <FaEnvelope className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">contact@loguistud.com</p>
                      <p className="text-gray-600">support@loguistud.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <FaClock className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Horaires</h3>
                      <p className="text-gray-600">Lundi-Vendredi: 8h-18h</p>
                      <p className="text-gray-600">Samedi: 9h-13h</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Réseaux sociaux */}
              <div className="animate-on-scroll bg-white p-8 rounded-2xl shadow-lg transform transition hover:-translate-y-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos réseaux sociaux</h2>
                <div className="grid grid-cols-4 gap-4">
                  <a href="#" className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition transform hover:-translate-y-1">
                    <FaFacebookF className="text-xl" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition transform hover:-translate-y-1">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-500 transition transform hover:-translate-y-1">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition transform hover:-translate-y-1">
                    <FaYoutube className="text-xl" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition transform hover:-translate-y-1">
                    <FaWhatsapp className="text-xl" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-900 transition transform hover:-translate-y-1">
                    <FaTiktok className="text-xl" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition transform hover:-translate-y-1">
                    <FaLinkedinIn className="text-xl" />
                  </a>
                  <a href="#" className="w-14 h-14 rounded-full bg-gray-600 text-white flex items-center justify-center hover:bg-gray-700 transition transform hover:-translate-y-1">
                    <FaTelegramPlane className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div id="form-contact" className="animate-on-scroll card-glass p-8 md:p-10 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Envoyez-nous un message</h2>
              <p className="text-gray-600 mb-8">Nous vous répondrons dans les plus brefs délais</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                    <input 
                      type="text" 
                      id="prenom" 
                      name="prenom" 
                      required
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                    <input 
                      type="text" 
                      id="nom" 
                      name="nom" 
                      required
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    id="telephone" 
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    placeholder="Votre numéro"
                  />
                </div>
                
                <div>
                  <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-2">Sujet *</label>
                  <select 
                    id="sujet" 
                    name="sujet" 
                    required
                    value={formData.sujet}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition appearance-none"
                  >
                    <option value="" disabled>Sélectionnez un sujet</option>
                    <option>Demande d'information</option>
                    <option>Problème avec un logement</option>
                    <option>Partenariat</option>
                    <option>Autre question</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                    placeholder="Votre message..."
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input 
                      id="consentement" 
                      name="consentement" 
                      type="checkbox" 
                      required
                      checked={formData.consentement}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="consentement" className="font-medium text-gray-700">
                      J'accepte que mes données soient utilisées pour traiter ma demande *
                    </label>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full gradient-bg text-white px-6 py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center ${
                    isSubmitting ? 'opacity-80' : 'hover:opacity-90'
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <span>Message envoyé !</span>
                      <FaCheck className="ml-3" />
                    </>
                  ) : isSubmitting ? (
                    <>
                      <span>Envoi en cours...</span>
                      <div className="ml-3 animate-spin">
                        <RiSendPlaneFill />
                      </div>
                    </>
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <FaPaperPlane className="ml-3" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Carte Google Maps avec localisation UGANC */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nous trouver</h2>
          <div className="animate-on-scroll map-container max-w-4xl mx-auto shadow-xl rounded-xl overflow-hidden">
            <iframe 
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.231389499012!2d${ugancCoords.lng}!3d${ugancCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnMjEuOCJOIDEzwrA0MiczNi4wIlc!5e0!3m2!1sen!2sgn!4v1620000000000!5m2!1sen!2sgn`}
              width="100%" 
              height="450" 
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Localisation de l'UGANC"
            ></iframe>
          </div>
          <p className="text-center mt-4 text-gray-600">
            <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
            Université Gamal Abdel Nasser de Conakry (UGANC)
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-600">
                <button 
                  className="faq-question w-full text-left p-6 flex justify-between items-center bg-white hover:bg-gray-50"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-lg text-gray-800">{item.question}</span>
                  <FaChevronDown 
                    className={`text-blue-600 transition-transform duration-300 ${
                      activeFaq === index ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6 animate-fadeIn">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <Footer/>
    </div>
  );
};

export default ContactPage;