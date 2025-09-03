import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, faBell, faInfoCircle, faFileUpload, faCheckCircle, 
  faClock, faTimesCircle, faCloudUploadAlt, faIdCard, 
  faGraduationCap, faUserShield, faFileInvoiceDollar, 
  faPiggyBank, faShieldAlt, faEye, faDownload, faTrashAlt, 
  faPlus, faSpinner, faCheckCircle as faCheckCircleSolid,
  faFileAlt, faEnvelopeOpenText
} from '@fortawesome/free-solid-svg-icons';

const EtudiantDocuments = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      setUploading(true);
      setUploadComplete(false);
      
      // Simulation de l'upload
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          setUploading(false);
          setUploadComplete(true);
        }
      }, 200);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file-upload').click();
  };

  const resetUpload = () => {
    setUploadComplete(false);
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen flex">
      {/* Contenu principal */}
      <main className="flex-1 overflow-x-hidden">

        {/* Contenu des documents */}
        <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800">Mes Documents</h1>
          {/* Bannière d'information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mt-1 mr-3" />
              <div>
                <h3 className="font-medium text-blue-800">Documents requis pour une location</h3>
                <p className="text-sm text-blue-600">
                  Les propriétaires vérifient ces documents avant de valider une réservation. 
                  Assurez-vous qu'ils sont à jour pour accélérer vos demandes.
                </p>
              </div>
            </div>
          </div>
          
          {/* Statistiques des documents */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Documents uploadés</p>
                  <h3 className="text-2xl font-bold">4/6</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#2C5CD5] bg-opacity-10 text-[#2C5CD5] flex items-center justify-center">
                  <FontAwesomeIcon icon={faFileUpload} />
                </div>
              </div>
              <div className="progress-bar mt-3">
                <div className="progress-fill" style={{ width: '66%' }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Validés</p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#3CB371] bg-opacity-10 text-[#3CB371] flex items-center justify-center">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-3">Dernière validation : 12/05/2024</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">En attente</p>
                  <h3 className="text-2xl font-bold">1</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#F6A34A] bg-opacity-10 text-[#F6A34A] flex items-center justify-center">
                  <FontAwesomeIcon icon={faClock} />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-3">En cours de vérification</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Rejetés</p>
                  <h3 className="text-2xl font-bold">0</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#EF4444] bg-opacity-10 text-[#EF4444] flex items-center justify-center">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-3">À corriger</div>
            </div>
          </div>
          
          {/* Zone d'upload */}
          <div 
            className={`upload-dropzone rounded-xl p-8 text-center mb-8 cursor-pointer ${uploading || uploadComplete ? 'pointer-events-none' : ''}`}
            onClick={triggerFileInput}
          >
            {!uploading && !uploadComplete && (
              <>
                <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-gray-400 mb-3" />
                <p className="font-medium text-gray-700">Glissez-déposez vos fichiers ici</p>
                <p className="text-sm text-gray-500 mt-1">ou <span className="text-[#2C5CD5] font-medium">parcourez</span> vos fichiers</p>
                <p className="text-xs text-gray-400 mt-3">Formats acceptés : PDF, JPG, PNG (max. 5MB par fichier)</p>
              </>
            )}
            
            {uploading && (
              <div className="flex flex-col items-center">
                <FontAwesomeIcon icon={faSpinner} spin className="text-2xl text-[#2C5CD5] mb-2" />
                <p className="font-medium">Envoi en cours...</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                  <div className="bg-[#2C5CD5] h-1.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}
            
            {uploadComplete && (
              <>
                <FontAwesomeIcon icon={faCheckCircleSolid} className="text-3xl text-[#3CB371] mb-2" />
                <p className="font-medium">Fichier(s) uploadé(s) avec succès</p>
                <p className="text-sm text-gray-500 mt-1">document(s) ajouté(s)</p>
                <button 
                  className="text-[#2C5CD5] hover:underline text-sm font-medium mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetUpload();
                  }}
                >
                  Actualiser la page
                </button>
              </>
            )}
            
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              multiple 
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
          </div>
          
          {/* Liste des documents */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Documents requis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Carte 1 : CNI */}
              <DocumentCard 
                icon={faIdCard}
                title="Carte d'identité"
                description="Recto-verso lisible et en couleur"
                status="validé"
                statusColor="green"
                uploadedDate="10/04/2024"
              />
              
              {/* Carte 2 : Certificat de scolarité */}
              <DocumentCard 
                icon={faGraduationCap}
                title="Certificat de scolarité"
                description="Année académique 2023-2024"
                status="validé"
                statusColor="green"
                uploadedDate="05/05/2024"
              />
              
              {/* Carte 3 : Garant */}
              <DocumentCard 
                icon={faUserShield}
                title="Garant parent"
                description="Fiche de paie ou attestation employeur"
                status="en attente"
                statusColor="yellow"
                uploadedDate="15/05/2024"
              />
              
              {/* Carte 4 : Avis d'imposition */}
              <DocumentCard 
                icon={faFileInvoiceDollar}
                title="Avis d'imposition"
                description="Dernier avis fiscal si disponible"
                status="manquant"
                statusColor="gray"
                actionButton
              />
              
              {/* Carte 5 : RIB */}
              <DocumentCard 
                icon={faPiggyBank}
                title="Relevé d'identité bancaire"
                description="Pour le paiement du loyer"
                status="validé"
                statusColor="green"
                uploadedDate="08/05/2024"
              />
              
              {/* Carte 6 : Assurance */}
              <DocumentCard 
                icon={faShieldAlt}
                title="Assurance habitation"
                description="Obligatoire pour la location"
                status="manquant"
                statusColor="gray"
                actionButton
              />
            </div>
          </div>
          
          {/* Documents optionnels */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Documents complémentaires</h2>
            <p className="text-gray-600 mb-6">Ces documents peuvent renforcer votre dossier mais ne sont pas obligatoires</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Carte 1 : CV */}
              <DocumentCard 
                icon={faFileAlt}
                title="Curriculum Vitae"
                description="Pour les colocations étudiantes"
                status="optionnel"
                statusColor="gray"
                actionButton
              />
              
              {/* Carte 2 : Lettre recommandation */}
              <DocumentCard 
                icon={faEnvelopeOpenText}
                title="Lettre de recommandation"
                description="Ancien propriétaire ou employeur"
                status="optionnel"
                statusColor="gray"
                actionButton
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const DocumentCard = ({ icon, title, description, status, statusColor, uploadedDate, actionButton }) => {
  const getStatusBadgeClass = () => {
    switch (statusColor) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'gray':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconColorClass = () => {
    switch (statusColor) {
      case 'green':
        return 'text-[#3CB371]';
      case 'yellow':
        return 'text-[#F6A34A]';
      case 'red':
        return 'text-[#EF4444]';
      case 'gray':
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="document-card bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:transform hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-lg ${getIconColorClass()} bg-opacity-10 flex items-center justify-center mr-3`}>
              <FontAwesomeIcon icon={icon} />
            </div>
            <h3 className="font-medium">{title}</h3>
          </div>
          <span className={`status-badge text-xs px-2 py-1 rounded ${getStatusBadgeClass()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        
        {uploadedDate ? (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Uploadé le {uploadedDate}</span>
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-[#2C5CD5]">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button className="text-gray-400 hover:text-[#2C5CD5]">
                <FontAwesomeIcon icon={faDownload} />
              </button>
              <button className="text-gray-400 hover:text-red-500">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ) : (
          actionButton && (
            <button className="w-full mt-2 text-[#2C5CD5] hover:text-[#2351C0] text-sm font-medium">
              <FontAwesomeIcon icon={faPlus} className="mr-1" /> Ajouter
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EtudiantDocuments;