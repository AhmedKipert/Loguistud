import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaSearch, FaPaperclip, FaCamera, FaPaperPlane, FaEllipsisV, FaPhone, FaVideo } from 'react-icons/fa';

const Messagerie = () => {
  const [activeConversation, setActiveConversation] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const conversations = [
    {
      id: 0,
      name: "M. Diallo (Propriétaire)",
      avatar: "https://via.placeholder.com/150",
      online: true,
      unread: 2,
      lastMessage: "La chambre est toujours disponible...",
      lastTime: "10:30"
    },
    {
      id: 1,
      name: "Aïcha (Étudiante)",
      avatar: "https://via.placeholder.com/150",
      online: false,
      unread: 0,
      lastMessage: "Je suis intéressée par la colocation...",
      lastTime: "Hier"
    },
    {
      id: 2,
      name: "Mme Camara (Propriétaire)",
      avatar: "https://via.placeholder.com/150",
      online: true,
      unread: 0,
      lastMessage: "Quand souhaitez-vous visiter ?",
      lastTime: "Lundi"
    }
  ];

  const initialMessages = {
    0: [
      { id: 1, text: "Bonjour, la chambre est toujours disponible. Elle est située à 10 minutes de l'université.", sent: false, time: "10:15" },
      { id: 2, text: "Bonjour M. Diallo, merci pour votre réponse. Quel est le prix du loyer ?", sent: true, time: "10:20" },
      { id: 3, text: "Le loyer est de 1.200.000 GNF par mois, charges comprises. Je peux vous envoyer des photos si vous voulez.", sent: false, time: "10:25" },
      { id: 4, text: "Oui, je suis intéressé par les photos. Est-ce possible de visiter ce week-end ?", sent: true, time: "10:28" },
      { id: 5, text: "Bien sûr, voici quelques photos :", sent: false, time: "10:30" }
    ],
    1: [
      { id: 1, text: "Bonjour, je suis intéressée par votre annonce de colocation.", sent: false, time: "09:30" },
      { id: 2, text: "Bonjour Aïcha, la colocation est toujours disponible. Vous êtes combien ?", sent: true, time: "09:45" }
    ],
    2: [
      { id: 1, text: "Bonjour, concernant votre annonce, est-ce que le logement est toujours disponible ?", sent: true, time: "14:20" },
      { id: 2, text: "Oui, il est toujours disponible. Quand souhaitez-vous visiter ?", sent: false, time: "14:35" }
    ]
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages[activeConversation] ? messages[activeConversation].length + 1 : 1,
      text: message,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), newMessage]
    }));

    setMessage('');
    setIsTyping(true);

    // Simuler une réponse après 1-2 secondes
    setTimeout(() => {
      const responses = [
        "Merci pour votre message.",
        "Je vais vérifier et vous répondre.",
        "Pouvez-vous préciser votre demande ?",
        "Je suis disponible pour une visite demain.",
        "Le logement est toujours disponible."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const responseMessage = {
        id: messages[activeConversation].length + 2,
        text: randomResponse,
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [activeConversation]: [...prev[activeConversation], responseMessage]
      }));

      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const changeConversation = (id) => {
    setActiveConversation(id);
    setIsTyping(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-6 border border-8 border-red-600">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row" style={{ height: 'calc(100vh - 130px)' }}>
            {/* Liste des conversations */}
            <div className="w-full md:w-1/3 border-r border-gray-200 bg-gray-50">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                <div className="relative mt-3">
                  <input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    className="w-full px-4 py-2 pl-10 bg-white rounded-lg border border-gray-200 focus:border-[#2C5CD5] focus:outline-none"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              <div className="overflow-y-auto" style={{ height: 'calc(100% - 70px)' }}>
                {conversations.map(conv => (
                  <div
                    key={conv.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer flex items-center ${activeConversation === conv.id ? 'bg-[rgba(44,92,213,0.1)] border-l-2 border-[#2C5CD5]' : 'hover:bg-[rgba(44,92,213,0.05)]'}`}
                    onClick={() => changeConversation(conv.id)}
                  >
                    <div className="relative mr-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                        <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                      </div>
                      <div className={`online-indicator ${conv.online ? 'bg-[#10B981]' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 truncate">{conv.name}</h3>
                        <span className="text-xs text-gray-500">{conv.lastTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <div className="unread-badge">{conv.unread}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone de chat */}
            <div className="w-full md:w-2/3 flex flex-col">
              {/* En-tête du chat */}
              {activeConversation !== null && (
                <>
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <div className="relative mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={conversations[activeConversation].avatar} alt={conversations[activeConversation].name} className="w-full h-full object-cover" />
                      </div>
                      <div className={`online-indicator ${conversations[activeConversation].online ? 'bg-[#10B981]' : 'bg-gray-400'}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{conversations[activeConversation].name}</h3>
                      <p className="text-xs text-gray-500">{conversations[activeConversation].online ? 'En ligne' : 'Hors ligne'}</p>
                    </div>
                    <div className="ml-auto flex space-x-2">
                      <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <FaPhone className="text-gray-600" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <FaVideo className="text-gray-600" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                        <FaEllipsisV className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="text-center my-4">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Aujourd'hui</span>
                    </div>

                    {messages[activeConversation]?.map(msg => (
                      <div key={msg.id} className={`flex mb-4 ${msg.sent ? 'justify-end' : ''}`}>
                        {!msg.sent && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                            <img src={conversations[activeConversation].avatar} alt={conversations[activeConversation].name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <div className={`px-4 py-2 max-w-xs md:max-w-md ${msg.sent ? 'bg-[#2C5CD5] text-white rounded-[18px_18px_0_18px]' : 'bg-gray-100 text-gray-800 rounded-[18px_18px_18px_0]'}`}>
                            <p>{msg.text}</p>
                          </div>
                          <span className={`text-xs text-gray-500 mt-1 block ${msg.sent ? 'text-right' : ''}`}>{msg.time}</span>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex mb-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                          <img src={conversations[activeConversation].avatar} alt={conversations[activeConversation].name} className="w-full h-full object-cover" />
                        </div>
                        <div className="typing-indicator px-4 py-2">
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                          <div className="typing-dot"></div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Zone de saisie */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center">
                      <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center mr-2">
                        <FaPaperclip className="text-gray-600" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center mr-2">
                        <FaCamera className="text-gray-600" />
                      </button>
                      <input
                        type="text"
                        placeholder="Écrivez un message..."
                        className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:border-[#2C5CD5] focus:outline-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        // onKeyPress={handleKeyPress}
                      />
                      <button
                        className="w-10 h-10 rounded-full bg-[#2C5CD5] hover:bg-[#2351C0] text-white flex items-center justify-center ml-2"
                        onClick={handleSendMessage}
                      >
                        <FaPaperPlane />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .online-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid white;
          position: absolute;
          bottom: 0;
          right: 0;
        }
        
        .typing-indicator {
          display: inline-block;
        }
        
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: #94a3b8;
          border-radius: 50%;
          display: inline-block;
          margin-right: 4px;
          animation: typingAnimation 1.4s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
          margin-right: 0;
        }
        
        @keyframes typingAnimation {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        
        .unread-badge {
          width: 20px;
          height: 20px;
          background-color: #EF4444;
          color: white;
          border-radius: 50%;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default Messagerie;