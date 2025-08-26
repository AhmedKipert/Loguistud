import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faUser, faEnvelope, faPhone,
  faMapMarkerAlt, faLock, faCheckCircle,
  faInfoCircle, faArrowLeft, faArrowRight,
  faEye, faEyeSlash, faCheck, faCircle,
  faCamera, faUserGraduate, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { inscriptionProprietaire } from '../../services/proprietaireService';
import { useNavigate } from 'react-router-dom'
import Navbar from '../autres/Navbar';
import Footer from '../../components/Footer';
import SmallFooter from '../../components/SmallFooter';
const InscriptionProprietaire = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [voirMotdepasse, setVoirMotdepasse] = useState(false);
  const [voirConfirmation, setVoirConfirmation] = useState(false);
  const [message, setMessage] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmation, setConfirmation] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const totalSlides = 3;

  const [formData, setFormData] = useState({
    photoProfil: null,
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    motdepasse: '',
    confirmationMotdepasse: '',
    conditions: false
  });

  // Gestion de la photo de profil
  const handlePhotoChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      setFormData(prev => ({ ...prev, photoProfil: file }))
      const reader = new FileReader();

      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setVoirMotdepasse(!voirMotdepasse);
  };

  const toggleConfirmationVisibility = () => {
    setVoirConfirmation(!voirConfirmation);
  };

  // Validation du mot de passe en temps réel
  useEffect(() => {
    if (formData.motdepasse) {
      checkPasswordStrength(formData.motdepasse);
    }
  }, [formData]);

  useEffect(() => {
    if (formData.motdepasse && formData.confirmationMotdepasse) {
      setPasswordMatch(formData.motdepasse === formData.confirmationMotdepasse);
    } else {
      setPasswordMatch(null);
    }
  }, [formData]);

  const checkPasswordStrength = (pwd) => {
    const newStrength = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    };
    setPasswordStrength(newStrength);
  };

  // Navigation entre les slides
  const nextSlide = (current) => {
    // Validation avant de passer à la slide suivante
    if (current === 1) {
      // Valider les champs obligatoires de la slide 1
      const requiredFields = ['prenom', 'nom', 'email', 'telephone', 'adresse'];
      const isValid = requiredFields.every(field => {
        const value = document.getElementById(field)?.value.trim();
        return value !== '';
      });

      if (!isValid) {
        alert('Veuillez remplir tous les champs obligatoires avant de continuer.');
        return;
      }
    } else if (current === 2) {
      // Valider le mot de passe
      if (formData.motdepasse.length < 8) {
        alert('Votre mot de passe doit contenir au moins 8 caractères.');
        return;
      }

      if (formData.motdepasse !== formData.confirmationMotdepasse) {
        alert('Les mots de passe ne correspondent pas.');
        return;
      }
    }

    if (current < totalSlides) {
      setCurrentSlide(current + 1);
      updateProgressBar(current + 1);
    }
  };

  const prevSlide = (current) => {
    if (current > 1) {
      setCurrentSlide(current - 1);
      updateProgressBar(current - 1);
    }
  };

  const updateProgressBar = (slide) => {
    const progress = (slide / totalSlides) * 100;
    document.getElementById('formProgressBar').style.width = `${progress}%`;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => (
      { ...prev, [name]: type === 'checkbox' ? checked : value }
    ));
  }

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage('');

    // Validation finale
    if (formData.motdepasse !== formData.confirmationMotdepasse) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const isStrongPassword = formData.motdepasse.length >= 8 &&
      /[A-Z]/.test(formData.motdepasse) &&
      /[0-9]/.test(formData.motdepasse) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.motdepasse);

    if (!isStrongPassword) {
      alert('Veuillez choisir un mot de passe plus fort (8 caractères minimum avec majuscule, chiffre et caractère spécial)');
      return;
    }

    if (!formData.conditions) {
      alert('Vous devez accepter les conditions générales pour continuer');
      return;
    }

    // Simulation d'envoi
    setIsSubmitting(true);

    inscriptionProprietaire(formData)
      .then(data => {
        setIsSubmitting(false);
        if (data.success) return navigate('/verification');
        else setMessage(data.message);
      })
      .catch(error => {
        setIsSubmitting(false);
        setMessage(error.message);
      });
  };


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* En-tête */}
      <Navbar />

      {/* Contenu principal */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden animate-form">
            {/* Barre de progression */}
            <div className="progress-bar" id="formProgressBar" style={{ width: `${(currentSlide / totalSlides) * 100}%` }}></div>

            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  <span className="text-[#2C5CD5]">Créer</span> votre compte propriétaire
                </h1>
                <p className="text-gray-600">
                  Publiez vos annonces et connectez-vous avec des étudiants recherchant un logement.
                </p>
              </div>

              {/* Indicateur d'étapes */}
              <div className="flex items-center justify-between mb-8 px-4">
                <div className="flex items-center">
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div
                        className={`step-indicator ${currentSlide >= step ? 'active' : 'inactive'}`}
                      >
                        {step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`step-line ${currentSlide > step ? 'active' : ''}`}
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Slide 1: Informations personnelles */}
                <div className={`form-slide ${currentSlide === 1 ? 'active' : ''}`} id="slide1">
                  {/* Section Photo de profil */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
                        {photoPreview ? (
                          <img src={photoPreview} alt="Profil" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FontAwesomeIcon icon={faUser} className="text-3xl" />
                          </div>
                        )}
                      </div>
                      <label htmlFor="photoProfil" className="absolute bottom-0 right-0 bg-[#3CB371] text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-[#2C5CD5] transition">
                        <FontAwesomeIcon icon={faCamera} className="text-sm" />
                        <input
                          type="file"
                          id="photoProfil"
                          name="photoProfil"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 text-center">Ajoutez une photo pour votre profil (optionnel)</p>
                  </div>

                  {/* Section Informations personnelles */}
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
                            onChange={handleChange}
                            value={formData.prenom}
                            type="text"
                            id="prenom"
                            name="prenom"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus focus:outline-none"
                            placeholder="Votre prénom"
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
                            onChange={handleChange}
                            value={formData.nom}
                            type="text"
                            id="nom"
                            name="nom"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus focus:outline-none"
                            placeholder="Votre nom"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <div className="relative">
                        <input
                          onChange={handleChange}
                          value={formData.email}
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus focus:outline-none"
                          placeholder="Votre adresse email"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                        <div className="relative">
                          <input
                            onChange={handleChange}
                            value={formData.telephone}
                            type="tel"
                            id="telephone"
                            name="telephone"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus focus:outline-none"
                            placeholder="Votre numéro"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
                        <div className="relative">
                          <input
                            onChange={handleChange}
                            value={formData.adresse}
                            type="text"
                            id="adresse"
                            name="adresse"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus focus:outline-none"
                            placeholder="Votre adresse"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      type="button"
                      onClick={() => nextSlide(1)}
                      className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition btn-hover"
                    >
                      Suivant <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>
                  </div>
                </div>

                {/* Slide 2: Informations de connexion */}
                <div className={`form-slide ${currentSlide === 2 ? 'active' : ''}`} id="slide2">
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-[#F6A34A]/10 text-[#F6A34A] flex items-center justify-center mr-2">
                        <FontAwesomeIcon icon={faLock} className="text-sm" />
                      </div>
                      Sécurité du compte
                    </h2>

                    <div>
                      <label htmlFor="motdepasse" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                      <div className="relative">
                        <input
                          type={voirMotdepasse ? "text" : "password"}
                          id="motdepasse"
                          name="motdepasse"
                          required
                          value={formData.motdepasse}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg input-focus focus:outline-none pr-10"
                          placeholder="Créez un mot de passe sécurisé"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <FontAwesomeIcon
                            icon={voirMotdepasse ? faEye : faEyeSlash}
                            className="text-gray-400 cursor-pointer password-toggle"
                            onClick={togglePasswordVisibility}
                          />
                        </div>
                      </div>
                      <div className="password-strength mt-2">
                        <div
                          className={`password-strength-bar ${formData.motdepasse.length >= 8 && passwordStrength.uppercase && passwordStrength.number && passwordStrength.special ? 'strength-strong' :
                            formData.motdepasse.length >= 8 && (passwordStrength.uppercase || passwordStrength.number || passwordStrength.special) ? 'strength-medium' :
                              formData.motdepasse.length > 0 ? 'strength-weak' : ''
                            }`}
                        ></div>
                      </div>
                      <div className="password-requirements">
                        <div className={`requirement ${formData.motdepasse.length >= 8 ? 'valid' : 'invalid'}`}>
                          <FontAwesomeIcon icon={formData.motdepasse.length >= 8 ? faCheck : faCircle} className="mr-1 text-xs" />
                          <span>Minimum 8 caractères</span>
                        </div>
                        <div className={`requirement ${passwordStrength.uppercase ? 'valid' : 'invalid'}`}>
                          <FontAwesomeIcon icon={passwordStrength.uppercase ? faCheck : faCircle} className="mr-1 text-xs" />
                          <span>Au moins une majuscule</span>
                        </div>
                        <div className={`requirement ${passwordStrength.number ? 'valid' : 'invalid'}`}>
                          <FontAwesomeIcon icon={passwordStrength.number ? faCheck : faCircle} className="mr-1 text-xs" />
                          <span>Au moins un chiffre</span>
                        </div>
                        <div className={`requirement ${passwordStrength.special ? 'valid' : 'invalid'}`}>
                          <FontAwesomeIcon icon={passwordStrength.special ? faCheck : faCircle} className="mr-1 text-xs" />
                          <span>Au moins un caractère spécial</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="confirmation" className="block text-sm font-medium text-gray-700 mb-1">Confirmation *</label>
                      <div className="relative">
                        <input
                          type={voirConfirmation ? "text" : "password"}
                          id="confirmation"
                          name="confirmationMotdepasse"
                          required
                          value={formData.confirmationMotdepasse}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border ${passwordMatch === null ? 'border-gray-300' :
                            passwordMatch ? 'border-green-500' : 'border-red-500'
                            } rounded-lg input-focus focus:outline-none pr-10`}
                          placeholder="Confirmez votre mot de passe"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <FontAwesomeIcon
                            icon={voirConfirmation ? faEye : faEyeSlash}
                            className="text-gray-400 cursor-pointer password-toggle"
                            onClick={toggleConfirmationVisibility}
                          />
                        </div>
                      </div>
                      {passwordMatch !== null && (
                        <div className={`text-xs mt-1 ${passwordMatch ? 'text-green-500' : 'text-red-500'}`}>
                          <FontAwesomeIcon
                            icon={passwordMatch ? faCheckCircle : faCircle}
                            className="mr-1"
                          />
                          <span>
                            {passwordMatch ? 'Les mots de passe correspondent' : 'Les mots de passe ne correspondent pas'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={() => prevSlide(2)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition btn-hover"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Précédent
                    </button>
                    <button
                      type="button"
                      onClick={() => nextSlide(2)}
                      className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition btn-hover"
                    >
                      Suivant <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                    </button>
                  </div>
                </div>

                {/* Slide 3: Conditions et finalisation */}
                <div className={`form-slide ${currentSlide === 3 ? 'active' : ''}`} id="slide3">
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                      <div className="w-6 h-6 rounded-full bg-[#3CB371]/10 text-[#3CB371] flex items-center justify-center mr-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-sm" />
                      </div>
                      Finalisation
                    </h2>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                        Informations importantes pour les propriétaires
                      </h3>
                      <ul className="text-sm text-blue-700 space-y-2 list-disc pl-5">
                        <li>En tant que propriétaire, vous pourrez publier jusqu'à 3 annonces gratuitement</li>
                        <li>Nous vérifions manuellement chaque nouveau compte propriétaire pour assurer la sécurité des étudiants</li>
                        <li>Vous recevrez les demandes directement sur votre tableau de bord</li>
                      </ul>
                    </div>

                    <div className="flex items-start pt-2">
                      <div className="flex items-center h-5">
                        <input
                          onChange={handleChange}
                          id="conditions"
                          name="conditions"
                          type="checkbox"
                          value={formData.conditions}
                          required
                          className="w-4 h-4 text-[#2C5CD5] border-gray-300 rounded focus:ring-[#2C5CD5]"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="conditions" className="font-medium text-gray-700">
                          J'accepte les <a href="/conditions" className="text-[#2C5CD5] hover:underline">conditions générales</a> et la
                          <a href="/confidentialite" className="text-[#2C5CD5] hover:underline"> politique de confidentialité</a> *
                        </label>
                      </div>
                    </div>
                    <p className='text-red-500 text-end'>{message}</p>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={() => prevSlide(3)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition btn-hover"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Précédent
                    </button>
                    <button
                      type="submit"
                      className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-6 py-2 rounded-lg font-medium transition btn-hover flex items-center"
                      disabled={isSubmitting}
                    >
                      <span>{isSubmitting ? 'Création en cours...' : 'Créer mon compte'}</span>
                      {isSubmitting && (
                        <FontAwesomeIcon icon={faSpinner} className="fa-spin ml-2" />
                      )}
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-600 mt-4">
                    Déjà membre ? <a href="/connexion" className="text-[#2C5CD5] font-medium hover:underline">Connectez-vous ici</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <SmallFooter />

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-form {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .input-focus:focus {
          border-color: #2C5CD5;
          box-shadow: 0 0 0 3px rgba(44, 92, 213, 0.2);
        }
        
        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 92, 213, 0.2);
        }
        
        .password-toggle:hover {
          color: #2C5CD5;
        }
        
        .progress-bar {
          height: 4px;
          background: linear-gradient(to right, #3CB371, #2C5CD5);
          transition: width 0.4s ease;
        }
        
        /* Styles pour le formulaire en slides */
        .form-slide {
          display: none;
          animation: fadeIn 0.5s ease-out;
        }
        
        .form-slide.active {
          display: block;
        }
        
        .step-indicator {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin: 0 auto;
        }
        
        .step-indicator.active {
          background-color: #2C5CD5;
          color: white;
        }
        
        .step-indicator.inactive {
          background-color: #E5E7EB;
          color: #6B7280;
        }
        
        .step-line {
          flex-grow: 1;
          height: 2px;
          background-color: #E5E7EB;
          margin: 0 8px;
        }
        
        .step-line.active {
          background-color: #2C5CD5;
        }
        
        /* Indicateur de force du mot de passe */
        .password-strength {
          height: 4px;
          width: 100%;
          background-color: #E5E7EB;
          border-radius: 2px;
          margin-top: 4px;
          overflow: hidden;
        }
        
        .password-strength-bar {
          height: 100%;
          width: 0;
          transition: width 0.3s ease, background-color 0.3s ease;
        }
        
        .strength-weak {
          background-color: #EF4444;
          width: 33%;
        }
        
        .strength-medium {
          background-color: #F59E0B;
          width: 66%;
        }
        
        .strength-strong {
          background-color: #10B981;
          width: 100%;
        }
        
        .password-requirements {
          margin-top: 4px;
          font-size: 0.75rem;
          color: #6B7280;
        }
        
        .requirement {
          display: flex;
          align-items: center;
          margin-bottom: 2px;
        }
        
        .requirement i {
          margin-right: 4px;
          font-size: 0.6rem;
        }
        
        .requirement.valid {
          color: #10B981;
        }
        
        .requirement.invalid {
          color: #6B7280;
        }
      `}</style>
    </div>
  );
};

export default InscriptionProprietaire;