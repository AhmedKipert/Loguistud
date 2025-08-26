import React, { useEffect, useState } from 'react';
import { faUserCircle, faEye, faEyeSlash, faGraduationCap, faCamera, faExclamationTriangle, faShieldAlt, faLock, faHistory, faBars, faBell, faPencilAlt, faTrashAlt, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOutletContext } from 'react-router-dom';

const ParametreCompte = () => {
    const [activeTab, setActiveTab] = useState('security');
    const [profileImage, setProfileImage] = useState('http://localhost:3002/uploads/photosProfiles/');
    const [montrerMotDePasse, setMontrerMotDePasse] = useState(false);
    
    const userData = useOutletContext();

    const [formData, setFormData] = useState({
        firstname: 'Mamadou',
        lastname: 'Diallo',
        email: 'm.diallo@student.uganc.edu.gn',
        phone: '+224 123 456 789',
        university: 'UGANC - Université Gamal Abdel Nasser',
        field: 'Génie Logiciel',
        level: 'Licence 3',
        twoFactorAuth: false,
        photoProfil: '',
        motdepasse: ''
    });

    useEffect(() => {
        if (userData) {
            setProfileImage('http://localhost:3002/uploads/photosProfiles/' + userData.photoProfil || '');
            setFormData(prev => (
                {
                    ...prev, firstname: userData.prenom || '',
                    lastname: userData.nom || '',
                    email: userData.email || '',
                    phone: userData.telephone,
                    university: userData.universite || '',
                    field: userData.filiere || '',
                    level: userData.niveau || '',
                    motdepasse: userData.motdepasse ||''
                }))
        }
    }, [userData]);

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

    const handleToggleChange = (e) => {
        const { checked } = e.target;
        setFormData(prev => ({
            ...prev,
            twoFactorAuth: checked
        }));
    };

    const handleImageUpload = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                setProfileImage(event.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    // Gestion des changements dans les champs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici vous ajouteriez la logique pour sauvegarder les données
        console.log('Form submitted', formData);
    };

    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* Contenu principal */}
            <main className="flex-1 overflow-x-hidden">

                {/* Contenu des paramètres */}
                <div className="p-6">
                    <h1 className="text-xl font-bold text-gray-800">Paramètres du compte</h1>
                    {/* Navigation par onglets */}
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

                    {/* Onglet Sécurité */}
                    {activeTab === 'security' && (
                        <div className="settings-content">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <div className="settings-card bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200 hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                            <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600 mr-2" />
                                            Sécurité du compte
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-6">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">L'email est utilisé pour la connexion et les notifications</p>
                                            </div>

                                            <div>
                                                <label htmlFor="motdepasse" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                                                <div className="relative">
                                                    <input
                                                        type={montrerMotDePasse ? "text" : "password"}
                                                        id="motdepasse"
                                                        name="motdepasse"
                                                        required
                                                        value={formData.motdepasse}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none pr-10"
                                                        placeholder="Creez un mot de passe"
                                                    />
                                                    <div
                                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                                        onClick={() => setMontrerMotDePasse(!montrerMotDePasse)}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={montrerMotDePasse ? faEye : faEyeSlash}
                                                            className="text-gray-400 hover:text-[#2C5CD5]"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-500 mb-3">
                                                    Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg mr-3">
                                                    Annuler
                                                </button>
                                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                                                    Enregistrer
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="settings-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                            <FontAwesomeIcon icon={faLock} className="text-green-500 mr-2" />
                                            Niveau de sécurité
                                        </h2>

                                        <div className="mb-4">
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium">Fort</span>
                                                <span className="text-sm text-gray-500">85%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-3" />
                                                <div>
                                                    <h3 className="font-medium">Mot de passe fort</h3>
                                                    <p className="text-sm text-gray-500">Votre mot de passe contient des majuscules, chiffres et caractères spéciaux</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500 mt-1 mr-3" />
                                                <div>
                                                    <h3 className="font-medium">Authentification à deux facteurs</h3>
                                                    <p className="text-sm text-gray-500">Activez la 2FA pour augmenter votre sécurité</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start">
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-3" />
                                                <div>
                                                    <h3 className="font-medium">Email vérifié</h3>
                                                    <p className="text-sm text-gray-500">Votre adresse email est confirmée</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="settings-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                            <FontAwesomeIcon icon={faHistory} className="text-yellow-500 mr-2" />
                                            Historique de sécurité
                                        </h2>

                                        <div className="space-y-4">
                                            <div className="border-l-4 border-green-500 pl-4 py-1">
                                                <h3 className="font-medium">Connexion réussie</h3>
                                                <p className="text-sm text-gray-500">Aujourd'hui, 10:24 • Chrome sur Windows</p>
                                            </div>

                                            <div className="border-l-4 border-green-500 pl-4 py-1">
                                                <h3 className="font-medium">Mot de passe changé</h3>
                                                <p className="text-sm text-gray-500">12/03/2024, 14:30</p>
                                            </div>

                                            <div className="border-l-4 border-red-500 pl-4 py-1">
                                                <h3 className="font-medium">Tentative de connexion échouée</h3>
                                                <p className="text-sm text-gray-500">10/03/2024, 03:15 • Safari sur iOS</p>
                                            </div>

                                            <div className="border-l-4 border-green-500 pl-4 py-1">
                                                <h3 className="font-medium">Email vérifié</h3>
                                                <p className="text-sm text-gray-500">05/02/2024, 11:45</p>
                                            </div>
                                        </div>

                                        <button className="w-full mt-4 text-blue-600 hover:underline text-sm font-medium">
                                            Voir tout l'historique
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Onglet Notifications */}
                    {activeTab === 'notifications' && (
                        <div className="settings-content">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800 mb-6">Notifications</h2>
                                <p>Contenu des notifications à implémenter</p>
                            </div>
                        </div>
                    )}

                    {/* Onglet Confidentialité */}
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

            {/* Styles intégrés */}
            <style>{`
        .tab-button {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .tab-button:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background-color: #2C5CD5;
          transition: width 0.3s ease;
        }
        
        .tab-button.active:after {
          width: 100%;
        }
        
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 24px;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }
        
        input:checked + .slider {
          background-color: #2C5CD5;
        }
        
        input:checked + .slider:before {
          transform: translateX(26px);
        }
      `}</style>
        </div>
    );
};

export default ParametreCompte;