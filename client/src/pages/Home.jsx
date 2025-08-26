import React, { useEffect } from 'react';
import { FaSearch, FaPlayCircle, FaShieldAlt, FaBolt, FaComments, FaMapMarkedAlt, FaStar, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Navbar from './autres/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Loading } from './autres/Loading';
import imageHero from '../assets/img/accueil2.jpg'
const Home = () => {
  const { loading } = useContext(AuthContext);


  // Initialisation des effets (commentaires en francais non accentue)
  useEffect(() => {
    const initialiserParticules = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#ffffff"
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000"
              }
            },
            opacity: {
              value: 0.5,
              random: false
            },
            size: {
              value: 3,
              random: true
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "grab"
              },
              onclick: {
                enable: true,
                mode: "push"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1
                }
              },
              push: {
                particles_nb: 4
              }
            }
          },
          retina_detect: true
        });
      }
    };

    const initialiserAnimations = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          offset: 100
        });
      }
    };

    // Chargement des scripts externes
    const chargerScripts = () => {
      const particlesScript = document.createElement('script');
      particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      particlesScript.onload = initialiserParticules;
      document.body.appendChild(particlesScript);

      const aosScript = document.createElement('script');
      aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
      aosScript.onload = initialiserAnimations;
      document.body.appendChild(aosScript);
    };

    chargerScripts();

    return () => {
      // Nettoyage si necessaire
    };
  }, []);


  if (loading) return <Loading />
  return (
    <div className="font-sans antialiased bg-gray-50">
      <Navbar />

      {/* Hero Section avec animation de particules */}
      <section className="relative lg:h-[calc(100vh-150px)] sm:py-8 flex items-center justify-center overflow-hidden">
        <div id="particles-js" className="absolute w-full h-full top-0 left-0 z-0 bg-gradient-to-r from-[#2C5CD5] to-[#3CB371]"></div>

        <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Texte principal */}
            <div className="lg:w-1/2 z-2 mb-12 lg:mb-0 lg:pr-10 text-white" data-aos="fade-right">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-6">
                Trouvez votre <span className="text-[#F6A34A]">logement étudiant</span> en Guinée
              </h1>
              <p className="text-xl opacity-90 mb-8">
                La solution simple et sécurisée pour les étudiants à la recherche d'un logement ou d'une colocation à Conakry et dans les autres villes universitaires.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/annonces"
                  className="bg-[#F6A34A] z-2 hover:bg-[#e5943a] px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  data-aos="zoom-in" data-aos-delay="200">
                  <FaSearch className="mr-3" />
                  Voir les annonces
                </Link>
                <Link to="/fonctionnement"
                  className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg font-bold text-lg border border-white flex items-center justify-center backdrop-blur-sm transition-colors duration-300"
                  data-aos="zoom-in" data-aos-delay="300">
                  <FaPlayCircle className="mr-3" />
                  Comment ça marche ?
                </Link>
              </div>
            </div>

            {/* Image hero avec animation */}
            <div className="lg:w-1/2 relative" data-aos="fade-left" data-aos-delay="200">
              <div className="relative bg-white p-1 rounded-2xl shadow-xl transition duration-500 hover:scale-105">
                <img src={imageHero}
                  alt="Étudiants devant une résidence universitaire"
                  className="w-full h-auto rounded-xl" />
                <div className="absolute -bottom-6 -right-6 bg-[#F6A34A] text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
                  <p className="font-bold text-lg">À partir de <span className="text-2xl">500 000 GNF</span></p>
                  <p className="text-sm">par mois</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi Nous Choisir */}
      <section className="py-16 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <span className="inline-block px-4 py-2 bg-[#2C5CD5]/10 text-[#2C5CD5] rounded-full font-medium mb-4">Pourquoi LoguiStud ?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              La solution <span className="text-[#2C5CD5]">la plus simple</span> pour votre logement étudiant
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez ce qui fait de nous la plateforme préférée des étudiants en Guinée
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {/* Carte 1 */}
            <div className="relative group" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white rounded-xl p-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
                <div className="w-16 h-16 bg-[#2C5CD5]/10 rounded-lg flex items-center justify-center mb-6">
                  <FaShieldAlt className="text-[#2C5CD5] text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Sécurité garantie</h3>
                <p className="text-gray-600">
                  Tous les propriétaires et logements sont vérifiés manuellement par notre équipe pour votre tranquillité d'esprit.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center text-[#2C5CD5] font-medium">
                    En savoir plus
                    <FaArrowRight className="ml-2 text-sm" />
                  </span>
                </div>
              </div>
            </div>

            {/* Carte 2 */}
            <div className="relative group" data-aos="fade-up" data-aos-delay="200">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#3CB371] to-[#F6A34A] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white rounded-xl p-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
                <div className="w-16 h-16 bg-[#3CB371]/10 rounded-lg flex items-center justify-center mb-6">
                  <FaBolt className="text-[#3CB371] text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Résultats rapides</h3>
                <p className="text-gray-600">
                  85% de nos utilisateurs trouvent un logement en moins d'une semaine grâce à notre système de matching intelligent.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center text-[#3CB371] font-medium">
                    En savoir plus
                    <FaArrowRight className="ml-2 text-sm" />
                  </span>
                </div>
              </div>
            </div>

            {/* Carte 3 */}
            <div className="relative group" data-aos="fade-up" data-aos-delay="300">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#F6A34A] to-[#2C5CD5] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white rounded-xl p-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
                <div className="w-16 h-16 bg-[#F6A34A]/10 rounded-lg flex items-center justify-center mb-6">
                  <FaComments className="text-[#F6A34A] text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Messagerie intégrée</h3>
                <p className="text-gray-600">
                  Contactez directement les propriétaires via notre plateforme sécurisée, sans partager vos coordonnées personnelles.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center text-[#F6A34A] font-medium">
                    En savoir plus
                    <FaArrowRight className="ml-2 text-sm" />
                  </span>
                </div>
              </div>
            </div>

            {/* Carte 4 */}
            <div className="relative group" data-aos="fade-up" data-aos-delay="400">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#2C5CD5] to-[#F6A34A] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white rounded-xl p-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition duration-300">
                <div className="w-16 h-16 bg-[#2C5CD5]/10 rounded-lg flex items-center justify-center mb-6">
                  <FaMapMarkedAlt className="text-[#2C5CD5] text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Localisation optimale</h3>
                <p className="text-gray-600">
                  Tous nos logements sont situés à moins de 30 minutes des principaux campus universitaires de Guinée.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center text-[#2C5CD5] font-medium">
                    En savoir plus
                    <FaArrowRight className="ml-2 text-sm" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bandeau statistiques */}
          <div className="mt-20 bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] rounded-2xl p-6 md:p-8 text-white" data-aos="fade-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">15+</div>
                <div className="text-sm md:text-base opacity-90">Villes couvertes</div>
                <p className="text-xs mt-2 opacity-75">(Conakry, Kindia, Labé, Kankan...)</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">500K+</div>
                <div className="text-sm md:text-base opacity-90">à partir de</div>
                <div className="text-lg font-medium">500 000 GNF/mois</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">90%</div>
                <div className="text-sm md:text-base opacity-90">Proches des campus</div>
                <p className="text-xs mt-2 opacity-75">(UGANC, ISSEG, ULC...)</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold mb-2">24h</div>
                <div className="text-sm md:text-base opacity-90">Réponse moyenne</div>
                <p className="text-xs mt-2 opacity-75">7j/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Processus en 3 étapes */}
      <section className="py-16 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Trouvez votre logement en <span className="text-[#3CB371]">3 étapes</span> simples
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Notre processus simplifié vous permet de trouver rapidement le logement parfait
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Étape 1 */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-20 h-20 bg-[#2C5CD5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-[#2C5CD5] rounded-full flex items-center justify-center text-white text-2xl font-bold">1</div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Créez votre profil</h3>
              <p className="text-gray-600">
                Inscrivez-vous en tant qu'étudiant et complétez votre profil en 2 minutes.
              </p>
            </div>

            {/* Étape 2 */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-20 h-20 bg-[#3CB371]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-[#3CB371] rounded-full flex items-center justify-center text-white text-2xl font-bold">2</div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Recherchez et filtrez</h3>
              <p className="text-gray-600">
                Trouvez des logements qui correspondent à vos critères et budget.
              </p>
            </div>

            {/* Étape 3 */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-20 h-20 bg-[#F6A34A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-[#F6A34A] rounded-full flex items-center justify-center text-white text-2xl font-bold">3</div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Contactez et visitez</h3>
              <p className="text-gray-600">
                Contactez directement le propriétaire et organisez une visite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-16 md:py-10 bg-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Ils ont trouvé <span className="text-[#2C5CD5]">leur logement</span> avec nous
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des étudiants comme vous partagent leur expérience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Témoignage 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="Aissatou" className="w-12 h-12 rounded-full border-2 border-[#3CB371]" />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Aissatou B.</h4>
                    <p className="text-sm text-[#3CB371]">Étudiante en Médecine - UGANC</p>
                  </div>
                </div>
                <div className="flex mb-3 text-[#F6A34A]">
                  <FaStar />
                  <FaStar className="ml-1" />
                  <FaStar className="ml-1" />
                  <FaStar className="ml-1" />
                  <FaStar className="ml-1" />
                </div>
                <p className="text-gray-600 italic mb-4">
                  "J'ai trouvé une colocation à Dixinn près de l'université pour 750 000 GNF/mois. Tout s'est fait en 3 jours !"
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2 text-[#2C5CD5]" />
                  <span>Conakry, Guinée</span>
                </div>
              </div>
              <div className="bg-[#F0F0F0] px-6 py-3 flex items-center">
                <span className="bg-[#2C5CD5] text-white text-xs px-3 py-1 rounded-full">Colocation</span>
                <span className="ml-auto text-sm font-medium">750 000 GNF/mois</span>
              </div>
            </div>

            {/* Témoignage 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Moussa" className="w-12 h-12 rounded-full border-2 border-[#3CB371]" />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Moussa C.</h4>
                    <p className="text-sm text-[#3CB371]">Étudiant en Droit - Université de Kankan</p>
                  </div>
                </div>
                <div className="flex mb-3 text-[#F6A34A]">
                  <FaStar />
                  <FaStar className="ml-1" />
                  <FaStar className="ml-1" />
                  <FaStar className="ml-1" />
                  <FaStar className="ml-1" />
                </div>
                <p className="text-gray-600 italic mb-4">
                  "En venant de Siguiri, j'ai pu trouver un studio à Kankan pour 600 000 GNF avant même d'arriver. Tout le processus s'est fait à distance."
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2 text-[#2C5CD5]" />
                  <span>Kankan, Guinée</span>
                </div>
              </div>
              <div className="bg-[#F0F0F0] px-6 py-3 flex items-center">
                <span className="bg-[#2C5CD5] text-white text-xs px-3 py-1 rounded-full">Studio</span>
                <span className="ml-auto text-sm font-medium">600 000 GNF/mois</span>
              </div>
            </div>

            {/* Témoignage 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2" data-aos="fade-up" data-aos-delay="300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="Mariama" className="w-12 h-12 rounded-full border-2 border-[#3CB371]" />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">Mariama D.</h4>
                    <p className="text-sm text-[#3CB371]">Étudiante en Informatique - Université de Labé</p>
                  </div>
                </div>
                <div className="flex mb-3 text-[#F6A34A]">
                  <FaStar />
                  <FaStar className="ml-1" />
                  <FaStar className="ml-1" />
                  <FaStar className="ml-1" />
                  <FaStar className="ml-1" />
                </div>
                <p className="text-gray-600 italic mb-4">
                  "Grâce à LoguiStud, j'ai une chambre meublée à 500 000 GNF à 10 minutes de l'université. Le propriétaire est très sérieux."
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2 text-[#2C5CD5]" />
                  <span>Labé, Guinée</span>
                </div>
              </div>
              <div className="bg-[#F0F0F0] px-6 py-3 flex items-center">
                <span className="bg-[#2C5CD5] text-white text-xs px-3 py-1 rounded-full">Chambre meublée</span>
                <span className="ml-auto text-sm font-medium">500 000 GNF/mois</span>
              </div>
            </div>
          </div>

          {/* Universités partenaires */}
          <div className="mt-16 bg-white rounded-xl shadow-sm p-6 md:p-8" data-aos="fade-up">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-8">Nos universités partenaires en Guinée</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* UGANC */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#F0F0F0] rounded-lg hover:bg-[#2C5CD5]/10 transition">
                <img src="https://via.placeholder.com/150x80?text=UGANC" alt="UGANC Logo" className="h-12 mb-2 object-contain" />
                <span className="text-center text-sm font-medium text-[#2C5CD5]">Université Gamal Abdel Nasser</span>
              </div>

              {/* ISSEG */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#F0F0F0] rounded-lg hover:bg-[#2C5CD5]/10 transition">
                <img src="https://via.placeholder.com/150x80?text=ISSEG" alt="ISSEG Logo" className="h-12 mb-2 object-contain" />
                <span className="text-center text-sm font-medium text-[#2C5CD5]">Institut Supérieur de Santé</span>
              </div>

              {/* Kankan */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#F0F0F0] rounded-lg hover:bg-[#2C5CD5]/10 transition">
                <img src="https://via.placeholder.com/150x80?text=UKANK" alt="Kankan Logo" className="h-12 mb-2 object-contain" />
                <span className="text-center text-sm font-medium text-[#2C5CD5]">Université de Kankan</span>
              </div>

              {/* Labé */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#F0F0F0] rounded-lg hover:bg-[#2C5CD5]/10 transition">
                <img src="https://via.placeholder.com/150x80?text=ULABE" alt="Labé Logo" className="h-12 mb-2 object-contain" />
                <span className="text-center text-sm font-medium text-[#2C5CD5]">Université de Labé</span>
              </div>

              {/* IPG */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#F0F0F0] rounded-lg hover:bg-[#2C5CD5]/10 transition">
                <img src="https://via.placeholder.com/150x80?text=IPG" alt="IPG Logo" className="h-12 mb-2 object-contain" />
                <span className="text-center text-sm font-medium text-[#2C5CD5]">Institut Polytechnique</span>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                *Les logos affichés sont des représentations. Veuillez contacter notre équipe pour ajouter votre établissement.
              </p>
              <a href="#" className="inline-block mt-4 px-6 py-2 bg-[#3CB371] text-white rounded-full text-sm font-medium hover:bg-[#2C5CD5] transition">
                Devenir partenaire <FaArrowRight className="ml-1 inline" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] rounded-2xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-white"></div>
              <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à trouver votre logement idéal ?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">Rejoignez des centaines d'étudiants qui ont déjà trouvé leur logement grâce à LoguiStud</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to={'/choix-profile'} className="bg-white text-[#2C5CD5] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all">
                  S'inscrire maintenant
                </Link>
                <Link to="/aide" className="bg-transparent border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:bg-opacity-10 hover:text-blue-700 transform hover:scale-105 transition-all">
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Chargement des CSS externes */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    </div>
  );
};

export default Home;