import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faBell, faChevronDown, faUser, faCog, faSignOutAlt,
  faTachometerAlt, faPlusCircle, faEnvelope, faCalendarAlt,
  faChartLine, faWallet, faQuestionCircle, faHeadset,
  faPlus, faArrowUp, faCircle, faCheckCircle, faArrowRight,
  faEye, faEdit, faTrash, faFilter, faSearch, faSyncAlt,
  faTimes, faEllipsisV, faCheck, faClock, faExclamationTriangle,
  faPaperPlane, faReply, faArchive, faStar, faPhone, faVideo,
  faEllipsisH, faPaperclip, faSmile, faCircle as faCircleSolid,
  faCheckDouble
} from '@fortawesome/free-solid-svg-icons';
import { listeConversations } from '../services/conversationService';
import AuthContext from '../context/AuthContext';
import { NavLink, Outlet } from 'react-router-dom';
import socket from '../services/socket';

const Messagerie = () => {
  const [menuUtilisateurOuvert, setMenuUtilisateurOuvert] = useState(false);
  const [filtreOuvert, setFiltreOuvert] = useState(false);
  const [filtres, setFiltres] = useState({
    statut: 'tous',
    annonce: 'toutes'
  });
  const [recherche, setRecherche] = useState('');
  const [conversationActive, setConversationActive] = useState(null);
  const [nouveauMessage, setNouveauMessage] = useState({});
  const { user, lien, loading } = useContext(AuthContext);
  const [mesConversations, setMesConversations] = useState([]);


useEffect(() => {
  // Récupération de la liste des conversation
  listeConversations().then(data => {
    if (data.success) {
      setMesConversations(data.conversations);
      const conversationIDs = data.conversations.map(conv => conv._id);

      // Rejoindre toutes les conversations
      socket.emit('joindreConversation', conversationIDs);

      // Listener nommé
      const handleConfirmation = (confirmation) => {
        console.log(confirmation);
      };
      socket.on('confirmationAjout', handleConfirmation);

      // Suppression du listener pour éviter doublons
      return () => {
        socket.off('confirmationAjout', handleConfirmation);
      };
    } else {
      alert(data.message);
    }
  });
}, []);


  // Mise à jour dernier message
  const updateDernierMessage = (conversationId, contenu) => {
    setMesConversations(prev =>
      prev.map(conv => conv._id === conversationId ? { ...conv, dernierMessage: contenu } : conv)
    )
  }

  // Formater la date complète
  const formaterDateComplete = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Envoyer un nouveau message
  // const envoyerMessage = () => {
  //   if (!nouveauMessage.trim() || !conversationActive) return;

  //   const nouveauMsg = {
  //     id: Math.max(...conversationActive.messages.map(m => m.id)) + 1,
  //     texte: nouveauMessage,
  //     date: new Date().toISOString(),
  //     expediteur: "moi"
  //   };

  //   setConversations(conversations.map(conv => {
  //     if (conv.id === conversationActive.id) {
  //       return {
  //         ...conv,
  //         messages: [...conv.messages, nouveauMsg],
  //         dateDernierMessage: new Date().toISOString(),
  //         nonLus: 0
  //       };
  //     }
  //     return conv;
  //   }));

  //   setConversationActive({
  //     ...conversationActive,
  //     messages: [...conversationActive.messages, nouveauMsg],
  //     nonLus: 0
  //   });

  //   setNouveauMessage('');
  // };

  // Marquer une conversation comme lue
  // const marquerCommeLue = (conversationId) => {
  //   setConversations(conversations.map(conv => {
  //     if (conv.id === conversationId) {
  //       return { ...conv, nonLus: 0, statut: "recent" };
  //     }
  //     return conv;
  //   }));

  //   if (conversationActive && conversationActive.id === conversationId) {
  //     setConversationActive({ ...conversationActive, nonLus: 0 });
  //   }
  // };

  // // Obtenir le dernier message d'une conversation
  // const getDernierMessage = (messages) => {
  //   const dernierMsg = messages[messages.length - 1];
  //   return dernierMsg.texte.length > 50
  //     ? dernierMsg.texte.substring(0, 50) + '...'
  //     : dernierMsg.texte;
  // };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Barre de navigation */}
      {/* <Navbar/> */}

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">


          {/* Contenu principal - Page Messages */}
          <main className="flex-1">
            {/* En-tête */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
                  <p className="text-gray-600">Communiquez avec les étudiants intéressés par vos annonces</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <FontAwesomeIcon icon={faSyncAlt} />
                  </button>
                </div>
              </div>
            </div>

            {/* Filtres et recherche */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent"
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setFiltreOuvert(!filtreOuvert)}
                  >
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500" />
                    <span>Filtrer</span>
                    <FontAwesomeIcon icon={filtreOuvert ? faChevronDown : faChevronDown} className="text-gray-500" />
                  </button>

                  <button className="p-2 text-gray-500 hover:text-gray-700" onClick={() => {
                    setFiltres({ statut: 'tous', annonce: 'toutes' });
                    setRecherche('');
                  }}>
                    <FontAwesomeIcon icon={faSyncAlt} />
                  </button>
                </div>
              </div>

              {/* Panneau de filtres détaillés */}
              {filtreOuvert && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent"
                        value={filtres.statut}
                        onChange={(e) => setFiltres({ ...filtres, statut: e.target.value })}
                      >
                        <option value="tous">Tous les messages</option>
                        <option value="non_lus">Non lus</option>
                        <option value="recent">Récents</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Annonce</label>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent"
                        value={filtres.annonce}
                        onChange={(e) => setFiltres({ ...filtres, annonce: e.target.value })}
                      >
                        <option value="toutes">Toutes les annonces</option>
                        {annoncesUniques.map((annonce, index) => (
                          <option key={index} value={annonce.id}>{annonce.titre}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Interface de messagerie */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row h-[600px]">
                {/* Liste des conversations */}
                <div className="md:w-1/3 border-r border-gray-200 overflow-y-auto">
                  <div className="p-4+ border-b border-gray-200">
                    <h2 className="font-bold text-gray-800">Conversations</h2>
                  </div>
                  {
                    mesConversations.map((c, i) => (
                      <NavLink
                        key={c._id}
                        to={c._id}
                        onClick={() => setConversationActive(c._id)}
                        className="hover:bg-blue-50 w-full py-2">
                        <div className='py-2 px-4 w-full flex gap-3 items-center hover:bg-gray-50'>
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img src={lien + '/' + c.participants[1].compte.photoProfil} alt={c.participants[1].compte.prenom} />
                          </div>
                          <div>
                            <h3 className='font-medium'>{c.participants[1].compte.prenom + ' ' + c.participants[1].compte.nom}</h3>
                            <p className='text-gray-600'>{c.dernierMessage}</p>
                          </div>
                        </div>
                      </NavLink>
                    ))
                  }

                  {/* {conversationsTriees.length === 0 ? (

                    <div className="text-center py-10 px-4">
                      <FontAwesomeIcon icon={faEnvelope} className="text-gray-300 text-4xl mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune conversation</h3>
                      <p className="text-gray-500">
                        {recherche || filtres.statut !== 'tous' || filtres.annonce !== 'toutes' 
                          ? "Aucune conversation ne correspond à vos critères"
                          : "Vous n'avez pas encore de messages"
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {conversationsTriees.map((conversation) => (
                        <div 
                          key={conversation.id}
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition ${conversationActive?.id === conversation.id ? 'bg-blue-50' : ''}`}
                          onClick={() => {
                            setConversationActive(conversation);
                            marquerCommeLue(conversation.id);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={conversation.utilisateur.avatar} alt={conversation.utilisateur.nom} />
                              </div>
                              {conversation.utilisateur.verifie && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                  <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium text-gray-900 truncate">
                                  {conversation.utilisateur.nom}
                                </h3>
                                <span className="text-xs text-gray-500">
                                  {formaterDate(conversation.dateDernierMessage)}
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-600 truncate mb-1">
                                {getDernierMessage(conversation.messages)}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {conversation.annonce.titre}
                                </span>
                                
                                {conversation.nonLus > 0 && (
                                  <span className="bg-[#F6A34A] text-white text-xs px-2 py-0.5 rounded-full">
                                    {conversation.nonLus}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )} */}
                </div>

                {/* Conversation active */}
                {/* <div className="md:w-2/3 flex flex-col border-8 border-amber-500">
                  {conversationActive ? (
                    <>
                      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img src={conversationActive.utilisateur.avatar} alt={conversationActive.utilisateur.nom} />
                            </div>
                            {conversationActive.utilisateur.verifie && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {conversationActive.utilisateur.nom}
                            </h3>
                            <p className="text-xs text-gray-500">
                              En rapport avec "{conversationActive.annonce.titre}"
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faPhone} />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faVideo} />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faEllipsisH} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        <div className="space-y-4">
                          {conversationActive.messages.map((message) => (
                            <div 
                              key={message.id}
                              className={`flex ${message.expediteur === 'moi' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${message.expediteur === 'moi' 
                                  ? 'bg-[#2C5CD5] text-white rounded-br-none' 
                                  : 'bg-white border border-gray-200 rounded-bl-none'
                                }`}
                              >
                                <p>{message.texte}</p>
                                <div className={`text-xs mt-1 ${message.expediteur === 'moi' ? 'text-blue-100' : 'text-gray-500'} text-right`}>
                                  {formaterDate(message.date)}
                                  {message.expediteur === 'moi' && (
                                    <FontAwesomeIcon icon={faCheckDouble} className="ml-1" />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faPaperclip} />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faSmile} />
                          </button>
                          
                          <input
                            type="text"
                            placeholder="Écrivez votre message..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent"
                            value={nouveauMessage}
                            onChange={(e) => setNouveauMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && envoyerMessage()}
                          />
                          
                          <button 
                            className="p-2 bg-[#2C5CD5] text-white rounded-lg hover:bg-[#2351C0] transition"
                            onClick={envoyerMessage}
                            disabled={!nouveauMessage.trim()}
                          >
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center p-4">
                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-300 text-5xl mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune conversation sélectionnée</h3>
                        <p className="text-gray-500">Sélectionnez une conversation pour afficher les messages</p>
                      </div>
                    </div>
                  )}
                </div> */}
                <Outlet context={{ updateDernierMessage }} />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Animations personnalisées */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
        }
        
        .progress-bar {
          height: 6px;
          border-radius: 3px;
          background-color: #e0e0e0;
          overflow: hidden;
        }
        
        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, #2C5CD5 0%, #3CB371 100%);
          transition: width 0.6s ease;
        }
      `}</style>
    </div>
  );
};

export default Messagerie;