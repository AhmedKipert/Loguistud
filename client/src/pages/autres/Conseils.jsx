import React, { useEffect } from 'react';
import { FaLightbulb, FaBookOpen, FaPlayCircle, FaSearch, FaWallet, FaUsers, FaCheckCircle, FaChevronRight, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Conseils = () => {
  // Configuration Tailwind
  const tailwindConfig = {
    theme: {
      extend: {
        colors: {
          primary: '#2C5CD5',
          secondary: '#3CB371',
          accent: '#F6A34A',
          light: '#F0F0F0',
        },
        animation: {
          float: 'float 6s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        }
      }
    }
  };

  // // Animation des compteurs
  // useEffect(() => {
  //   const animateCounters = () => {
  //     const counters = document.querySelectorAll('[data-count]');
      
  //     counters.forEach(counter => {
  //       let cible = parseInt(counter.textContent);
  //       let compte = 0;
  //       let duree = 2000;
  //       let increment = cible / (duree / 16);
        
  //       const miseAJourCompte = () => {
  //         compte += increment;
  //         if (compte < cible) {
  //           counter.textContent = Math.ceil(compte);
  //           requestAnimationFrame(miseAJourCompte);
  //         } else {
  //           counter.textContent = cible;
  //         }
  //       };
        
  //       const observateur = new IntersectionObserver((entries) => {
  //         entries.forEach(entry => {
  //           if (entry.isIntersecting) {
  //             miseAJourCompte();
  //             observateur.unobserve(entry.target);
  //           }
  //         });
  //       }, { threshold: 0.5 });
        
  //       observateur.observe(counter.parentElement.parentElement);
  //     });
  //   };

  //   animateCounters();
  // }, []);

  return (
    <div className="font-sans antialiased text-gray-800 bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 animate-float inline-block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <FaLightbulb className="text-3xl text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Conseils pratiques pour <span className="gradient-text">votre logement étudiant</span>
            </h1>
            <p className="text-xl opacity-90 mb-8">Trouvez le logement idéal en Guinée avec nos guides experts</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#guides" className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl">
                <FaBookOpen className="inline mr-2" /> Voir les guides
              </a>
              <a href="#" className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-full transition-all border border-white/30">
                <FaPlayCircle className="inline mr-2" /> Tutoriels vidéo
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-current text-white w-full h-16 md:h-24">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Guides Pratiques */}
      <section id="guides" className="py-16 bg-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-3">Guides pratiques</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos <span className="text-primary">conseils</span> pour bien chercher</h2>
            <p className="max-w-2xl mx-auto text-gray-600">Découvrez nos stratégies éprouvées par des milliers d'étudiants</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Guide 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md card-hover-effect">
              <div className="relative h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Recherche" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <FaSearch className="text-primary text-xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Recherche efficace</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 text-secondary">
                      <FaCheckCircle />
                    </span>
                    <span>Créez des alertes pour les nouvelles annonces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 text-secondary">
                      <FaCheckCircle />
                    </span>
                    <span>Utilisez notre carte interactive pour voir les distances</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 text-secondary">
                      <FaCheckCircle />
                    </span>
                    <span>Comparez plusieurs logements simultanément</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a href="#" className="text-primary hover:text-accent font-medium flex items-center">
                    Lire le guide complet <FaChevronRight className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Guide 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md card-hover-effect">
              <div className="relative h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Budget" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <FaWallet className="text-accent text-xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Gestion du budget</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 text-secondary">
                      <FaCheckCircle />
                    </span>
                    <span>Notre calculateur de budget intégré</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 text-secondary">
                      <FaCheckCircle />
                    </span>
                    <span>Astuces pour négocier son loyer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 text-secondary">
                      <FaCheckCircle />
                    </span>
                    <span>Aides financières méconnues</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a href="#" className="text-primary hover:text-accent font-medium flex items-center">
                    Lire le guide complet <FaChevronRight className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Guide 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md card-hover-effect">
              <div className="relative h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Colocation" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <FaUsers className="text-secondary text-xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Colocation réussie</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 text-secondary">
                      <FaCheckCircle />
                    </span>
                    <span>Test de compatibilité entre colocataires</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 text-secondary">
                      <FaCheckCircle />
                    </span>
                    <span>Modèle de contrat à télécharger</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 text-secondary">
                      <FaCheckCircle />
                    </span>
                    <span>10 règles d'or pour une bonne entente</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a href="#" className="text-primary hover:text-accent font-medium flex items-center">
                    Lire le guide complet <FaChevronRight className="ml-2 text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2" data-count="12000">12K+</div>
                <div className="text-sm uppercase tracking-wider opacity-90">Étudiants logés</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" data-count="3000">3K+</div>
                <div className="text-sm uppercase tracking-wider opacity-90">Annonces vérifiées</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" data-count="89">89%</div>
                <div className="text-sm uppercase tracking-wider opacity-90">Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" data-count="42">42</div>
                <div className="text-sm uppercase tracking-wider opacity-90">Universités</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-3">Témoignages</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ils ont trouvé <span className="text-primary">leur logement</span></h2>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Témoignage 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Fatou" className="w-12 h-12 rounded-full border-2 border-secondary/20 mr-4" />
                <div>
                  <h4 className="font-bold">Fatou Diallo</h4>
                  <p className="text-sm text-gray-600">Étudiante en Médecine, Conakry</p>
                </div>
              </div>
              <p className="text-gray-700 italic pl-2 border-l-2 border-secondary">
                "LoguiStud m'a sauvé la vie ! En tant qu'étudiante venant de Labé, je ne connaissais personne à Conakry. En 3 jours j'ai trouvé une colocation super avec deux autres étudiantes en médecine."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
            
            {/* Témoignage 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mohamed" className="w-12 h-12 rounded-full border-2 border-primary/20 mr-4" />
                <div>
                  <h4 className="font-bold">Mohamed Camara</h4>
                  <p className="text-sm text-gray-600">Étudiant en Droit, Kankan</p>
                </div>
              </div>
              <p className="text-gray-700 italic pl-2 border-l-2 border-primary">
                "Ce qui m'a plu c'est la transparence. Les propriétaires sont vérifiés et les annonces détaillées. J'ai économisé 2 mois de recherche et 3 visites inutiles grâce aux photos HD."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">FAQ</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions <span className="text-secondary">fréquentes</span></h2>
            </div>
            
            <div className="space-y-4">
              {/* Question 1 */}
              <details className="group border border-gray-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 bg-gray-50 p-4">
                  <h3 className="font-medium text-gray-900">Comment vérifier la légalité d'une annonce ?</h3>
                  <span className="relative h-5 w-5 shrink-0">
                    <span className="absolute inset-0 m-auto block h-0.5 w-4/5 bg-primary group-open:hidden"></span>
                    <span className="absolute inset-0 m-auto block h-0.5 w-4/5 bg-primary group-open:hidden rotate-90"></span>
                    <span className="absolute inset-0 m-auto block h-0.5 w-4/5 bg-primary group-open:rotate-45 transition-transform"></span>
                    <span className="absolute inset-0 m-auto block h-0.5 w-4/5 bg-primary group-open:-rotate-45 transition-transform"></span>
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-0 bg-white">
                  <p className="text-gray-700 mb-3">
                    Nous recommandons toujours de demander ces documents au propriétaire :
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Le titre de propriété ou contrat de bail</li>
                    <li>Une pièce d'identité valide</li>
                    <li>Le contrat de bail précédent</li>
                  </ul>
                </div>
              </details>
              
              {/* Question 2 */}
              <details className="group border border-gray-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 bg-gray-50 p-4">
                  <h3 className="font-medium text-gray-900">Quels documents préparer pour une location ?</h3>
                  <span className="relative h-5 w-5 shrink-0">
                    <span className="absolute inset-0 m-auto block h-0.5 w-4/5 bg-primary group-open:hidden"></span>
                    <span className="absolute inset-0 m-auto block h-0.5 w-4/5 bg-primary group-open:hidden rotate-90"></span>
                    <span className="absolute inset-0 m-auto block h-0.5 w-4/5 bg-primary group-open:rotate-45 transition-transform"></span>
                    <span className="absolute inset-0 m-auto block h-0.5 w-4/5 bg-primary group-open:-rotate-45 transition-transform"></span>
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-0 bg-white">
                  <p className="text-gray-700 mb-3">
                    Voici les documents généralement demandés :
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>CNI ou Passeport valide</li>
                    <li>Attestation d'inscription universitaire</li>
                    <li>Bulletins de notes</li>
                    <li>Garant parent ou tiers</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à trouver votre logement idéal ?</h2>
            <p className="text-xl opacity-90 mb-8">Rejoignez les milliers d'étudiants qui ont simplifié leur recherche</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white hover:bg-gray-100 text-primary font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl">
                <FaSearch className="inline mr-2" /> Explorer les annonces
              </a>
              <a href="#" className="bg-accent hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl">
                <i className="fas fa-user-plus mr-2"></i> Créer un compte
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Styles globaux */}
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(90deg, #2C5CD5 0%, #3CB371 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .card-hover-effect {
          transition: all 0.3s ease;
        }
        .card-hover-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Conseils;