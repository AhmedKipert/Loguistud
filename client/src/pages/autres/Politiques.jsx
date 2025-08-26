import React from 'react';
import { FaArrowLeft, FaEye, FaEdit, FaTrashAlt, FaBan, FaUserTie, FaEnvelope, FaPhone } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from '../../components/Footer';

const Politiques = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Navbar/>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Bannière */}
          <div className="bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] p-8 text-white text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Politique de Confidentialité</h1>
            <p className="text-lg opacity-90">Dernière mise à jour : 01 juin 2024</p>
          </div>

          {/* Contenu */}
          <div className="p-8 privacy-container">
            {/* Introduction */}
            <div className="mb-8 highlight-box p-6 rounded-lg">
              <p className="font-medium">Chez LoguiStud, nous protégeons vos données personnelles conformément à la législation guinéenne et aux standards internationaux de protection des données.</p>
            </div>

            {/* Section 1 */}
            <div className="privacy-section mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Données collectées</h2>
              <p className="text-gray-700 mb-4">Nous collectons :</p>
              
              <div className="overflow-x-auto mb-6">
                <table className="data-table mb-6">
                  <thead>
                    <tr>
                      <th>Catégorie</th>
                      <th>Exemples</th>
                      <th>Finalité</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Informations personnelles</td>
                      <td>Nom, prénom, email, téléphone</td>
                      <td>Création de compte, authentification</td>
                    </tr>
                    <tr>
                      <td>Données académiques (étudiants)</td>
                      <td>Université, filière, niveau d'études</td>
                      <td>Personnalisation des recommandations</td>
                    </tr>
                    <tr>
                      <td>Informations immobilières (propriétaires)</td>
                      <td>Titre de propriété, documents légaux</td>
                      <td>Vérification des annonces</td>
                    </tr>
                    <tr>
                      <td>Données de navigation</td>
                      <td>Adresse IP, cookies, historique</td>
                      <td>Amélioration du service</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2 */}
            <div className="privacy-section mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Base légale du traitement</h2>
              <p className="text-gray-700 mb-4">Nous traitons vos données sur la base de :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Votre consentement</strong> (pour les communications marketing)</li>
                <li><strong>L'exécution contractuelle</strong> (pour fournir nos services)</li>
                <li><strong>L'intérêt légitime</strong> (sécurité du site, prévention des fraudes)</li>
              </ul>
              <p className="text-gray-700">Conformément à la Loi Guinéenne sur la Protection des Données Personnelles (Loi L/2013/CNT du 13 mai 2013).</p>
            </div>

            {/* Section 3 */}
            <div className="privacy-section mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Partage des données</h2>
              <p className="text-gray-700 mb-4">Vos données peuvent être partagées avec :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Prestataires techniques</strong> (hébergeurs, services de paiement)</li>
                <li><strong>Autorités légales</strong> (sur requête judiciaire valide)</li>
                <li><strong>Autres utilisateurs</strong> (données limitées nécessaires aux transactions)</li>
              </ul>
              <div className="highlight-box p-4 rounded-lg">
                <p className="font-medium">Nous ne vendons jamais vos données personnelles à des tiers à des fins commerciales.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="privacy-section mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Conservation des données</h2>
              <p className="text-gray-700 mb-2">Nous conservons vos données :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Comptes actifs :</strong> Tant que votre compte est actif</li>
                <li><strong>Après désactivation :</strong> 3 ans à des fins légales</li>
                <li><strong>Données de paiement :</strong> 10 ans conformément à la loi guinéenne</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="privacy-section mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Vos droits</h2>
              <p className="text-gray-700 mb-4">Conformément à la loi, vous pouvez :</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#2C5CD5] mb-2"><FaEye className="inline mr-2" /> Droit d'accès</h3>
                  <p className="text-gray-700 text-sm">Demander une copie de vos données personnelles</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#2C5CD5] mb-2"><FaEdit className="inline mr-2" /> Droit de rectification</h3>
                  <p className="text-gray-700 text-sm">Corriger des informations inexactes</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#2C5CD5] mb-2"><FaTrashAlt className="inline mr-2" /> Droit à l'effacement</h3>
                  <p className="text-gray-700 text-sm">Demander la suppression de vos données</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-[#2C5CD5] mb-2"><FaBan className="inline mr-2" /> Droit d'opposition</h3>
                  <p className="text-gray-700 text-sm">Refuser certains traitements</p>
                </div>
              </div>
              <p className="text-gray-700">Pour exercer ces droits, contactez notre DPO à <a href="mailto:dpo@loguistud.com" className="text-[#2C5CD5] hover:underline">dpo@loguistud.com</a></p>
            </div>

            {/* Section 6 */}
            <div className="privacy-section mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Sécurité des données</h2>
              <p className="text-gray-700 mb-4">Nous mettons en œuvre des mesures techniques et organisationnelles strictes :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Chiffrement SSL/TLS des données</li>
                <li>Stockage sécurisé chez des hébergeurs certifiés</li>
                <li>Accès restreint au personnel autorisé</li>
                <li>Audits réguliers de sécurité</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="privacy-section mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Cookies et traceurs</h2>
              <p className="text-gray-700 mb-4">Nous utilisons :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li><strong>Cookies essentiels :</strong> Pour le fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> Pour mesurer l'audience</li>
                <li><strong>Cookies de préférences :</strong> Pour mémoriser vos choix</li>
              </ul>
              <p className="text-gray-700">Vous pouvez contrôler les cookies via les paramètres de votre navigateur.</p>
            </div>

            {/* Section 8 */}
            <div className="privacy-section">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Modifications</h2>
              <p className="text-gray-700 mb-2">Nous pouvons mettre à jour cette politique. Les modifications importantes seront notifiées par email.</p>
              <p className="text-gray-700">Version antérieure archivée sur demande à <a href="mailto:dpo@loguistud.com" className="text-[#2C5CD5] hover:underline">dpo@loguistud.com</a></p>
            </div>

            {/* Contact */}
            <div className="mt-12 p-6 bg-[#F0F0F0] rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Contact DPO</h3>
              <p className="text-gray-700 mb-4">Notre Délégué à la Protection des Données :</p>
              <ul className="space-y-2 text-gray-700">
                <li><FaUserTie className="inline mr-2 text-[#2C5CD5]" /> M. [Nom du DPO]</li>
                <li><FaEnvelope className="inline mr-2 text-[#2C5CD5]" /> dpo@loguistud.com</li>
                <li><FaPhone className="inline mr-2 text-[#2C5CD5]" /> +224 [Numéro direct]</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer/>

      <style jsx global>{`
        .privacy-container {
          counter-reset: section;
        }
        .privacy-section::before {
          counter-increment: section;
          content: counter(section) ". ";
          color: #2C5CD5;
          font-weight: bold;
        }
        .data-table {
          border-collapse: collapse;
          width: 100%;
        }
        .data-table th, .data-table td {
          border: 1px solid #e2e8f0;
          padding: 12px;
          text-align: left;
        }
        .data-table th {
          background-color: #f8fafc;
          font-weight: 600;
        }
        .highlight-box {
          border-left: 4px solid #3CB371;
          background-color: #f0fdf4;
        }
      `}</style>
    </div>
  );
};

export default Politiques;