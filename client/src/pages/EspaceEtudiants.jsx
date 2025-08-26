import React, { useState } from 'react';

const EspaceEtudiants = () => {
  // États pour les filtres
  const [filters, setFilters] = useState({
    universite: '',
    filiere: '',
    niveau: '',
    budget: '',
    typeLogement: '',
    localisation: '',
    compatibilite: ''
  });
  
  // États pour la visibilité des filtres
  const [filtersVisible, setFiltersVisible] = useState(true);
  
  // Données des étudiants (normalement viendraient d'une API)
  const [etudiants] = useState([
    {
      id: 1,
      nom: "Mamadou Diallo",
      age: 23,
      universite: "Université Gamal Abdel Nasser",
      filiere: "Informatique",
      niveau: "Licence 3",
      localisation: "Hamdallaye, Conakry",
      budget: "750 000 GNF/mois",
      compatibilite: 92,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      nom: "Aïssatou Bah",
      age: 21,
      universite: "Université Kofi Annan",
      filiere: "Médecine",
      niveau: "Licence 2",
      localisation: "Dixinn, Conakry",
      budget: "600 000 GNF/mois",
      compatibilite: 85,
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      nom: "Ibrahima Sow",
      age: 24,
      universite: "Université Général Lansana Conté",
      filiere: "Économie",
      niveau: "Master 1",
      localisation: "Kindia",
      budget: "500 000 GNF/mois",
      compatibilite: 95,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ]);

  // Gestionnaire de changement des filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour obtenir la classe de couleur en fonction du pourcentage de compatibilité
  const getCompatibilityClass = (percentage) => {
    if (percentage >= 90) return "bg-[#3CB371]";
    if (percentage >= 80) return "bg-[#F6A34A]";
    return "bg-gray-500";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#2C5CD5]">LoguiStud</h1>
            <nav className="ml-8 hidden md:block">
              <ul className="flex space-x-6">
                <li><a href="#" className="text-gray-600 hover:text-[#2C5CD5]">Accueil</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#2C5CD5]">Logements</a></li>
                <li><a href="#" className="font-medium text-[#2C5CD5]">Étudiants</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#2C5CD5]">Propriétaires</a></li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-[#3CB371] text-white px-4 py-2 rounded-md hover:bg-green-600">Connexion</button>
            <button className="bg-[#2C5CD5] text-white px-4 py-2 rounded-md hover:bg-blue-700">Inscription</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2C5CD5] to-[#3CB371] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Trouvez votre colocataire idéal</h2>
          <p className="text-xl mb-8">Connectez-vous avec des étudiants partageant les mêmes centres d'intérêt et préférences de vie</p>
          <button className="bg-[#F6A34A] text-gray-900 font-bold px-6 py-3 rounded-md hover:bg-orange-400">Commencer la recherche</button>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Rechercher des colocataires</h3>
            <div className="flex space-x-4">
              <button 
                className="bg-[#F0F0F0] text-gray-800 px-4 py-2 rounded-md flex items-center"
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtres
              </button>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="bg-[#F0F0F0] text-gray-800 px-4 py-2 rounded-md pl-10 w-full md:w-64"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          {filtersVisible && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Université</label>
                  <select 
                    name="universite"
                    value={filters.universite}
                    onChange={handleFilterChange}
                    className="w-full bg-[#F0F0F0] border rounded-md p-2"
                  >
                    <option value="">Toutes les universités</option>
                    <option>Université Gamal Abdel Nasser</option>
                    <option>Université Général Lansana Conté</option>
                    <option>Université Kofi Annan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Filière</label>
                  <select 
                    name="filiere"
                    value={filters.filiere}
                    onChange={handleFilterChange}
                    className="w-full bg-[#F0F0F0] border rounded-md p-2"
                  >
                    <option value="">Toutes les filières</option>
                    <option>Droit</option>
                    <option>Médecine</option>
                    <option>Informatique</option>
                    <option>Économie</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Niveau d'études</label>
                  <select 
                    name="niveau"
                    value={filters.niveau}
                    onChange={handleFilterChange}
                    className="w-full bg-[#F0F0F0] border rounded-md p-2"
                  >
                    <option value="">Tous les niveaux</option>
                    <option>Licence 1</option>
                    <option>Licence 2</option>
                    <option>Licence 3</option>
                    <option>Master</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Budget mensuel</label>
                  <select 
                    name="budget"
                    value={filters.budget}
                    onChange={handleFilterChange}
                    className="w-full bg-[#F0F0F0] border rounded-md p-2"
                  >
                    <option value="">Tous les budgets</option>
                    <option>0 - 500 000 GNF</option>
                    <option>500 000 - 1 000 000 GNF</option>
                    <option>1 000 000+ GNF</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Type de logement</label>
                  <select 
                    name="typeLogement"
                    value={filters.typeLogement}
                    onChange={handleFilterChange}
                    className="w-full bg-[#F0F0F0] border rounded-md p-2"
                  >
                    <option value="">Tous types</option>
                    <option>Colocation</option>
                    <option>Studio</option>
                    <option>Chambre individuelle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Localisation</label>
                  <select 
                    name="localisation"
                    value={filters.localisation}
                    onChange={handleFilterChange}
                    className="w-full bg-[#F0F0F0] border rounded-md p-2"
                  >
                    <option value="">Toute la Guinée</option>
                    <option>Conakry</option>
                    <option>Kindia</option>
                    <option>Kankan</option>
                    <option>Labé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Compatibilité</label>
                  <select 
                    name="compatibilite"
                    value={filters.compatibilite}
                    onChange={handleFilterChange}
                    className="w-full bg-[#F0F0F0] border rounded-md p-2"
                  >
                    <option value="">Niveau de compatibilité</option>
                    <option>Élevé</option>
                    <option>Moyen</option>
                    <option>Faible</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Colocataires compatibles</h3>
          
          {/* Student Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {etudiants.map(etudiant => (
              <div key={etudiant.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg">
                <div className="relative">
                  <img src={etudiant.photo} alt={etudiant.nom} className="w-full h-48 object-cover" />
                  <div className={`absolute top-4 right-4 ${getCompatibilityClass(etudiant.compatibilite)} text-white px-3 py-1 rounded-full text-sm`}>
                    {etudiant.compatibilite}% compatible
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{etudiant.nom}</h4>
                    <span className="bg-[#F0F0F0] text-gray-800 text-xs px-2 py-1 rounded">{etudiant.age} ans</span>
                  </div>
                  <p className="text-gray-600 mb-2">{etudiant.universite}</p>
                  <p className="text-gray-600 mb-4">{etudiant.filiere} - {etudiant.niveau}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3CB371]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm">Cherche coloc à</p>
                      <p className="font-medium">{etudiant.localisation}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#2C5CD5] font-bold">{etudiant.budget}</span>
                    <button className="bg-[#2C5CD5] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Contacter</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Comment trouver un colocataire compatible</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2C5CD5] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h4 className="text-xl font-bold mb-2">Créez votre profil</h4>
              <p className="text-gray-600">Remplissez vos informations personnelles, préférences de vie et critères de recherche.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#3CB371] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h4 className="text-xl font-bold mb-2">Trouvez des matches</h4>
              <p className="text-gray-600">Notre algorithme vous propose des colocataires compatibles avec vos critères.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F6A34A] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h4 className="text-xl font-bold mb-2">Connectez-vous</h4>
              <p className="text-gray-600">Discutez avec vos matches et organisez une rencontre pour finaliser la colocation.</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Témoignages d'étudiants</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F0F0F0] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Fatoumata" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Fatoumata Diallo</h4>
                  <p className="text-gray-600">Étudiante en Droit</p>
                </div>
              </div>
              <p className="text-gray-700">"Grâce à LoguiStud, j'ai trouvé une colocataire géniale avec qui je m'entends parfaitement. Le système de compatibilité est vraiment efficace!"</p>
            </div>
            
            <div className="bg-[#F0F0F0] p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Mohamed" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Mohamed Camara</h4>
                  <p className="text-gray-600">Étudiant en Informatique</p>
                </div>
              </div>
              <p className="text-gray-700">"Je cherchais un colocataire sérieux pour partager un appartement près du campus. En une semaine, j'ai trouvé la personne idéale sur LoguiStud."</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">LoguiStud</h4>
              <p className="text-gray-400">La plateforme de colocation étudiante en Guinée.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Accueil</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">À propos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Comment ça marche</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Politique de confidentialité</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <p className="text-gray-400 mb-2">contact@loguistud.gn</p>
              <p className="text-gray-400 mb-2">+224 623 45 67 89</p>
              <p className="text-gray-400">Conakry, Guinée</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2025 LoguiStud. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EspaceEtudiants;