import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog, faSave, faUndo, faBell, 
  faLock, faUser, faShield, faPalette,
  faGlobe, faEye, faEyeSlash, faUpload
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/AuthContext';

const ProprietaireParametres = () => {
  const { user, lien } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profil');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  // États pour les formulaires
  const [profilData, setProfilData] = useState({
    nom: user?.compte?.nom || '',
    prenom: user?.compte?.prenom || '',
    email: user?.compte?.email || '',
    telephone: user?.compte?.telephone || '',
    adresse: user?.compte?.adresse || '',
    description: user?.compte?.description || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newReservation: true,
    newMessage: true,
    reservationConfirmed: true,
    reservationCancelled: true,
    promotionOffers: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showContactInfo: true,
    showProperties: true,
    allowMessages: true,
    dataSharing: false
  });

  // Gestionnaires de changement
  const handleProfilChange = (e) => {
    const { name, value } = e.target;
    setProfilData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Soumission des formulaires
  const handleProfilSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simuler sauvegarde
    setTimeout(() => {
      setSaving(false);
      alert('Profil mis à jour avec succès!');
    }, 1000);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    setSaving(true);
    // Simuler sauvegarde
    setTimeout(() => {
      setSaving(false);
      alert('Mot de passe modifié avec succès!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 1000);
  };

  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simuler sauvegarde
    setTimeout(() => {
      setSaving(false);
      alert('Préférences de notification sauvegardées!');
    }, 800);
  };

  const handlePrivacySubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simuler sauvegarde
    setTimeout(() => {
      setSaving(false);
      alert('Paramètres de confidentialité sauvegardés!');
    }, 800);
  };

  // Navigation tabs
  const tabs = [
    { id: 'profil', label: 'Profil', icon: faUser },
    { id: 'securite', label: 'Sécurité', icon: faLock },
    { id: 'notifications', label: 'Notifications', icon: faBell },
    { id: 'confidentialite', label: 'Confidentialité', icon: faShield },
    { id: 'apparence', label: 'Apparence', icon: faPalette }
  ];

  return (
    <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et paramètres de compte</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Navigation par onglets */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#2C5CD5] text-[#2C5CD5]'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <FontAwesomeIcon icon={tab.icon} className="w-4" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="p-6">
          {/* Onglet Profil */}
          {activeTab === 'profil' && (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Photo de profil</h2>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
                      <img 
                        src={user?.compte?.photoProfil ? `${lien}/${user.compte.photoProfil}` : 'https://randomuser.me/api/portraits/men/42.jpg'} 
                        alt="Profil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="cursor-pointer bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition flex items-center">
                      <FontAwesomeIcon icon={faUpload} className="mr-2" />
                      Changer la photo
                      <input type="file" className="hidden" />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">JPG, PNG ou GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Informations personnelles</h2>
                  <form onSubmit={handleProfilSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input
                          type="text"
                          name="nom"
                          value={profilData.nom}
                          onChange={handleProfilChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <input
                          type="text"
                          name="prenom"
                          value={profilData.prenom}
                          onChange={handleProfilChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profilData.email}
                          onChange={handleProfilChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input
                          type="tel"
                          name="telephone"
                          value={profilData.telephone}
                          onChange={handleProfilChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                      <input
                        type="text"
                        name="adresse"
                        value={profilData.adresse}
                        onChange={handleProfilChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        name="description"
                        value={profilData.description}
                        onChange={handleProfilChange}
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                        placeholder="Décrivez-vous en quelques mots..."
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={saving}
                        className="bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition flex items-center disabled:opacity-50"
                      >
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                      </button>
                      <button
                        type="button"
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center"
                      >
                        <FontAwesomeIcon icon={faUndo} className="mr-2" />
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Sécurité */}
          {activeTab === 'securite' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Modifier le mot de passe</h2>
              <form onSubmit={handlePasswordSubmit} className="max-w-md">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition flex items-center disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    {saving ? 'Sauvegarde...' : 'Modifier le mot de passe'}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center"
                  >
                    <FontAwesomeIcon icon={faUndo} className="mr-2" />
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Onglet Notifications */}
          {activeTab === 'notifications' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Préférences de notification</h2>
              <form onSubmit={handleNotificationsSubmit}>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Canaux de notification</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onChange={handleNotificationChange}
                          className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                        />
                        <span className="ml-2">Notifications par email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="smsNotifications"
                          checked={notificationSettings.smsNotifications}
                          onChange={handleNotificationChange}
                          className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                        />
                        <span className="ml-2">Notifications par SMS</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Types de notification</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="newReservation"
                          checked={notificationSettings.newReservation}
                          onChange={handleNotificationChange}
                          className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                        />
                        <span className="ml-2">Nouvelles réservations</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="newMessage"
                          checked={notificationSettings.newMessage}
                          onChange={handleNotificationChange}
                          className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                        />
                        <span className="ml-2">Nouveaux messages</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="reservationConfirmed"
                          checked={notificationSettings.reservationConfirmed}
                          onChange={handleNotificationChange}
                          className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                        />
                        <span className="ml-2">Réservations confirmées</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="reservationCancelled"
                          checked={notificationSettings.reservationCancelled}
                          onChange={handleNotificationChange}
                          className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                        />
                        <span className="ml-2">Réservations annulées</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="promotionOffers"
                          checked={notificationSettings.promotionOffers}
                          onChange={handleNotificationChange}
                          className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                        />
                        <span className="ml-2">Offres promotionnelles</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition flex items-center disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    {saving ? 'Sauvegarde...' : 'Sauvegarder les préférences'}
                  </button>
                  <button
                    type="button"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition flex items-center"
                  >
                    <FontAwesomeIcon icon={faUndo} className="mr-2" />
                    Réinitialiser
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Onglet Confidentialité */}
          {activeTab === 'confidentialite' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Paramètres de confidentialité</h2>
              <form onSubmit={handlePrivacySubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visibilité du profil</label>
                    <select
                      name="profileVisibility"
                      value={privacySettings.profileVisibility}
                      onChange={handlePrivacyChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                    >
                      <option value="public">Public</option>
                      <option value="contacts">Seulement mes contacts</option>
                      <option value="private">Privé</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Qui peut voir votre profil</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-800">Options de partage</h3>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="showContactInfo"
                        checked={privacySettings.showContactInfo}
                        onChange={handlePrivacyChange}
                        className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                      />
                      <span className="ml-2">Afficher mes informations de contact</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="showProperties"
                        checked={privacySettings.showProperties}
                        onChange={handlePrivacyChange}
                        className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                      />
                      <span className="ml-2">Afficher mes propriétés publiées</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="allowMessages"
                        checked={privacySettings.allowMessages}
                        onChange={handlePrivacyChange}
                        className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                      />
                      <span className="ml-2">Autoriser les messages des utilisateurs</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="dataSharing"
                        checked={privacySettings.dataSharing}
                        onChange={handlePrivacyChange}
                        className="rounded border-gray-300 text-[#2C5CD5] focus:ring-[#2C5CD5]"
                      />
                      <span className="ml-2">Partager des données pour améliorer le service</span>
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex space-x-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition flex items-center disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    {saving ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Onglet Apparence */}
          {activeTab === 'apparence' && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Préférences d'apparence</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Thème</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-2 border-[#2C5CD5] rounded-lg p-4 text-center cursor-pointer">
                      <div className="w-12 h-12 bg-gray-800 rounded-full mx-auto mb-2"></div>
                      <span className="text-sm font-medium">Sombre</span>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-gray-300">
                      <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2"></div>
                      <span className="text-sm font-medium">Clair</span>
                    </div>
                    <div className="border-2 border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-gray-300">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-2"></div>
                      <span className="text-sm font-medium">Automatique</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Langue</h3>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]">
                    <option>Français</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Densité d'affichage</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="density" value="comfortable" defaultChecked className="text-[#2C5CD5] focus:ring-[#2C5CD5]" />
                      <span className="ml-2">Confortable</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="density" value="compact" className="text-[#2C5CD5] focus:ring-[#2C5CD5]" />
                      <span className="ml-2">Compact</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button className="bg-[#2C5CD5] text-white px-4 py-2 rounded-lg hover:bg-[#1a4bbd] transition">
                  Appliquer les changements
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProprietaireParametres;