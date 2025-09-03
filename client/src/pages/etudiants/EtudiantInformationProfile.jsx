import React, { useContext, useEffect, useState } from 'react';
import { 
  faUser, faBirthdayCake, faPhone, faMapMarkerAlt,
  faUniversity, faBook, faLayerGroup, faCalendarAlt,
  faGraduationCap, faCamera, faPencilAlt, faTrashAlt,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '../../context/AuthContext';
import { editerMesInformations } from '../../services/etudiantService';
import { Toaster, toast } from 'sonner';

const InformationProfil = () => {
  const { user, lien } = useContext(AuthContext);
  const userData = user.compte;

  // Données du formulaire
  const [formData, setFormData] = useState({
    photoProfile: null,
    prenom: '',
    nom: '',
    age: '',
    telephone: '',
    adresse: '',
    universite: '',
    filiere: '',
    niveau: '',
    annee_etude: ''
  });

  // États pour l'interface
  const [enCoursEnvoi, setEnCoursEnvoi] = useState(false);
  const [imageApercu, setImageApercu] = useState(null);

  // Liste des universités
  const universites = [
    "Université Gamal Abdel Nasser de Conakry (UGANC)",
    "Université General Lansana Conte de Sonfonia",
    "Université de Kindia",
    "Université Julius Nyerere de Kankan",
    "Université de Labe",
    "Autre (préciser)"
  ];

  // Liste des niveaux d'étude
  const niveauxEtude = [
    "Licence 1",
    "Licence 2",
    "Licence 3",
    "Master 1",
    "Master 2",
    "Doctorat"
  ];

  useEffect(() => {
    if (userData) {
      setImageApercu(userData.photoProfile ? `${lien}/${userData.photoProfile}` : null);
      setFormData(prev => ({
        ...prev,
        prenom: userData.prenom || '',
        nom: userData.nom || '',
        age: userData.age || '',
        telephone: userData.telephone || '',
        adresse: userData.adresse || '',
        universite: userData.universite || '',
        filiere: userData.filiere || '',
        niveau: userData.niveau || '',
        annee_etude: userData.annee_etude || '',
        photoProfile: userData.photoProfile || null
      }));
    }
  }, [userData, lien]);

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestion de la photo de profil
  const handlePhotoChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, photoProfile: file }));

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageApercu(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Supprimer la photo
  const handleDeletePhoto = () => {
    setFormData(prev => ({ ...prev, photoProfile: null }));
    setImageApercu(null);
  };

  // Soumettre le formulaire
const handleSubmit = async (e) => {
  e.preventDefault();
  setEnCoursEnvoi(true);

  // Créer un FormData pour envoyer les données + fichier
  const formDataToSend = new FormData();
  
  // Ajouter tous les champs texte
  formDataToSend.append('prenom', formData.prenom);
  formDataToSend.append('nom', formData.nom);
  formDataToSend.append('age', formData.age);
  formDataToSend.append('telephone', formData.telephone);
  formDataToSend.append('adresse', formData.adresse);
  formDataToSend.append('universite', formData.universite);
  formDataToSend.append('filiere', formData.filiere);
  formDataToSend.append('niveau', formData.niveau);
  formDataToSend.append('annee_etude', formData.annee_etude);
  
  // Ajouter la photo seulement si elle a été modifiée
  if (formData.photoProfile instanceof File) {
    formDataToSend.append('photoProfile', formData.photoProfile);
  }

  const res = await editerMesInformations(formDataToSend);
  if (res.success) {
    toast.success('Informations personnelles', {
      description: res.message
    });
  } else {
    toast.error('Informations personnelles', {
      description: res.message
    });
  }
  setEnCoursEnvoi(false);
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Modifier mes informations
        </h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section Photo de profil */}
              <div className="flex flex-col items-center mb-8">
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
                    htmlFor="photoProfile"
                    className="absolute bottom-0 right-0 bg-[#3CB371] text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-[#2C5CD5] transition"
                  >
                    <FontAwesomeIcon icon={faCamera} className="text-sm" />
                    <input
                      type="file"
                      id="photoProfile"
                      name="photoProfile"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 text-center mb-2">
                  Taille maximale : 2MB • Formats : JPG, PNG
                </p>
                <button
                  type="button"
                  onClick={handleDeletePhoto}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Supprimer la photo
                </button>
              </div>

              {/* Section Informations personnelles */}
              <div className="space-y-6">
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
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Âge *</label>
                    <div className="relative">
                      <input
                        type="number"
                        id="age"
                        name="age"
                        required
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none"
                        placeholder="Votre âge"
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
                        placeholder="Votre numéro"
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

              {/* Section Informations académiques */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-[#3CB371]/10 text-[#3CB371] flex items-center justify-center mr-2">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-sm" />
                  </div>
                  Informations académiques
                </h2>

                <div>
                  <label htmlFor="universite" className="block text-sm font-medium text-gray-700 mb-1">Université *</label>
                  <div className="relative">
                    <select
                      id="universite"
                      name="universite"
                      required
                      value={formData.universite}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#2C5CD5] focus:outline-none appearance-none"
                    >
                      <option value="">Sélectionnez votre université</option>
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
                        <option value="">Sélectionnez votre niveau</option>
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

              {/* Bouton de soumission */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-[#2C5CD5] hover:bg-[#2351C0] text-white px-8 py-3 rounded-lg font-medium transition hover:-translate-y-1 flex items-center"
                  disabled={enCoursEnvoi}
                >
                  <span>{enCoursEnvoi ? 'Mise à jour en cours...' : 'Mettre à jour'}</span>
                  {enCoursEnvoi && <FontAwesomeIcon icon={faSpinner} className="animate-spin ml-2" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster position='bottom-right' richColors />
    </div>
  );
};

export default InformationProfil;