import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Chargement = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Animation principale avec GSAP
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }, onComplete: () => {
                gsap.to(".conteneur", {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => navigate("/etudiant/dashboard")
                });
            }
        });

        // Animation d'entree du logo
        tl.from(".floating", {
            duration: 0.3,
            y: 80,
            opacity: 0.8,
            ease: "elastic.out(1, 0.5)"
        });

        // Pulsation du cercle
        tl.to(".logo-circle", {
            duration: 0.3,
            scale: 1.1,
            repeat: 1,
            ease: "sine.inOut"
        }, "-=0.5");

        // Apparition du texte de chargement
        tl.to(".loading-text", {
            duration: 0.5,
            opacity: 1,
            y: 0
        });

        // Animation de la barre de progression
        tl.to(".progress-bar", {
            duration: 0.8,
            width: "100%",
            ease: "power1.inOut"
        });

        // Animation des points indicateurs
        tl.to(".indicator-dot", {
            duration: 0.4,
            opacity: 1,
            y: -5,
            stagger: 0.2,
            ease: "back.out"
        }, "-=2.5");

        // Apparition du slogan
        tl.to(".slogan", {
            duration: 0.8,
            opacity: 1,
            y: 0
        }, "-=1.5");

        // Animation des formes de fond
        tl.from(".bg-shape-1", {
            duration: 0.5,
            x: -50,
            y: -50,
            opacity: 0
        }, "-=3");

        tl.from(".bg-shape-2", {
            duration: 0.5,
            x: 50,
            y: 50,
            opacity: 0
        }, "-=2.5");

        // Nettoyage des animations lorsque le composant est demonté
        return () => {
            tl.kill();
        };
    }, []);

    return (
        <>

            <div className="conteneur bg-gray-50 flex justify-center items-center h-screen overflow-hidden p-4">
                <div className="text-center w-full max-w-md px-4">
                    {/* Logo avec animation visible */}
                    <div className="floating mb-12">
                        <div className="flex justify-center items-center space-x-4 transform transition-all duration-300 hover:scale-105">
                            <div className="logo-circle w-20 h-20 rounded-full bg-[#2C5CD5] flex justify-center items-center text-white text-2xl font-bold shadow-xl shadow-blue-500/30">
                                LS
                            </div>
                            <h1 className="text-4xl font-bold text-gray-800">
                                Logui<span className="gradient-text">Stud</span>
                            </h1>
                        </div>
                    </div>

                    {/* Message de chargement bien visible */}
                    <div className="loading-text text-lg text-gray-600 mb-8 font-medium tracking-wide opacity-0 transform translate-y-4">
                        <div className="mb-1">Initialisation de votre espace</div>
                        <div className="text-sm text-gray-500 font-normal">Veuillez patienter...</div>
                    </div>

                    {/* Barre de progression visible */}
                    <div className="h-2 bg-gray-200 rounded-full w-full mb-8 overflow-hidden mx-auto">
                        <div className="progress-bar h-full bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] rounded-full w-0"></div>
                    </div>

                    {/* Indicateurs colores visibles */}
                    <div className="flex justify-center space-x-3 mb-10">
                        <div className="indicator-dot w-3 h-3 rounded-full bg-[#2C5CD5] opacity-0"></div>
                        <div className="indicator-dot w-3 h-3 rounded-full bg-[#3CB371] opacity-0"></div>
                        <div className="indicator-dot w-3 h-3 rounded-full bg-[#F6A34A] opacity-0"></div>
                    </div>

                    {/* Slogan visible */}
                    <div className="slogan text-sm text-gray-500 opacity-0 transform translate-y-4">
                        La reference du logement etudiant en Guinee
                    </div>

                    {/* Animation de fond subtile */}
                    <div className="fixed inset-0 -z-10 overflow-hidden">
                        <div className="bg-shape-1 absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-[#2C5CD5]/10 blur-xl"></div>
                        <div className="bg-shape-2 absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-[#3CB371]/10 blur-xl"></div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .gradient-text {
          background: linear-gradient(270deg, #2C5CD5, #3CB371, #F6A34A);
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 4s ease infinite;
        }

        @keyframes floating {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .floating {
          animation: floating 3s ease-in-out infinite;
        }
      `}</style>
        </>
    );
};

export default Chargement;