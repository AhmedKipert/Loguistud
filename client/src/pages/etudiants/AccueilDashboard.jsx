import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faSearch,
  faHeart,
  faEnvelope,
  faFileAlt,
  faUserEdit,
  faCog,
  faSignOutAlt,
  faBell,
  faUpload,
  faEdit,
  faQuestionCircle,
  faShareAlt,
  faMapMarkerAlt,
  faChevronRight,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { me } from '../../services/authService';

const AccueilDashboard = () => {

      // Etat pour le menu mobile
      const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
      const [prenom, setPrenom] = useState('');
      const [nom, setNom] = useState('');
      const [nomComplet, setNomComplet] = useState('');
      const [compte, setCompte] = useState({});
      const image_url = 'http://localhost:3002/uploads/photosProfiles/'
      const [imageSrc, setImageSrc] = useState('');
    
      // Donnees des logements suggeres
      const [logementsSuggeres, setLogementsSuggeres] = useState([
        {
          id: 1,
          titre: "Colocation etudiante a Dixinn",
          prix: "1 250 000 GNF",
          localisation: "10 min de l'UGANC",
          tags: ["2 chambres", "Wi-Fi"],
          image: "https://via.placeholder.com/400x300",
          nouveau: true
        },
        {
          id: 2,
          titre: "Studio meuble a Matam",
          prix: "1 800 000 GNF",
          localisation: "15 min en taxi",
          tags: ["Studio", "Climatise"],
          image: "https://via.placeholder.com/400x300"
        },
        {
          id: 3,
          titre: "Chambre chez l'habitant",
          prix: "900 000 GNF",
          localisation: "Ratoma, 12 min a pied",
          tags: ["Cuisine", "Gardien"],
          image: "https://via.placeholder.com/400x300"
        }
      ]);
    
      // Activites recentes
      const activitesRecentes = [
        {
          date: "12/05/2024",
          action: "Message envoye",
          details: "Colocation Dixinn",
          statut: "Reponse recue",
          couleurStatut: "green"
        },
        {
          date: "10/05/2024",
          action: "Document uploadé",
          details: "Certificat de scolarite",
          statut: "Valide",
          couleurStatut: "blue"
        },
        {
          date: "08/05/2024",
          action: "Favori ajoute",
          details: "Studio Matam",
          statut: "En attente",
          couleurStatut: "gray"
        }
      ];
    
      useEffect(() => {
        me()
          .then(data => {
            // alert(data.user.email);
            setNomComplet(data.user.compte.prenom + " " + data.user.compte.nom);
            setPrenom(data.user.compte.prenom);
            setCompte(data.user.compte);
            const src = data.user.compte.photoProfil ? image_url + data.user.compte.photoProfil : image_url + 'placeholder_image.jpg';
            setImageSrc(src);
          })
          .catch(error => {
            alert(error.user.role)
          })
      }, []);
  return (
    <div>
        {/* Contenu du tableau de bord */}
        <div className="p-6">
          {/* Bienvenue */}
          <div
            className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-2">Bon retour, {compte.prenom}</h2>
            <p className="mb-4">
              Votre profil est complete a 85%. Completez-le pour ameliorer vos suggestions de logement.
            </p>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5">
              <div
                className="bg-white h-2.5 rounded-full"
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Carte Favoris */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Logements favoris</p>
                  <h3 className="text-2xl font-bold">5</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FontAwesomeIcon icon={faHeart} className="text-xl" />
                </div>
              </div>
              <a
                href="#"
                className="text-blue-600 text-sm font-medium hover:underline mt-4 inline-block"
              >
                Voir la liste
              </a>
            </div>

            {/* Carte Messages */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Messages non lus</p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                </div>
              </div>
              <a
                href="#"
                className="text-blue-600 text-sm font-medium hover:underline mt-4 inline-block"
              >
                Voir les messages
              </a>
            </div>

            {/* Carte Compatibilite */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Compatibilite moyenne</p>
                  <h3 className="text-2xl font-bold">87%</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <span className="text-xl font-bold">%</span>
                </div>
              </div>
              <a
                href="#"
                className="text-blue-600 text-sm font-medium hover:underline mt-4 inline-block"
              >
                Optimiser
              </a>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Actions rapides</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {/* Nouvelle recherche */}
              <a
                href="#"
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center hover:border-blue-600 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <p className="text-sm font-medium">Nouvelle recherche</p>
              </a>

              {/* Ajouter documents */}
              <a
                href="#"
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center hover:border-blue-600 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FontAwesomeIcon icon={faUpload} />
                </div>
                <p className="text-sm font-medium">Ajouter documents</p>
              </a>

              {/* Completer profil */}
              <a
                href="#"
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center hover:border-blue-600 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                <p className="text-sm font-medium">Completer profil</p>
              </a>

              {/* Aide */}
              <a
                href="#"
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center hover:border-blue-600 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </div>
                <p className="text-sm font-medium">Aide</p>
              </a>

              {/* Partager */}
              <a
                href="#"
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center hover:border-blue-600 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FontAwesomeIcon icon={faShareAlt} />
                </div>
                <p className="text-sm font-medium">Partager</p>
              </a>
            </div>
          </div>

          {/* Suggestions personnalisees */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Suggestions pour vous</h2>
              <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
                Voir tout
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logementsSuggeres.map(logement => (
                <div
                  key={logement.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={logement.image}
                      alt="Logement"
                      className="w-full h-full object-cover"
                    />
                    {logement.nouveau && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Nouveau
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">{logement.titre}</h3>
                      <span className="font-bold text-green-500">{logement.prix}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                      <span>{logement.localisation}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {logement.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dernieres activites */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Vos dernieres activites</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Action
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activitesRecentes.map((activite, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {activite.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {activite.action}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {activite.details}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full bg-${activite.couleurStatut}-100 text-${activite.couleurStatut}-800`}
                          >
                            {activite.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AccueilDashboard