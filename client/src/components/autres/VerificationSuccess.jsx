import React from 'react'
import Navbar from '../../pages/autres/Navbar';
import Footer from '../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const VerificationSuccess = ({ user }) => {
    return (
        <div>
            <Navbar />
            <main className="flex-grow flex items-center justify-center py-10">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center animate-fade-in">
                    <div className="mb-6 text-[#3CB371]">
                        <FontAwesomeIcon icon={faCheckCircle} size="4x" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Vérification réussie !
                    </h1>

                    <div className="bg-green-50 p-4 rounded-lg mb-6">
                        <div className="flex flex-col items-center justify-center text-green-800 mb-2">
                            <h1 className='font-semibold'>{user}</h1>
                        </div>
                        <p className="text-gray-700">
                            Félicitations ! Votre adresse email a été confirmée et votre compte est maintenant actif.
                        </p>
                    </div>

                    <div className="space-y-4 text-gray-600">
                        <p>
                            Vous pouvez maintenant accéder à toutes les fonctionnalités de notre plateforme.
                        </p>
                        <p>
                            Profitez pleinement de votre expérience utilisateur.
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            to={'/connexion'}
                            className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition"
                        >
                            Se connecter
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default VerificationSuccess;