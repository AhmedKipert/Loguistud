import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faUser, faBirthdayCake, faPhone, faMapMarkerAlt,
    faUniversity, faBook, faLayerGroup, faCalendarAlt,
    faLock, faEnvelope, faEye, faEyeSlash, faArrowLeft,
    faArrowRight, faCamera, faGraduationCap, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { inscriptionEtudiant } from '../../services/etudiantService';
import { ConfirmationEmail } from '../../components/autres/ConfirmationEmail';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../autres/Navbar';

export const InscriptionEtudiant = () => {
    // Gestion des etapes du formulaire
    const [etapeActuelle, setEtapeActuelle] = useState(1);
    const [inscriptionReussie, setInscriptionReussie] = useState(false);
    const nombreTotalEtapes = 3;

    const navigate = useNavigate();

    // Donnees du formulaire
    const [formData, setFormData] = useState({
        photoProfil: null,
        prenom: 'Ahmed',
        nom: 'Kipertino',
        age: '29',
        telephone: '622402638',
        adresse: 'Entag-NOrd',
        universite: 'Gamal abder naser',
        filiere: 'Sociologie',
        niveau: 'Licence 3',
        annee_etude: '2024-2025',
        email: 'workahmedkipertino@gmail.com',
        motdepasse: 'Fkipert33',
        confirmation: 'Fkipert33',
        conditions: true
    });

    // Etats pour l'interface
    const [montrerMotDePasse, setMontrerMotDePasse] = useState(false);
    const [montrerConfirmation, setMontrerConfirmation] = useState(false);
    const [enCoursEnvoi, setEnCoursEnvoi] = useState(false);
    const [texteBouton, setTexteBouton] = useState('Créer mon compte');
    const [imageApercu, setImageApercu] = useState(null);

    // Gestion des changements dans les champs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Gestion de la photo de profil
    const handlePhotoChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, photoProfil: file }));

            // Creer un apercu de l'image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageApercu(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Changer d'etape
    const changerEtape = (nouvelleEtape) => {
        if (validerEtape(etapeActuelle)) {
            setEtapeActuelle(nouvelleEtape);
            majBarreProgression();
        }
    };

    // Valider les champs avant de changer d'etape
    const validerEtape = (etape) => {
        let valide = true;

        if (etape === 1) {
            const champsObligatoires = ['prenom', 'nom', 'age', 'telephone'];
            champsObligatoires.forEach(champ => {
                if (!formData[champ].trim()) {
                    valide = false;
                }
            });
        } else if (etape === 2) {
            if (!formData.universite || !formData.filiere) {
                valide = false;
            }
        }

        if (!valide) {
            alert('Veuillez remplir tous les champs obligatoires avant de continuer.');
        }

        return valide;
    };

    // Mettre a jour la barre de progression
    const majBarreProgression = () => {
        const progression = (etapeActuelle / nombreTotalEtapes) * 100;
        document.getElementById('formProgressBar').style.width = `${progression}%`;
    };

    // Soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation finale
        if (formData.motdepasse !== formData.confirmation) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        if (formData.motdepasse.length < 8) {
            alert('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        if (!formData.conditions) {
            alert('Vous devez accepter les conditions générales');
            return;
        }

        setEnCoursEnvoi(true);
        setTexteBouton('Création en cours...');

        // Requête API
        const reponse = await inscriptionEtudiant(formData);

        if (reponse.success) {
            // alert(reponse.message)
            setInscriptionReussie(true);
            setEnCoursEnvoi(false);
            navigate('/confirmation')
            setTexteBouton('Créer mon compte');
            
        } else {
            alert(reponse.message);
            setEnCoursEnvoi(false);
            setTexteBouton('Créer mon compte');
        }
    };

    // Liste des universites
    const universites = [
        "Universite Gamal Abdel Nasser de Conakry (UGANC)",
        "Universite General Lansana Conte de Sonfonia",
        "Universite de Kindia",
        "Universite Julius Nyerere de Kankan",
        "Universite de Labe",
        "Autre (preciser)"
    ];

    // Liste des niveaux d'etude
    const niveauxEtude = [
        "Licence 1",
        "Licence 2",
        "Licence 3",
        "Master 1",
        "Master 2",
        "Doctorat"
    ];

    if (inscriptionReussie) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Message de confirmation d'email */}
                <ConfirmationEmail prenom={formData.prenom} nom={formData.nom} />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* En-tete */}
            <Navbar/>

            {/* Contenu principal */}
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden animate-form">
                        {/* Barre de progression */}
                        <div className="progress-bar h-1 bg-gray-200">
                            <div id="formProgressBar" className="h-full bg-gradient-to-r from-[#3CB371] to-[#2C5CD5] transition-all duration-400" style={{ width: '33%' }}></div>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                    <span className="text-[#2C5CD5]">Créer</span> votre compte étudiant
                                </h1>
                                <p className="text-gray-600">
                                    Rejoignez la communaute LoguiStud et trouvez le logement parfait pour vos études.
                                </p>
                            </div>

                            {/* Indicateur d'etapes */}
                            <div className="flex items-center justify-between mb-8 px-4">
                                <div className="flex items-center">
                                    {[1, 2, 3].map((etape) => (
                                        <React.Fragment key={etape}>
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mx-1 ${etape <= etapeActuelle ? 'bg-[#2C5CD5] text-white' : 'bg-gray-200 text-gray-600'}`}
                                            >
                                                {etape}
                                            </div>
                                            {etape < 3 && (
                                                <div className={`h-1 w-12 mx-1 ${etape < etapeActuelle ? 'bg-[#2C5CD5]' : 'bg-gray-200'}`}></div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Etape 1: Informations personnelles */}
                                <div className={`form-slide ${etapeActuelle === 1 ? 'block' : 'hidden'}`}>
                                    {/* Photo de profil */}
                                    <div className="flex flex-col items-center mb-6">
                                        <div className="relative mb-4">
                                            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
                                                {imageApercu ? (
                                                    <img src={imageApercu} alt="Profil" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <FontAwesomeIcon icon={faUser} className="text-3xl" />
                                                    </div>
                                                )}
                                            </div>
                                            <label
                                                htmlFor="photoProfil"
                                                className="absolute bottom-0 right-0 bg-[#3CB371] text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-[#2C5CD5] transition"
                                            >
                                                <FontAwesomeIcon icon={faCamera} className="text-sm" />
                                                <input
                                                    type="file"
                                                    id="photoProfil"
                                                    name="photoProfil"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handlePhotoChange}
                                                // ref={photoInputRef}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-sm text-gray-500 text-center">Ajoutez une photo pour votre profil (optionnel)</p>
                                    </div>

                                    {/* Informations personnelles */}
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-[#2C5CD5]/10 text-[#2C5CD5] flex items-center justify-center mr-2">
                                                <FontAwesomeIcon icon={faUser} className="text-sm" />
                                            </div>
                                            Informations personnelles
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="prenom"
                                                        name="prenom"
                                                        required
                                                        value={formData.prenom}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none"
                                                        placeholder="Votre prenom"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="nom"
                                                        name="nom"
                                                        required
                                                        value={formData.nom}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none"
                                                        placeholder="Votre nom"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="age"
                                                        name="age"
                                                        required
                                                        value={formData.age}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none"
                                                        placeholder="Votre age"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <FontAwesomeIcon icon={faBirthdayCake} className="text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        id="telephone"
                                                        name="telephone"
                                                        required
                                                        value={formData.telephone}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none"
                                                        placeholder="Votre numero"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="adresse"
                                                    name="adresse"
                                                    value={formData.adresse}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none"
                                                    placeholder="Votre adresse (optionnel)"
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-8">
                                        <button
                                            type="button"
                                            onClick={() => changerEtape(2)}
                                            className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition hover:-translate-y-1"
                                        >
                                            Suivant <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                                        </button>
                                    </div>
                                </div>

                                {/* Etape 2: Informations academiques */}
                                <div className={`form-slide ${etapeActuelle === 2 ? 'block' : 'hidden'}`}>
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-[#3CB371]/10 text-[#3CB371] flex items-center justify-center mr-2">
                                                <FontAwesomeIcon icon={faGraduationCap} className="text-sm" />
                                            </div>
                                            Informations academiques
                                        </h2>

                                        <div>
                                            <label htmlFor="universite" className="block text-sm font-medium text-gray-700 mb-1">Universite *</label>
                                            <div className="relative">
                                                <select
                                                    id="universite"
                                                    name="universite"
                                                    required
                                                    value={formData.universite}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none appearance-none"
                                                >
                                                    <option value="" disabled selected>Selectionnez votre universite</option>
                                                    {universites.map((univ, index) => (
                                                        <option key={index} value={univ}>{univ}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <FontAwesomeIcon icon={faUniversity} className="text-gray-400" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="filiere" className="block text-sm font-medium text-gray-700 mb-1">Filière *</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        id="filiere"
                                                        name="filiere"
                                                        required
                                                        value={formData.filiere}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none"
                                                        placeholder="Votre filière d'étude"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <FontAwesomeIcon icon={faBook} className="text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="niveau" className="block text-sm font-medium text-gray-700 mb-1">Niveau d'étude</label>
                                                <div className="relative">
                                                    <select
                                                        id="niveau"
                                                        name="niveau"
                                                        value={formData.niveau}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none appearance-none"
                                                    >
                                                        <option value="" selected>Sélectionnez votre niveau</option>
                                                        {niveauxEtude.map((niveau, index) => (
                                                            <option key={index} value={niveau}>{niveau}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <FontAwesomeIcon icon={faLayerGroup} className="text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="annee_etude" className="block text-sm font-medium text-gray-700 mb-1">Année d'étude</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="annee_etude"
                                                    name="annee_etude"
                                                    value={formData.annee_etude}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none"
                                                    placeholder="Ex: 2023-2024"
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-8">
                                        <button
                                            type="button"
                                            onClick={() => changerEtape(1)}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition hover:-translate-y-1"
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Précédent
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => changerEtape(3)}
                                            className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition hover:-translate-y-1"
                                        >
                                            Suivant <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                                        </button>
                                    </div>
                                </div>

                                {/* Etape 3: Informations de connexion */}
                                <div className={`form-slide ${etapeActuelle === 3 ? 'block' : 'hidden'}`}>
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                            <div className="w-6 h-6 rounded-full bg-[#F6A34A]/10 text-[#F6A34A] flex items-center justify-center mr-2">
                                                <FontAwesomeIcon icon={faLock} className="text-sm" />
                                            </div>
                                            Informations de connexion
                                        </h2>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                            <div className="relative">
                                                <input
                                                    // type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none"
                                                    placeholder="Votre adresse email"
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                                </div>
                                            </div>
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
                                            <div className="mt-1 text-xs text-gray-500">
                                                Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700 mb-1">Confirmation *</label>
                                            <div className="relative">
                                                <input
                                                    type={montrerConfirmation ? "text" : "password"}
                                                    id="confirmation"
                                                    name="confirmation"
                                                    required
                                                    value={formData.confirmation}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none pr-10"
                                                    placeholder="Confirmez votre mot de passe"
                                                />
                                                <div
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                                    onClick={() => setMontrerConfirmation(!montrerConfirmation)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={montrerConfirmation ? faEye : faEyeSlash}
                                                        className="text-gray-400 hover:text-[#2C5CD5]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start pt-2">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="conditions"
                                                    name="conditions"
                                                    type="checkbox"
                                                    required
                                                    checked={formData.conditions}
                                                    onChange={handleChange}
                                                    className="w-4 h-4 text-[#2C5CD5] border-gray-300 rounded focus:ring-[#2C5CD5]"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="conditions" className="font-medium text-gray-700">
                                                    J'accepte les <Link to="/conditions" className="text-[#2C5CD5] hover:underline">conditions générales</Link> et la
                                                    <Link to="/politiques" className="text-[#2C5CD5] hover:underline"> politique de confidentialité</Link> *
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-8">
                                        <button
                                            type="button"
                                            onClick={() => changerEtape(2)}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition hover:-translate-y-1"
                                        >
                                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Précédent
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition hover:-translate-y-1 flex items-center"
                                            disabled={enCoursEnvoi}
                                        >
                                            <span>{texteBouton}</span>
                                            {enCoursEnvoi && <FontAwesomeIcon icon={faSpinner} className="animate-spin ml-2" />}
                                        </button>
                                    </div>

                                    <div className="text-center text-sm text-gray-600 mt-4">
                                        Déja membre ? <a href="/connexion" className="text-[#2C5CD5] font-medium hover:underline">Connectez-vous ici</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Pied de page */}

        </div>
    );
};