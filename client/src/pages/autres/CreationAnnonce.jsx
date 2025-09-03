import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faCheck, faArrowRight, faArrowLeft, faCloudUploadAlt,
  faTimes, faMapMarkerAlt, faEdit, faCheckCircle,
  faWifi, faFaucet, faBolt, faSnowflake, faFan, faCouch,
  faUtensils, faBath, faShieldAlt, faCar, faTshirt, faChargingStation
} from '@fortawesome/free-solid-svg-icons';
import { creerLogement, logementUnique } from '../../services/logementService';
import Navbar from './Navbar';
import AuthContext from '../../context/AuthContext';
import MapView from '../../components/MapView';
import LocalisationLogement from './LocalisationLogement';
import { useParams } from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';


const CreationAnnonce = () => {
  const { user, lien } = useContext(AuthContext);

  // États pour les étapes du formulaire
  const [etapeActuelle, setEtapeActuelle] = useState(1);
  const [coordonnees, setCoordonnees] = useState(null);
  const { id } = useParams();
  const [infoAnnonce, setInfoAnnonce] = useState({});
  const [texteAction, setTexteAction] = useState('');




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
    ville: 'Conakry',
    quartier: 'Entag-Nord',
    adresse: 'marché',
    proprietaire: user.compte._id,
    disponible: true,
    localisation: null,
    conditions: true
  });

  // Références pour l'upload de fichiers
  const fileInputRef = useRef(null);
  const dropzoneRef = useRef(null);

  // Liste des équipements
  const equipements = [ 
    { id: 'eau', nom: 'Eau courante', icone: faFaucet },
    { id: 'electricite', nom: 'Électricité 24h/24', icone: faBolt },
    { id: 'climatisation', nom: 'Climatisation', icone: faSnowflake },
    { id: 'ventilateur', nom: 'Ventilateur', icone: faFan },
    { id: 'meuble', nom: 'Meublé', icone: faCouch },
    { id: 'cuisine', nom: 'Cuisine équipée', icone: faUtensils },
    { id: 'salle_bain', nom: 'Salle de bain privée', icone: faBath },
    { id: 'gardiennage', nom: 'Gardiennage', icone: faShieldAlt },
    { id: 'parking', nom: 'Parking', icone: faCar }
  ];


  useEffect(() => {
    if (id) {
      setTexteAction('Mettre à jour l\'annonce');
      const getAnnonce = async () => {
        const res = await logementUnique(id);
        if (res.success) {
          setInfoAnnonce(res.logement);
          formData.titre = infoAnnonce.titre;
          formData.description = infoAnnonce.description;
          formData.type = infoAnnonce.type;
          formData.surface = infoAnnonce.surface;
          // formData.photos = infoAnnonce.photos;
          formData.adresse = infoAnnonce.adresse;
          // formData.equipements = infoAnnonce.equipements;
          formData.prix = infoAnnonce.prix;
          formData.disponible = infoAnnonce.disponible;
          formData.ville = infoAnnonce.ville;
          formData.quartier = infoAnnonce.quartier;
          formData.charges = infoAnnonce.charges;
          // setCoordonnees(infoAnnonce.localisation);
          res.logement.photos.forEach(photo => {
            formData.photos.push(`${lien}/${photo}`);
          });

          console.log("FORM DATA PHOTOS:", formData.photos)


          alert(res.message)
        } else {
          alert(res.message);
        }
      };

      getAnnonce();
    } else {
      setTexteAction('Publier l\'annonce')
    }
  }, []);

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
  // const nextStep = () => {
  //   // Validation simple pour cet exemple
  //   if (etapeActuelle === 1 && (!formData.titre || !formData.description || !formData.type || !formData.surface)) {
  //     alert('Veuillez remplir tous les champs obligatoires');
  //     return;
  //   }

  //   if (etapeActuelle === 2 && formData.photos.length > 3) {
  //     alert('Veuillez ajouter au moins 3 photos');
  //     return;
  //   }


  //   setEtapeActuelle(prev => prev + 1);
  // };

  // const prevStep = () => {
  //   setEtapeActuelle(prev => prev - 1);
  // };

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

    data.append("localisation", [coordonnees.lng, coordonnees.lat])
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
  };

  // Nettoyage des URLs créées
  useEffect(() => {
    return () => {
      formData.photos.forEach(photo => URL.revokeObjectURL(photo.preview));
    };
  }, [formData.photos]);


  return (
    <div className="min-h-screen w-full bg-gray-50">

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Barre de progression */}


          {/* Formulaire multi-étapes */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-10">
            {/* Étape 1: Informations de base */}
            <div className={`form-step ${etapeActuelle === 1 ? 'active' : ''}`} id="step1">
              <h2 className="text-xl font-bold text-gray-600 mb-6 p-2 bg-gray-50">Informations de base</h2>

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

            </div>

            {/* Étape 2: Photos */}
            <div className={`form-step ${etapeActuelle === 2 ? 'active' : ''}`} id="step2">
              <h2 className="text-xl font-bold text-gray-600 mb-6 p-2 bg-gray-50">Photos du logement</h2>
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
            </div>

            {/* Étape 3: Détails et équipements */}
            <div>
              <h2 className="text-xl font-bold text-gray-600 mb-6 p-2 bg-gray-50">Détails et équipements</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Équipements inclus *</label>
                  <div className="flex flex-wrap gap-3" id="amenities-container">
                    {equipements.map(equipement => (
                      <button
                        key={equipement.id}
                        type="button"
                        onClick={() => toggleEquipement(equipement.id)}
                        className={`amenity-tag px-4 py-2 border rounded-full text-sm font-medium transition-all ${formData.equipements.includes(equipement.id)
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
                        onChange={(e) => setFormData({ ...formData, prix: parseInt(e.target.value) })}
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
              </div>

            </div>

            {/* Étape 4: Localisation */}
            <div className={`form-step ${etapeActuelle === 4 ? 'active' : ''}`} id="step4">
              <h2 className="text-xl font-bold text-gray-600 mb-6 p-2 bg-gray-50">Localisation</h2>

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
                  <div className="map-preview h-80 bg-gray-200 rounded-lg overflow-hidden relative transition-all hover:scale-102 hover:shadow-lg">
                    <div className="absolute flex">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-4xl text-blue-600" />
                    </div>
                    {/* Affichage de la carte */}
                    {/* <button
                      type="button"
                      className=" absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modifier la position
                    </button> */}
                    <LocalisationLogement onChoixPosition={setCoordonnees} />
                    {/* <MapView/> */}
                  </div>
                </div>
                {coordonnees ? <p>Coordonnées sélectionnées  ( lat: {coordonnees.lat.toFixed(5)} lng: {coordonnees.lng.toFixed(5)} )</p> : <p>Cliquer pour choisir un emplacement</p>}

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
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center"
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> {texteAction}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

    </div>
  );
};

export default CreationAnnonce;