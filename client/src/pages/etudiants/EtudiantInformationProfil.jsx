import React, { useContext, useEffect, useState } from 'react';
import { faUserCircle, faGraduationCap, faCamera, faExclamationTriangle, faShieldAlt, faLock, faHistory, faBars, faBell, faPencilAlt, faTrashAlt, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOutletContext } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const InformationProfil = () => {
    const [activePage, setActivePage] = useState('main');
    const [activeTab, setActiveTab] = useState('account');
    const [profileImage, setProfileImage] = useState('http://localhost:3002/uploads/photosProfiles/');

    const {user, lien} = useContext(AuthContext);
    const userData = user.compte;

    const [formData, setFormData] = useState({
        firstname: 'Mamadou',
        lastname: 'Diallo',
        email: 'm.diallo@student.uganc.edu.gn',
        phone: '+224 123 456 789',
        university: 'UGANC - Université Gamal Abdel Nasser',
        field: 'Génie Logiciel',
        level: 'Licence 3',
        twoFactorAuth: false,
        photoProfil: ''
    });

    useEffect(() => {
        if (userData) {
            setProfileImage(`${lien}/${userData.photoProfil}` || '');
            setFormData(prev => (
                {
                    ...prev, firstname: userData.prenom || '',
                    lastname: userData.nom || '',
                    email: userData.email || '',
                    phone: userData.telephone,
                    university: userData.universite || '',
                    field: userData.filiere || '',
                    level: userData.niveau || ''
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

    // const handleToggleChange = (e) => {
    //     const { checked } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         twoFactorAuth: checked
    //     }));
    // };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici vous ajouteriez la logique pour sauvegarder les données
        console.log('Form submitted', formData);
    };

    return (
        <div className="min-h-screen flex bg-gray-50">

            {/* Contenu principal */}
            <main className="flex-1 overflow-x-hidden">
                {/* En-tête */}

                {/* Contenu des paramètres */}
                <div className="p-6">
                    <h1 className="text-xl font-bold text-gray-800 mb-3">Modifier mes informations</h1>
                    {/* Navigation par onglets */}
                    {/* <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                        <button
                            onClick={() => handleTabChange('account')}
                            className={`tab-button px-6 py-3 whitespace-nowrap font-medium ${activeTab === 'account' ? 'text-gray-800 active' : 'text-gray-600'}`}
                        >
                            Compte
                        </button>
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
                    </div> */}

                    <div className="settings-content">
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">

                            <div className="lg:col-span-2">

                                {/* Section droite - Photo de profil */}
                                <div>
                                    <div className="settings-card bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6 hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                            <FontAwesomeIcon icon={faCamera} className="text-orange-400 mr-2" />
                                            Photo de profil
                                        </h2>

                                        <div className="flex flex-col items-center">
                                            <div className="relative mb-4">
                                                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
                                                    <img src={profileImage} alt="Photo de profil" className="w-full h-full object-cover" />
                                                </div>
                                                <label htmlFor="profile-photo" className="absolute bottom-0 right-0 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700">
                                                    <FontAwesomeIcon icon={faPencilAlt} className="text-sm" />
                                                    <input
                                                        type="file"
                                                        id="profile-photo"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                    />
                                                </label>
                                            </div>

                                            <p className="text-sm text-gray-500 text-center mb-4">
                                                Taille maximale : 2MB <br />
                                                Formats : JPG, PNG
                                            </p>

                                            <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                                                <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Supprimer la photo
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200 hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                        <FontAwesomeIcon icon={faUserCircle} className="text-blue-600 mr-2" />
                                        Informations personnelles
                                    </h2>

                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                                <input
                                                    type="text"
                                                    id="firstname"
                                                    value={formData.firstname}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                                <input
                                                    type="text"
                                                    id="lastname"
                                                    value={formData.lastname}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            />
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
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                        <FontAwesomeIcon icon={faGraduationCap} className="text-green-500 mr-2" />
                                        Informations académiques
                                    </h2>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-6">
                                            <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">Université</label>
                                            <select
                                                id="university"
                                                value={formData.university}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                            >
                                                <option>UGANC - Université Gamal Abdel Nasser</option>
                                                <option>Université Général Lansana Conté</option>
                                                <option>Université de Kindia</option>
                                                <option>Université Julius Nyerere</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-2">Filière</label>
                                                <input
                                                    type="text"
                                                    id="field"
                                                    value={formData.field}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                                                <select
                                                    id="level"
                                                    value={formData.level}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                                >
                                                    <option>Licence 3</option>
                                                    <option>Licence 2</option>
                                                    <option>Licence 1</option>
                                                    <option>Master 1</option>
                                                    <option>Master 2</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg mr-3">
                                                Annuler
                                            </button>
                                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
                                                Mettre à jour
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>


                        </div>
                    </div>
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

export default InformationProfil;