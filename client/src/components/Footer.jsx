import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Section Principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Colonne 1 : Logo + Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-5">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mr-3">LS</div>
              <span className="text-2xl font-bold">Logui<span className="text-blue-600">Stud</span></span>
            </div>
            <p className="text-gray-400 mb-6">
              La plateforme nouvelle plateforme pour le logement étudiant en Guinée. Nous connectons les étudiants avec les meilleures offres de logement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-green-500">
              Liens rapides
            </h3>
            <ul className="space-y-3">
              <li><a href="/annonces" className="text-gray-400 hover:text-green-500 transition">Toutes les annonces</a></li>
              <li><a href="/villes" className="text-gray-400 hover:text-green-500 transition">Villes disponibles</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-green-500 transition">Conseils pratiques</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-green-500 transition">FAQ</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-green-500 transition">Contactez-nous</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Pour les étudiants */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-green-500">
              Étudiants
            </h3>
            <ul className="space-y-3">
              <li><a href="/choix-profile" className="text-gray-400 hover:text-green-500 transition">Créer un compte</a></li>
              <li><a href="/guide-etudiant" className="text-gray-400 hover:text-green-500 transition">Guide de recherche</a></li>
              <li><a href="/colocation" className="text-gray-400 hover:text-green-500 transition">Trouver une colocation</a></li>
              <li><a href="/temoignages" className="text-gray-400 hover:text-green-500 transition">Témoignages</a></li>
            </ul>
          </div>

          {/* Colonne 4 : Pour les propriétaires */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-green-500">
              Propriétaires
            </h3>
            <ul className="space-y-3">
              <li><a href="/inscription-proprietaire" className="text-gray-400 hover:text-green-500 transition">Publier une annonce</a></li>
              <li><a href="/guide-proprietaire" className="text-gray-400 hover:text-green-500 transition">Guide du propriétaire</a></li>
              <li><a href="/engagement" className="text-gray-400 hover:text-green-500 transition">Notre engagement</a></li>
              <li><a href="/contact-pro" className="text-gray-400 hover:text-green-500 transition">Contact professionnel</a></li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Bas de footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; 2023 LoguiStud. Tous droits réservés.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="/conditions" className="text-gray-400 hover:text-green-500 text-sm transition">CGU</a>
            <a href="/politiques" className="text-gray-400 hover:text-green-500 text-sm transition">Confidentialité</a>
            <a href="/cookies" className="text-gray-400 hover:text-green-500 text-sm transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;