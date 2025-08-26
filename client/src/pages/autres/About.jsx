import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHandHoldingHeart, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import equipe from '../../assets/img/equipe.jpg'
import fondateur from '../../assets/img/fondateur.jpg'
import Footer from '../../components/Footer';
const About = () => {
    return (
        <div>
            <Navbar />
            {/* Page À Propos */}
            <section className="py-16 bg-[#F0F0F0]/30">
                <div className="container mx-auto px-4">
                    {/* Hero À Propos */}
                    <div className="text-center mb-20">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            Notre <span className="text-[#2C5CD5]">histoire</span> et notre <span className="text-[#3CB371]">mission</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez comment LoguiStud révolutionne la recherche de logement étudiant en Guinée
                        </p>
                    </div>

                    {/* Section Notre Histoire */}
                    <div className="flex flex-col lg:flex-row items-center mb-24 gap-12">
                        <div className="lg:w-1/2">
                            <img
                                src={equipe}
                                // src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="Équipe LoguiStud"
                                className="rounded-xl shadow-xl w-full h-auto"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-[#F6A34A]">
                                Notre histoire
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Fondé en 2025 à Conakry, LoguiStud est né d'un constat simple : les étudiants guinéens rencontraient d'énormes difficultés pour trouver un logement digne, sécurisé et abordable près de leurs campus.
                            </p>
                            <p className="text-gray-600 mb-6">
                                Après que certains de nos membres aient vécu cette galère personnellement, notre équipe de jeunes entrepreneurs a décidé de créer une solution digitale adaptée au contexte local, combinant technologie moderne et connaissance approfondie du terrain.
                            </p>
                            <div className="bg-white p-6 rounded-lg border-l-4 border-[#2C5CD5] shadow-sm">
                                <p className="italic text-gray-700 mb-3">
                                    "Notre objectif était clair : simplifier la recherche de logement pour les étudiants tout en garantissant des conditions dignes et des prix accessibles."
                                </p>
                                <p className="font-semibold text-[#2C5CD5]">Ahmed Kipertino, Fondateur</p>
                            </div>
                        </div>
                    </div>

                    {/* Section Chiffres Clés */}
                    <div className="bg-[#2C5CD5] text-white rounded-xl p-12 mb-20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-white"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-12 text-center">LoguiStud en chiffres</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="text-center">
                                    <p className="text-4xl font-bold mb-2">5 000+</p>
                                    <p className="text-gray-200">Étudiants logés</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-bold mb-2">1 200+</p>
                                    <p className="text-gray-200">Annonces actives</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-bold mb-2">15</p>
                                    <p className="text-gray-200">Villes couvertes</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-bold mb-2">4.8/5</p>
                                    <p className="text-gray-200">Satisfaction moyenne</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Notre Mission */}
                    <div className="mb-24">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center relative pb-2 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[#3CB371]">
                            Notre mission
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                                <div className="w-14 h-14 bg-[#2C5CD5]/10 rounded-full flex items-center justify-center mb-6">
                                    <FontAwesomeIcon icon={faHome} className="text-[#2C5CD5] text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Faciliter l'accès au logement</h3>
                                <p className="text-gray-600">
                                    Rendre la recherche de logement simple et efficace grâce à une plateforme centralisée et intuitive.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                                <div className="w-14 h-14 bg-[#3CB371]/10 rounded-full flex items-center justify-center mb-6">
                                    <FontAwesomeIcon icon={faHandHoldingHeart} className="text-[#3CB371] text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Garantir des conditions dignes</h3>
                                <p className="text-gray-600">
                                    Vérifier chaque annonce pour assurer des logements salubres, sécurisés et bien équipés.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                                <div className="w-14 h-14 bg-[#F6A34A]/10 rounded-full flex items-center justify-center mb-6">
                                    <FontAwesomeIcon icon={faUsers} className="text-[#F6A34A] text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Favoriser la communauté</h3>
                                <p className="text-gray-600">
                                    Créer un réseau solidaire entre étudiants et propriétaires responsables.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section Équipe */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Notre équipe</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-8">
                            <div className="text-center">
                                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#F6A34A]">
                                    <img src={fondateur} alt="Ahmed Kipertino" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Ahmed Kipertino</h3>
                                <p className="text-[#F6A34A] font-medium mb-2">Développeur Principal</p>
                                <p className="text-gray-600 text-sm">
                                    Etudiant en développement web, il conçoit des solutions techniques innovantes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Final */}
                    <div className="bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] rounded-xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">Prêt à trouver votre logement idéal ?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Rejoignez des milliers d'étudiants qui ont déjà trouvé leur logement grâce à LoguiStud
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/choix-profile" className="px-8 py-4 bg-white text-[#2C5CD5] rounded-lg font-bold hover:bg-gray-100 transition duration-300">
                                Créer un compte
                            </Link>
                            <a href="/annonces" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition duration-300">
                                Voir les annonces
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <Footer/>

            {/* Styles */}
            <style>{`
        .bg-primary-gradient { background: linear-gradient(135deg, #2C5CD5 0%, #3A66E0 100%); }
        .bg-secondary-gradient { background: linear-gradient(to right, #3CB371 0%, #4DC381 100%); }
        .bg-accent-hover { background: linear-gradient(to bottom, #F6A34A 0%, #F8B05C 100%); }
        
        .nav-link::after {
          content: '';
          display: block;
          width: 0;
          height: 3px;
          background: linear-gradient(to right, #F6A34A, #3CB371);
          transition: width 0.3s;
          margin-top: 2px;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .dropdown-menu {
          transition: all 0.3s ease;
        }
      `}</style>
        </div>
    );
};

export default About;