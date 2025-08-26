import React from 'react';
import { FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Conditions = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] flex items-center justify-center text-white text-lg font-bold mr-3">
                LS
              </div>
              <span className="text-xl font-bold text-gray-800">
                Logui<span className="text-[#2C5CD5]">Stud</span>
              </span>
            </a>
            <nav>
              <a href="/" className="text-gray-700 hover:text-[#2C5CD5]">
                <FaArrowLeft className="inline mr-1" /> Retour à l'accueil
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Bannière */}
          <div className="bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] p-8 text-white text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Conditions Générales d'Utilisation</h1>
            <p className="text-lg opacity-90">Dernière mise à jour : 01 juin 2024</p>
          </div>

          {/* Contenu juridique */}
          <div className="p-8 legal-container">
            {/* Introduction */}
            <div className="mb-8 highlight p-4 rounded">
              <p className="font-medium">En utilisant la plateforme LoguiStud, vous acceptez pleinement et sans réserve les présentes conditions générales d'utilisation.</p>
            </div>

            {/* Article 1 */}
            <div className="legal-section mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Objet</h2>
              <p className="text-gray-700 mb-4">LoguiStud est une plateforme de mise en relation entre :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Étudiants recherchant un logement en Guinée</li>
                <li>Propriétaires ou gestionnaires proposant des logements</li>
              </ul>
              <p className="text-gray-700">La plateforme est accessible via le site web <a href="https://loguistud.com" className="text-[#2C5CD5] hover:underline">www.loguistud.com</a> et applications mobiles associées.</p>
            </div>

            {/* Article 2 */}
            <div className="legal-section mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Inscription</h2>
              <div className="legal-subsection mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Comptes utilisateurs</h3>
                <p className="text-gray-700">L'inscription nécessite :</p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                  <li>Une adresse email valide</li>
                  <li>Un numéro de téléphone guinéen valide (+224)</li>
                  <li>La création d'un mot de passe sécurisé</li>
                </ul>
              </div>
              <div className="legal-subsection">
                <h3 className="font-semibold text-gray-800 mb-2">Vérification</h3>
                <p className="text-gray-700">Les comptes propriétaires nécessitent une vérification d'identité et des documents prouvant la propriété du logement.</p>
              </div>
            </div>

            {/* Article 3 */}
            <div className="legal-section mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Engagements des utilisateurs</h2>
              <div className="legal-subsection mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Exactitude des informations</h3>
                <p className="text-gray-700">Les utilisateurs garantissent l'exactitude des informations fournies et s'engagent à les maintenir à jour.</p>
              </div>
              <div className="legal-subsection mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Respect des lois</h3>
                <p className="text-gray-700">Les utilisateurs s'engagent à respecter la législation guinéenne, notamment en matière de :</p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                  <li>Location immobilière</li>
                  <li>Protection des données personnelles</li>
                  <li>Non-discrimination</li>
                </ul>
              </div>
            </div>

            {/* Article 4 */}
            <div className="legal-section mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Annonces</h2>
              <p className="text-gray-700 mb-4">Les annonces doivent :</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Corresponder à un logement réellement disponible</li>
                <li>Préciser le prix en francs guinéens (GNF)</li>
                <li>Inclure des photos récentes et non modifiées</li>
                <li>Respecter les critères de qualité LoguiStud</li>
              </ul>
              <div className="highlight p-4 rounded">
                <p className="font-medium text-gray-800">Les annonces trompeuses ou frauduleuses seront immédiatement supprimées et pourront entraîner la suspension du compte.</p>
              </div>
            </div>

            {/* Article 5 */}
            <div className="legal-section mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Responsabilités</h2>
              <div className="legal-subsection mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Plateforme</h3>
                <p className="text-gray-700">LoguiStud s'engage à :</p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                  <li>Maintenir la plateforme accessible</li>
                  <li>Vérifier les annonces signalées</li>
                  <li>Protéger les données personnelles</li>
                </ul>
              </div>
              <div className="legal-subsection">
                <h3 className="font-semibold text-gray-800 mb-2">Utilisateurs</h3>
                <p className="text-gray-700">LoguiStud décline toute responsabilité concernant :</p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
                  <li>Les transactions directes entre utilisateurs</li>
                  <li>L'exactitude des informations publiées</li>
                  <li>Les dommages matériels ou conflits locatifs</li>
                </ul>
              </div>
            </div>

            {/* Article 6 */}
            <div className="legal-section mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Modifications</h2>
              <p className="text-gray-700">LoguiStud se réserve le droit de modifier ces CGU. Les utilisateurs seront informés par email 15 jours avant leur entrée en vigueur.</p>
            </div>

            {/* Article 7 */}
            <div className="legal-section">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Loi applicable</h2>
              <p className="text-gray-700">Les présentes CGU sont régies par le droit guinéen. Tout litige relèvera des tribunaux compétents de Conakry.</p>
            </div>

            {/* Contact */}
            <div className="mt-12 p-6 bg-[#F0F0F0] rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Contact</h3>
              <p className="text-gray-700 mb-2">Pour toute question concernant les CGU :</p>
              <ul className="space-y-1 text-gray-700">
                <li><FaEnvelope className="inline mr-2 text-[#2C5CD5]" /> legal@loguistud.com</li>
                <li><FaPhone className="inline mr-2 text-[#2C5CD5]" /> +224 123 456 78</li>
                <li><FaMapMarkerAlt className="inline mr-2 text-[#2C5CD5]" /> Conakry, Guinée</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© 2024 LoguiStud. Tous droits réservés.</p>
            </div>
            <div className="flex space-x-6">
              <a href="/cgu" className="hover:text-[#3CB371]">Conditions d'utilisation</a>
              <a href="/confidentialite" className="hover:text-[#3CB371]">Politique de confidentialité</a>
              <a href="/contact" className="hover:text-[#3CB371]">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .legal-container {
          counter-reset: section;
        }
        .legal-section::before {
          counter-increment: section;
          content: counter(section) ". ";
          color: #2C5CD5;
          font-weight: bold;
        }
        .legal-subsection {
          counter-reset: subsection;
        }
        .legal-subsection::before {
          counter-increment: subsection;
          content: counter(section) "." counter(subsection) " ";
          color: #2C5CD5;
          font-weight: bold;
        }
        .highlight {
          border-left: 4px solid #3CB371;
          background-color: #F0F0F0;
        }
      `}</style>
    </div>
  );
};

export default Conditions;