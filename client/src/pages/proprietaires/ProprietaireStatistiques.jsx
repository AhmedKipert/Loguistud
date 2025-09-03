import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, faEye, faEnvelope, faCalendarAlt, 
  faWallet, faArrowUp, faArrowDown, faFilter,
  faDownload, faRefresh
} from '@fortawesome/free-solid-svg-icons';

const ProprietaireStatistiques = () => {
  const [periode, setPeriode] = useState('mois');
  const [loading, setLoading] = useState(false);

  // Données simulées pour les statistiques
  const [donneesStats, setDonneesStats] = useState({
    vues: 0,
    messages: 0,
    reservations: 0,
    revenus: 0,
    evolution: {
      vues: 0,
      messages: 0,
      reservations: 0,
      revenus: 0
    }
  });

  const graphiqueVues = [65, 59, 80, 81, 56, 55, 40, 58, 75, 82, 90, 78];
  const graphiqueMessages = [28, 48, 40, 19, 86, 27, 90, 35, 42, 58, 46, 62];
  const graphiqueReservations = [5, 7, 3, 8, 4, 12, 6, 9, 10, 7, 8, 11];

  // Simuler le chargement des données
  useEffect(() => {
    chargerStatistiques();
  }, [periode]);

  const chargerStatistiques = () => {
    setLoading(true);
    
    // Simulation d'un appel API
    setTimeout(() => {
      setDonneesStats({
        vues: 1248,
        messages: 86,
        reservations: 15,
        revenus: 8750000,
        evolution: {
          vues: 12.5,
          messages: 8.2,
          reservations: 5.7,
          revenus: 15.3
        }
      });
      setLoading(false);
    }, 800);
  };

  // Cartes de statistiques
  const cartesStats = [
    {
      titre: "Vues totales",
      valeur: donneesStats.vues,
      evolution: donneesStats.evolution.vues,
      icone: faEye,
      couleur: "#2C5CD5"
    },
    {
      titre: "Messages reçus",
      valeur: donneesStats.messages,
      evolution: donneesStats.evolution.messages,
      icone: faEnvelope,
      couleur: "#3CB371"
    },
    {
      titre: "Réservations",
      valeur: donneesStats.reservations,
      evolution: donneesStats.evolution.reservations,
      icone: faCalendarAlt,
      couleur: "#F6A34A"
    },
    {
      titre: "Revenus totaux",
      valeur: `${donneesStats.revenus.toLocaleString('fr-FR')} GNF`,
      evolution: donneesStats.evolution.revenus,
      icone: faWallet,
      couleur: "#3CB371"
    }
  ];

  // Données pour le graphique principal
  const labelsMois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

  return (
    <div className="flex-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Statistiques</h1>
          <p className="text-gray-600">Analyse des performances de vos annonces</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300 px-3 py-2">
            <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
            <select 
              className="focus:outline-none"
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
            >
              <option value="semaine">Cette semaine</option>
              <option value="mois">Ce mois</option>
              <option value="trimestre">Ce trimestre</option>
              <option value="annee">Cette année</option>
            </select>
          </div>
          
          <button 
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
            onClick={chargerStatistiques}
            disabled={loading}
          >
            <FontAwesomeIcon icon={faRefresh} className={loading ? "animate-spin" : ""} />
          </button>
          
          <button className="bg-[#2C5CD5] text-white rounded-lg px-3 py-2 hover:bg-[#1a4bbd] transition flex items-center">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cartesStats.map((carte, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">{carte.titre}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{carte.valeur}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${carte.couleur}10` }}>
                <FontAwesomeIcon icon={carte.icone} style={{ color: carte.couleur }} />
              </div>
            </div>
            <div className={`flex items-center text-sm ${carte.evolution >= 0 ? 'text-[#3CB371]' : 'text-red-500'}`}>
              <FontAwesomeIcon icon={carte.evolution >= 0 ? faArrowUp : faArrowDown} className="mr-1 text-xs" />
              <span>{Math.abs(carte.evolution)}%</span>
              <span className="text-gray-500 ml-2">vs période précédente</span>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique principal */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Performances des annonces</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#2C5CD5] mr-2"></div>
              <span>Vues</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#3CB371] mr-2"></div>
              <span>Messages</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#F6A34A] mr-2"></div>
              <span>Réservations</span>
            </div>
          </div>
        </div>
        
        <div className="h-80">
          <div className="flex items-end justify-between h-64 mt-6">
            {graphiqueVues.map((valeur, index) => (
              <div key={index} className="flex flex-col items-center w-1/12">
                <div className="flex items-end justify-center w-full" style={{ height: '180px' }}>
                  <div 
                    className="w-full bg-[#2C5CD5] rounded-t mx-1 opacity-80 hover:opacity-100 transition"
                    style={{ height: `${valeur}%` }}
                    title={`Vues: ${Math.round((valeur / 100) * 2000)}`}
                  ></div>
                  <div 
                    className="w-full bg-[#3CB371] rounded-t mx-1 opacity-80 hover:opacity-100 transition"
                    style={{ height: `${graphiqueMessages[index]}%` }}
                    title={`Messages: ${Math.round((graphiqueMessages[index] / 100) * 150)}`}
                  ></div>
                  <div 
                    className="w-full bg-[#F6A34A] rounded-t mx-1 opacity-80 hover:opacity-100 transition"
                    style={{ height: `${graphiqueReservations[index]}%` }}
                    title={`Réservations: ${Math.round((graphiqueReservations[index] / 100) * 20)}`}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{labelsMois[index]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section annonces performantes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Annonces les plus vues */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Annonces les plus vues</h2>
          <div className="space-y-4">
            {[
              { titre: "Studio moderne à Conakry", vues: 450, evolution: 15 },
              { titre: "Colocation 3 places à Kindia", vues: 320, evolution: 8 },
              { titre: "Appartement T2 à Kankan", vues: 280, evolution: 12 },
              { titre: "Chambre individuelle à Conakry", vues: 198, evolution: -3 }
            ].map((annonce, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{annonce.titre}</h3>
                  <p className="text-sm text-gray-500">{annonce.vues} vues</p>
                </div>
                <div className={`flex items-center text-sm ${annonce.evolution >= 0 ? 'text-[#3CB371]' : 'text-red-500'}`}>
                  <FontAwesomeIcon icon={annonce.evolution >= 0 ? faArrowUp : faArrowDown} className="mr-1 text-xs" />
                  <span>{Math.abs(annonce.evolution)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion par annonce */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Taux de conversion</h2>
          <div className="space-y-4">
            {[
              { titre: "Studio moderne à Conakry", vues: 450, reservations: 8, taux: 1.8 },
              { titre: "Colocation 3 places à Kindia", vues: 320, reservations: 5, taux: 1.6 },
              { titre: "Appartement T2 à Kankan", vues: 280, reservations: 3, taux: 1.1 },
              { titre: "Chambre individuelle à Conakry", vues: 198, reservations: 4, taux: 2.0 }
            ].map((annonce, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-800">{annonce.titre}</h3>
                  <span className="text-sm font-medium text-gray-800">{annonce.taux}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#3CB371] h-2 rounded-full" 
                    style={{ width: `${annonce.taux * 10}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{annonce.vues} vues</span>
                  <span>{annonce.reservations} réservations</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProprietaireStatistiques;