import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faSearch, faFilter, 
  faCheckCircle, faClock, faTimesCircle,
  faEye, faComment, faEllipsisVertical,
  faDownload, faRefresh, faArrowUp, faArrowDown
} from '@fortawesome/free-solid-svg-icons';

const ProprietaireReservations = () => {
  const [filtreStatut, setFiltreStatut] = useState('tous');
  const [recherche, setRecherche] = useState('');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulation de données de réservations
  useEffect(() => {
    setLoading(true);
    
    // Données simulées en attendant l'intégration backend
    const reservationsSimulees = [
      {
        _id: 1,
        annonce: {
          titre: "Studio moderne",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          lieu: "Conakry"
        },
        client: {
          nom: "Aïssatou Bah",
          email: "aissatou.bah@example.com",
          telephone: "+224 621 45 67 89",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        dateDebut: "2023-11-01",
        dateFin: "2024-06-30",
        duree: "8 mois",
        prixTotal: "6 000 000 GNF",
        acompte: "1 500 000 GNF",
        statut: "confirmée",
        dateReservation: "2023-10-15",
        messages: 5
      },
      {
        _id: 2,
        annonce: {
          titre: "Colocation 3 places",
          image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          lieu: "Kindia"
        },
        client: {
          nom: "Mohamed Camara",
          email: "mohamed.camara@example.com",
          telephone: "+224 622 34 56 78",
          avatar: "https://randomuser.me/api/portraits/men/22.jpg"
        },
        dateDebut: "2023-11-05",
        dateFin: "2024-07-15",
        duree: "8.5 mois",
        prixTotal: "3 825 000 GNF",
        acompte: "0 GNF",
        statut: "en_attente",
        dateReservation: "2023-10-18",
        messages: 3
      },
      {
        _id: 3,
        annonce: {
          titre: "Appartement T2",
          image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          lieu: "Kankan"
        },
        client: {
          nom: "Sékou Traoré",
          email: "sekou.traore@example.com",
          telephone: "+224 623 45 67 89",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        dateDebut: "2023-12-01",
        dateFin: "2024-05-31",
        duree: "6 mois",
        prixTotal: "3 600 000 GNF",
        acompte: "900 000 GNF",
        statut: "confirmée",
        dateReservation: "2023-10-20",
        messages: 8
      },
      {
        _id: 4,
        annonce: {
          titre: "Chambre individuelle",
          image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          lieu: "Conakry"
        },
        client: {
          nom: "Fatoumata Diallo",
          email: "fatoumata.diallo@example.com",
          telephone: "+224 624 56 78 90",
          avatar: "https://randomuser.me/api/portraits/women/45.jpg"
        },
        dateDebut: "2023-11-10",
        dateFin: "2024-04-10",
        duree: "5 mois",
        prixTotal: "1 750 000 GNF",
        acompte: "0 GNF",
        statut: "annulee",
        dateReservation: "2023-10-22",
        messages: 2
      }
    ];
    
    setReservations(reservationsSimulees);
    setLoading(false);
  }, []);

  // Filtrer les réservations selon le statut et la recherche
  const reservationsFiltrees = reservations.filter(reservation => {
    const correspondRecherche = 
      reservation.annonce.titre.toLowerCase().includes(recherche.toLowerCase()) || 
      reservation.client.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      reservation.annonce.lieu.toLowerCase().includes(recherche.toLowerCase());
    
    const correspondStatut = filtreStatut === 'tous' || reservation.statut === filtreStatut;
    
    return correspondRecherche && correspondStatut;
  });

  // Fonction pour formater la date
  const formaterDate = (dateStr) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  // Fonction pour obtenir la classe de badge selon le statut
  const getBadgeClass = (statut) => {
    switch(statut) {
      case 'confirmée':
        return 'bg-[#3CB371]/10 text-[#3CB371]';
      case 'en_attente':
        return 'bg-[#F6A34A]/10 text-[#F6A34A]';
      case 'annulee':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Fonction pour obtenir l'icône selon le statut
  const getStatutIcon = (statut) => {
    switch(statut) {
      case 'confirmée':
        return faCheckCircle;
      case 'en_attente':
        return faClock;
      case 'annulee':
        return faTimesCircle;
      default:
        return faClock;
    }
  };

  // Fonction pour obtenir le texte du statut
  const getStatutText = (statut) => {
    switch(statut) {
      case 'confirmée':
        return 'Confirmée';
      case 'en_attente':
        return 'En attente';
      case 'annulee':
        return 'Annulée';
      default:
        return statut;
    }
  };

  // Statistiques des réservations
  const statsReservations = {
    total: reservations.length,
    confirmees: reservations.filter(r => r.statut === 'confirmée').length,
    enAttente: reservations.filter(r => r.statut === 'en_attente').length,
    annulees: reservations.filter(r => r.statut === 'annulee').length,
    revenusAttendus: reservations
      .filter(r => r.statut === 'confirmée')
      .reduce((total, r) => total + parseInt(r.prixTotal.replace(/\s/g, ''), 10), 0)
  };

  return (
    <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Réservations</h1>
        <p className="text-gray-600">Gérez les réservations de vos logements</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <h3 className="text-2xl font-bold text-gray-800">{statsReservations.total}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#2C5CD5]/10 flex items-center justify-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-[#2C5CD5]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Confirmées</p>
              <h3 className="text-2xl font-bold text-gray-800">{statsReservations.confirmees}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#3CB371]/10 flex items-center justify-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-[#3CB371]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">En attente</p>
              <h3 className="text-2xl font-bold text-gray-800">{statsReservations.enAttente}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#F6A34A]/10 flex items-center justify-center">
              <FontAwesomeIcon icon={faClock} className="text-[#F6A34A]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Revenus attendus</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {statsReservations.revenusAttendus.toLocaleString('fr-FR')} GNF
              </h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#3CB371]/10 flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowUp} className="text-[#3CB371]" />
            </div>
          </div>
        </div>
      </div>

      {/* Barre d'actions et de filtres */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une réservation..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
              <select 
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#2C5CD5]/20 focus:border-[#2C5CD5]"
                value={filtreStatut}
                onChange={(e) => setFiltreStatut(e.target.value)}
              >
                <option value="tous">Tous les statuts</option>
                <option value="confirmée">Confirmées</option>
                <option value="en_attente">En attente</option>
                <option value="annulee">Annulées</option>
              </select>
            </div>

            <button className="bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition">
              <FontAwesomeIcon icon={faRefresh} />
            </button>

            <button className="bg-[#2C5CD5] text-white rounded-lg px-3 py-2 hover:bg-[#1a4bbd] transition flex items-center">
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Liste des réservations */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ) : reservationsFiltrees.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Aucune réservation trouvée</h3>
            <p className="text-gray-500">
              {recherche || filtreStatut !== 'tous' 
                ? "Aucune réservation ne correspond à vos critères de recherche." 
                : "Vous n'avez aucune réservation pour le moment."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {reservationsFiltrees.map(reservation => (
              <div key={reservation._id} className="p-4 md:p-6 hover:bg-gray-50 transition">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image de l'annonce */}
                  <div className="md:w-32 flex-shrink-0">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img 
                        src={reservation.annonce.image} 
                        alt={reservation.annonce.titre}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Détails de la réservation */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {reservation.annonce.titre}
                        </h3>
                        <p className="text-gray-600 mb-2">{reservation.annonce.lieu}</p>
                      </div>
                      <div className="flex items-center space-x-2 mb-3 md:mb-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getBadgeClass(reservation.statut)}`}>
                          <FontAwesomeIcon icon={getStatutIcon(reservation.statut)} className="mr-1" />
                          {getStatutText(reservation.statut)}
                        </span>
                        <div className="relative">
                          <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
                            <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Client</p>
                        <div className="flex items-center mt-1">
                          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden mr-2">
                            <img src={reservation.client.avatar} alt={reservation.client.nom} />
                          </div>
                          <p className="font-medium text-gray-800">{reservation.client.nom}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Période</p>
                        <p className="font-medium text-gray-800">
                          {formaterDate(reservation.dateDebut)} - {formaterDate(reservation.dateFin)}
                        </p>
                        <p className="text-sm text-gray-500">{reservation.duree}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Prix total</p>
                        <p className="font-medium text-gray-800">{reservation.prixTotal}</p>
                        <p className="text-sm text-gray-500">Acompte: {reservation.acompte}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Réservée le</p>
                        <p className="font-medium text-gray-800">
                          {formaterDate(reservation.dateReservation)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-2 bg-[#2C5CD5]/10 text-[#2C5CD5] rounded-lg text-sm font-medium hover:bg-[#2C5CD5]/20 transition flex items-center">
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        Voir les détails
                      </button>
                      <button className="px-3 py-2 bg-[#3CB371]/10 text-[#3CB371] rounded-lg text-sm font-medium hover:bg-[#3CB371]/20 transition flex items-center">
                        <FontAwesomeIcon icon={faComment} className="mr-2" />
                        Message ({reservation.messages})
                      </button>
                      {reservation.statut === 'en_attente' && (
                        <>
                          <button className="px-3 py-2 bg-[#3CB371]/10 text-[#3CB371] rounded-lg text-sm font-medium hover:bg-[#3CB371]/20 transition">
                            Confirmer
                          </button>
                          <button className="px-3 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition">
                            Refuser
                          </button>
                        </>
                      )}
                      {reservation.statut === 'confirmée' && (
                        <button className="px-3 py-2 bg-[#F6A34A]/10 text-[#F6A34A] rounded-lg text-sm font-medium hover:bg-[#F6A34A]/20 transition">
                          Modifier
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProprietaireReservations;