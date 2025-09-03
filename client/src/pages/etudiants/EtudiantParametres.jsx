import React, { useEffect, useState } from 'react';
import { faShieldAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOutletContext } from 'react-router-dom';
import { modifierMonMotDePasse, modifierMonEmail } from '../../services/etudiantService';
import { Toaster, toast } from 'sonner';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const EtudiantParametres = () => {
    const [activeTab, setActiveTab] = useState('security');
    const [formData, setFormData] = useState({
        email: '',
        motdepasse: ''
    });
    const [montrerAncienMotdepasse, setMontrerAncienMotdepasse] = useState(false);
    const [montrerNouveauMotdepasse, setMontrerNouveauMotdepasse] = useState(false);
    const [montrerConfirmationMotdepasse, setMontrerConfirmationMotdepasse] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    const {user} = useContext(AuthContext); 
    
    

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev, 
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoadingEmail(true);

        try {
            const res = await modifierMonEmail({
                email: formData.email
            });

            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('Erreur lors de la modification de l\'email');
        } finally {
            setLoadingEmail(false);
        }
    };

    const handleMotdepasseSubmit = async (e) => {
        e.preventDefault();
        setLoadingPassword(true);

        try {
            const formData = new FormData(e.target);
            const passwordData = {
                ancienMotdepasse: formData.get('ancienMotdepasse'),
                nouveauMotdepasse: formData.get('nouveauMotdepasse'),
                confirmationMotdepasse: formData.get('confirmationMotdepasse')
            };

            const res = await modifierMonMotDePasse(passwordData);

            if (res.success) {
                toast.success(res.message);
                e.target.reset();
                setMontrerAncienMotdepasse(false);
                setMontrerNouveauMotdepasse(false);
                setMontrerConfirmationMotdepasse(false);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('Erreur lors de la modification du mot de passe');
        } finally {
            setLoadingPassword(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
            <Toaster position="top-right" richColors />
            
            <main className="flex-1 overflow-x-hidden">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-gray-800">Paramètres du compte</h1>
                    
                    <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                        <button
                            onClick={() => handleTabChange('security')}
                            className={`tab-button px-6 py-3 whitespace-nowrap font-medium ${activeTab === 'security' ? 'text-gray-800 active' : 'text-gray-600'}`}
                        >
                            Sécurité
                        </button>
                        <button
                            onClick={() => handleTabChange('notifications')}
                            className={`tab-button px-6 py-3 whitespace-nowrap font-medium ${activeTab === 'notifications' ? 'text-gray-800 active' : 'text-gray-600'}`}
                        >
                            Notifications
                        </button>
                        <button
                            onClick={() => handleTabChange('privacy')}
                            className={`tab-button px-6 py-3 whitespace-nowrap font-medium ${activeTab === 'privacy' ? 'text-gray-800 active' : 'text-gray-600'}`}
                        >
                            Confidentialité
                        </button>
                    </div>

                    {activeTab === 'security' && (
                        <div className="settings-content">
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                                <div className="lg:col-span-2">
                                    <div className="settings-card bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
                                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                            <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600 mr-2" />
                                            Sécurité du compte
                                        </h2>

                                        {/* Formulaire Email */}
                                        <form onSubmit={handleEmailSubmit} className="mb-8">
                                            <div className="mb-6">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Adresse email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                                                    placeholder="Votre adresse email"
                                                    required
                                                />
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={loadingEmail}
                                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center justify-center min-w-[150px]"
                                                >
                                                    {loadingEmail ? (
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                    ) : (
                                                        'Modifier l\'email'
                                                    )}
                                                </button>
                                            </div>
                                        </form>

                                        {/* Formulaire Mot de passe */}
                                        <form onSubmit={handleMotdepasseSubmit}>
                                            <h3 className="text-md font-semibold text-gray-800 mb-4">Changer le mot de passe</h3>
                                            
                                            <div className="mb-4 relative">
                                                <label htmlFor="ancienMotdepasse" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ancien mot de passe
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={montrerAncienMotdepasse ? "text" : "password"}
                                                        id="ancienMotdepasse"
                                                        name="ancienMotdepasse"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none pr-10"
                                                        placeholder="Entrez votre ancien mot de passe"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                        onClick={() => setMontrerAncienMotdepasse(!montrerAncienMotdepasse)}
                                                    >
                                                        <FontAwesomeIcon 
                                                            icon={montrerAncienMotdepasse ? faEyeSlash : faEye} 
                                                            className="text-gray-400 hover:text-gray-600"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mb-4 relative">
                                                <label htmlFor="nouveauMotdepasse" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nouveau mot de passe
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={montrerNouveauMotdepasse ? "text" : "password"}
                                                        id="nouveauMotdepasse"
                                                        name="nouveauMotdepasse"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none pr-10"
                                                        placeholder="Entrez votre nouveau mot de passe"
                                                        required
                                                        minLength={6}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                        onClick={() => setMontrerNouveauMotdepasse(!montrerNouveauMotdepasse)}
                                                    >
                                                        <FontAwesomeIcon 
                                                            icon={montrerNouveauMotdepasse ? faEyeSlash : faEye} 
                                                            className="text-gray-400 hover:text-gray-600"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mb-6 relative">
                                                <label htmlFor="confirmationMotdepasse" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Confirmation du nouveau mot de passe
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={montrerConfirmationMotdepasse ? "text" : "password"}
                                                        id="confirmationMotdepasse"
                                                        name="confirmationMotdepasse"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none pr-10"
                                                        placeholder="Confirmez votre nouveau mot de passe"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                        onClick={() => setMontrerConfirmationMotdepasse(!montrerConfirmationMotdepasse)}
                                                    >
                                                        <FontAwesomeIcon 
                                                            icon={montrerConfirmationMotdepasse ? faEyeSlash : faEye} 
                                                            className="text-gray-400 hover:text-gray-600"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    disabled={loadingPassword}
                                                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2 rounded-lg flex items-center justify-center min-w-[180px]"
                                                >
                                                    {loadingPassword ? (
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                    ) : (
                                                        'Modifier le mot de passe'
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-content">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800 mb-6">Notifications</h2>
                                <p>Contenu des notifications à implémenter</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'privacy' && (
                        <div className="settings-content">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800 mb-6">Confidentialité</h2>
                                <p>Contenu de la confidentialité à implémenter</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EtudiantParametres;