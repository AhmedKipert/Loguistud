import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faCheck, faArrowRight, faArrowLeft, faCloudUploadAlt, 
  faTimes, faMapMarkerAlt, faEdit, faCheckCircle,
  faWifi, faFaucet, faBolt, faSnowflake, faFan, faCouch,
  faUtensils, faBath, faShieldAlt, faCar, faTshirt, faChargingStation
} from '@fortawesome/free-solid-svg-icons';
import { creerLogement } from '../../services/logementService';
import Navbar from './Navbar';
import AuthContext from '../../context/AuthContext';

const CreationAnnonce = () => {
  const {user} = useContext(AuthContext);
  // États pour les étapes du formulaire
  const [etapeActuelle, setEtapeActuelle] = useState(1);
  
  // États pour les données du formulaire
  const [formData, setFormData] = useState({
    titre: 'Jolie logement',
    description: 'logement en bordure de route T7',
    type: 'location',
    surface: '10',
    photos: [],
    equipements: [],
    prix: 1500000,
    charges: true,
    disponibilite: '2025-08-19',
    etage: '52',
    ville: 'Conakry',
    quartier: 'Entag-Nord',
    adresse: 'marché',
    proprietaire: user.compte._id,
    disponible: true,
    conditions: true
  });
  
  // Références pour l'upload de fichiers
  const fileInputRef = useRef(null);
  const dropzoneRef = useRef(null);
  
  // Liste des équipements
  const equipements = [
    { id: 'wifi', nom: 'Wi-Fi', icone: faWifi },
    { id: 'eau', nom: 'Eau courante', icone: faFaucet },
    { id: 'electricite', nom: 'Électricité 24h/24', icone: faBolt },
    { id: 'climatisation', nom: 'Climatisation', icone: faSnowflake },
    { id: 'ventilateur', nom: 'Ventilateur', icone: faFan },
    { id: 'meuble', nom: 'Meublé', icone: faCouch },
    { id: 'cuisine', nom: 'Cuisine équipée', icone: faUtensils },
    { id: 'salle_bain', nom: 'Salle de bain privée', icone: faBath },
    { id: 'gardiennage', nom: 'Gardiennage', icone: faShieldAlt },
    { id: 'parking', nom: 'Parking', icone: faCar },
    { id: 'laverie', nom: 'Laverie', icone: faTshirt },
    { id: 'generateur', nom: 'Générateur', icone: faChargingStation }
  ];
  
  // Gestion des changements de champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Gestion des équipements sélectionnés
  const toggleEquipement = (id) => {
    setFormData(prev => {
      const newEquipements = prev.equipements.includes(id)
        ? prev.equipements.filter(item => item !== id)
        : [...prev.equipements, id];
      return { ...prev, equipements: newEquipements };
    });
  };
  
  // Gestion de l'upload de photos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  
  const handleFiles = (files) => {
    const images = files.filter(file => file.type.startsWith('image/'));
    const newPhotos = images.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };
  
  const removePhoto = (index) => {
    setFormData(prev => {
      const newPhotos = [...prev.photos];
      URL.revokeObjectURL(newPhotos[index].preview);
      newPhotos.splice(index, 1);
      return { ...prev, photos: newPhotos };
    });
  };
  
  // Gestion des étapes
  const nextStep = () => {
    // Validation simple pour cet exemple
    if (etapeActuelle === 1 && (!formData.titre || !formData.description || !formData.type || !formData.surface)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (etapeActuelle === 2 && formData.photos.length > 3) {
      alert('Veuillez ajouter au moins 3 photos');
      return;
    }
    
    if (etapeActuelle === 3 && (!formData.prix || !formData.disponibilite)) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setEtapeActuelle(prev => prev + 1);
  };
  
  const prevStep = () => {
    setEtapeActuelle(prev => prev - 1);
  };
  
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.conditions) {
      alert('Veuillez accepter les conditions générales');
      return;
    }

      const data = new FormData();

  // Ajout des champs simples (texte, nombres, booléens)
  data.append("titre", formData.titre);
  data.append("description", formData.description);
  data.append("type", formData.type);
  data.append("surface", formData.surface);
  data.append("prix", formData.prix);
  data.append("charges", formData.charges);
  data.append("disponibilite", formData.disponibilite);
  data.append("etage", formData.etage);
  data.append("ville", formData.ville);
  data.append("quartier", formData.quartier);
  data.append("adresse", formData.adresse);
  data.append("proprietaire", formData.proprietaire);
  data.append("disponible", formData.disponible);
  data.append("conditions", formData.conditions);

  // Ajout des fichiers images
  formData.photos.forEach((photoObj) => {
    data.append("photos", photoObj.file); // ⚠️ bien envoyer le file brut
  });

  // Si `equipements` est un tableau de strings
  formData.equipements.forEach((eq) => {
    data.append("equipements[]", eq);
  });

    creerLogement(data)
    .then(data => {
      alert(data.success);
      console.log(data.message, data.annonce)
    })
    .catch(error => {
      console.log(error.message);
    })
    
    // Ici vous ajouteriez la logique d'envoi au backend
    console.log('Données du formulaire:', formData);
    // alert('Annonce créée avec succès !');
    // Redirection simulée
    // window.location.href = '/mes-annonces';
  };
  
  // Nettoyage des URLs créées
  useEffect(() => {
    return () => {
      formData.photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    };
  }, [formData.photos]);
  
  // Styles pour les indicateurs d'étape
  const getStepIndicatorClass = (step) => {
    if (step < etapeActuelle) return 'completed';
    if (step === etapeActuelle) return 'active';
    return 'inactive';
  };
  
  const getStepLineClass = (step) => {
    if (step < etapeActuelle) return 'completed';
    if (step <= etapeActuelle) return 'active';
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <Navbar/>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Barre de progression */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center flex-1">
                <div className={`step-indicator ${getStepIndicatorClass(1)}`}>
                  {etapeActuelle > 1 ? <FontAwesomeIcon icon={faCheck} /> : '1'}
                </div>
                <div className={`step-line ${getStepLineClass(1)}`}></div>
                <div className={`step-indicator ${getStepIndicatorClass(2)}`}>
                  {etapeActuelle > 2 ? <FontAwesomeIcon icon={faCheck} /> : '2'}
                </div>
                <div className={`step-line ${getStepLineClass(2)}`}></div>
                <div className={`step-indicator ${getStepIndicatorClass(3)}`}>
                  {etapeActuelle > 3 ? <FontAwesomeIcon icon={faCheck} /> : '3'}
                </div>
                <div className={`step-line ${getStepLineClass(3)}`}></div>
                <div className={`step-indicator ${getStepIndicatorClass(4)}`}>
                  {etapeActuelle > 4 ? <FontAwesomeIcon icon={faCheck} /> : '4'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulaire multi-étapes */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* Étape 1: Informations de base */}
            <div className={`form-step ${etapeActuelle === 1 ? 'active' : ''}`} id="step1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations de base</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">Titre de l'annonce *</label>
                  <input
                    type="text"
                    id="titre"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Ex: Jolie chambre étudiante près de l'université"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description détaillée *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Décrivez votre logement en détail (surface, ambiance, quartier...)"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Type de logement *</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value="" disabled>Sélectionnez</option>
                      <option>Chambre individuelle</option>
                      <option>Chambre en colocation</option>
                      <option>Studio</option>
                      <option>Appartement</option>
                      <option>Maison</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="surface" className="block text-sm font-medium text-gray-700 mb-2">Surface (m²) *</label>
                    <input
                      type="number"
                      id="surface"
                      name="surface"
                      value={formData.surface}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      placeholder="Ex: 20"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Suivant <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
            
            {/* Étape 2: Photos */}
            <div className={`form-step ${etapeActuelle === 2 ? 'active' : ''}`} id="step2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Photos du logement</h2>
              <p className="text-gray-600 mb-6">Ajoutez au moins 3 photos de qualité. La première photo sera la photo principale.</p>
              
              <div
                ref={dropzoneRef}
                className="upload-dropzone rounded-xl p-8 text-center mb-6 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition-colors"
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-gray-400 mb-3" />
                <p className="font-medium text-gray-700">Glissez-déposez vos photos ici</p>
                <p className="text-sm text-gray-500 mt-1">ou cliquez pour parcourir vos fichiers</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="thumbnails-container">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="thumbnail-item relative overflow-hidden rounded-lg bg-gray-100 h-40 transition-transform hover:scale-103 hover:shadow-md">
                    <img src={photo.preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-100"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Précédent
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Suivant <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
            
            {/* Étape 3: Détails et équipements */}
            <div className={`form-step ${etapeActuelle === 3 ? 'active' : ''}`} id="step3">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Détails et équipements</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Équipements inclus *</label>
                  <div className="flex flex-wrap gap-3" id="amenities-container">
                    {equipements.map(equipement => (
                      <button
                        key={equipement.id}
                        type="button"
                        onClick={() => toggleEquipement(equipement.id)}
                        className={`amenity-tag px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                          formData.equipements.includes(equipement.id)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <FontAwesomeIcon icon={equipement.icone} className="mr-2" />
                        {equipement.nom}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="prix" className="block text-sm font-medium text-gray-700 mb-2">Prix mensuel (GNF) *</label>
                    <input
                      type="number"
                      id="prix"
                      name="prix"
                      value={formData.prix}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      placeholder="Ex: 1500000"
                    />
                    <div className="mt-2">
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="5000"
                        value={formData.prix}
                        onChange={(e) => setFormData({...formData, prix: parseInt(e.target.value)})}
                        className="w-full price-slider"
                        id="prix-slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>500K GNF</span>
                        <span>5M GNF</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="charges" className="block text-sm font-medium text-gray-700 mb-2">Charges comprises ?</label>
                    <select
                      id="charges"
                      name="charges"
                      value={formData.charges}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value="oui">Oui</option>
                      <option value="non">Non</option>
                      <option value="partiel">Partiellement</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="disponibilite" className="block text-sm font-medium text-gray-700 mb-2">Disponibilité *</label>
                  <input
                    type="date"
                    id="disponibilite"
                    name="disponibilite"
                    value={formData.disponibilite}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
                
                <div>
                  <label htmlFor="etage" className="block text-sm font-medium text-gray-700 mb-2">Étage</label>
                  <input
                    type="number"
                    id="etage"
                    name="etage"
                    value={formData.etage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Ex: 2 (0 pour rez-de-chaussée)"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Précédent
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Suivant <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
            
            {/* Étape 4: Localisation */}
            <div className={`form-step ${etapeActuelle === 4 ? 'active' : ''}`} id="step4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Localisation</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ville" className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                    <select
                      id="ville"
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value="" disabled>Sélectionnez une ville</option>
                      <option>Conakry</option>
                      <option>Kindia</option>
                      <option>Kankan</option>
                      <option>Labé</option>
                      <option>Nzérékoré</option>
                      <option>Mamou</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="quartier" className="block text-sm font-medium text-gray-700 mb-2">Quartier *</label>
                    <input
                      type="text"
                      id="quartier"
                      name="quartier"
                      value={formData.quartier}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      placeholder="Ex: Dixinn"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-2">Adresse exacte (facultatif)</label>
                  <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Ex: Rue KA 002, près du marché"
                  />
                  <p className="text-xs text-gray-500 mt-1">Pour des raisons de sécurité, l'adresse exacte ne sera visible qu'après prise de contact.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position sur la carte *</label>
                  <div className="map-preview h-64 bg-gray-200 rounded-lg overflow-hidden relative transition-all hover:scale-102 hover:shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-4xl text-blue-600" />
                    </div>
                    <button
                      type="button"
                      className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modifier la position
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="conditions"
                      name="conditions"
                      type="checkbox"
                      checked={formData.conditions}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="conditions" className="font-medium text-gray-700">
                      Je certifie que ces informations sont exactes et j'accepte les 
                      <a href="/conditions" className="text-blue-600 hover:underline"> conditions générales</a> *
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Précédent
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center"
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Publier l'annonce
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Styles globaux */}
      <style jsx global>{`
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f8fafc;
        }
        
        .step-indicator {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin: 0 auto;
          transition: all 0.3s ease;
        }
        
        .step-indicator.active {
          background-color: #2C5CD5;
          color: white;
        }
        
        .step-indicator.completed {
          background-color: #3CB371;
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
          transition: all 0.3s ease;
        }
        
        .step-line.active {
          background-color: #2C5CD5;
        }
        
        .step-line.completed {
          background-color: #3CB371;
        }
        
        .form-step {
          display: none;
          animation: fadeIn 0.5s ease-out;
        }
        
        .form-step.active {
          display: block;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .upload-dropzone {
          border: 2px dashed #CBD5E1;
          transition: all 0.3s ease;
        }
        
        .upload-dropzone:hover, .upload-dropzone.dragover {
          border-color: #2C5CD5;
          background-color: rgba(44, 92, 213, 0.05);
        }
        
        .thumbnail-item {
          transition: all 0.3s ease;
        }
        
        .thumbnail-item:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .amenity-tag {
          transition: all 0.2s ease;
        }
        
        .amenity-tag:hover {
          transform: translateY(-2px);
        }
        
        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2C5CD5;
          cursor: pointer;
        }
        
        .price-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2C5CD5;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CreationAnnonce;