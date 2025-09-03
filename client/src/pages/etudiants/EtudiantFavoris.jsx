import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaBell, FaFilter, FaSort, FaMapMarkerAlt, FaChevronRight, FaBars, FaSearch } from 'react-icons/fa';

const EtudiantFavoris = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Colocation étudiante à Dixinn",
      price: "1 250 000 GNF",
      location: "10 min de l'UGANC",
      image: "https://via.placeholder.com/400x300",
      tags: ["2 chambres", "Wi-Fi"],
      isNew: true,
      isFavorite: true
    },
    {
      id: 2,
      title: "Studio meublé à Matam",
      price: "1 800 000 GNF",
      location: "15 min en taxi",
      image: "https://via.placeholder.com/400x300",
      tags: ["Studio", "Climatisé"],
      isFavorite: true
    },
    {
      id: 3,
      title: "Chambre chez l'habitant",
      price: "900 000 GNF",
      location: "Ratoma, 12 min à pied",
      image: "https://via.placeholder.com/400x300",
      tags: ["Cuisine", "Gardien"],
      isFavorite: true
    }
  ]);

  const toggleFavorite = (id) => {
    setFavorites(favorites.map(fav => 
      fav.id === id ? { ...fav, isFavorite: !fav.isFavorite } : fav
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* En-tête */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <button className="md:hidden text-gray-600">
          <FaBars className="text-xl" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Mes favoris</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaBell className="text-gray-600 text-xl" />
            <div className="absolute w-2 h-2 bg-red-500 rounded-full top-0 right-0"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Profil" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="p-6">
        {/* En-tête des favoris */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            <FaHeart className="text-red-500 inline mr-2" />
            Vous avez {favorites.filter(f => f.isFavorite).length} logements en favoris
          </h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
              <FaFilter className="inline mr-1" /> Filtrer
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
              <FaSort className="inline mr-1" /> Trier
            </button>
          </div>
        </div>

        {/* Liste des favoris */}
        {favorites.filter(f => f.isFavorite).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.filter(f => f.isFavorite).map(favorite => (
              <div 
                key={favorite.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <button 
                  className="absolute top-3 right-3 z-10 text-red-500 transition-all duration-200 hover:scale-125 hover:text-red-600"
                  onClick={() => toggleFavorite(favorite.id)}
                >
                  {favorite.isFavorite ? (
                    <FaHeart className="text-xl" />
                  ) : (
                    <FaRegHeart className="text-xl" />
                  )}
                </button>
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img src={favorite.image} alt="Logement" className="w-full h-full object-cover" />
                  {favorite.isNew && (
                    <div className="absolute top-2 left-2 bg-[#2C5CD5] text-white text-xs px-2 py-1 rounded">
                      Nouveau
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{favorite.title}</h3>
                    <span className="font-bold text-[#3CB371]">{favorite.price}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{favorite.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {favorite.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-[#2C5CD5] hover:text-[#2351C0]">
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaHeart className="text-gray-300 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">Aucun logement en favoris</h3>
            <p className="text-gray-400 mb-4">Ajoutez des logements à vos favoris en cliquant sur l'icône cœur</p>
            <a 
              href="#" 
              className="inline-block px-4 py-2 bg-[#2C5CD5] text-white rounded-md hover:bg-[#2351C0]"
            >
              <FaSearch className="inline mr-1" /> Rechercher des logements
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default EtudiantFavoris;