import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faEllipsisH, faPaperclip, faPaperPlane, faPhone, faSmile, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext, useParams } from 'react-router-dom'
import { Loading } from '../autres/Loading'
import { conversation, envoyerMessage, listeMessages, mesConversations } from '../../services/conversationService'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import socket from '../../services/socket'

const Conversation = () => {
  const [myLoading, setMyLoading] = useState(true);
  const { id } = useParams();
  const [texte, setTexte] = useState('');
  const [messages, setMessages] = useState([]);
  const { lien, user } = useContext(AuthContext)
  const [destinataire, setDestinataire] = useState({});
  const messagesRef = useRef(null);
  const { updateDernierMessage } = useOutletContext();



  // Scroll en bas pour voir le dernier message
  const scrollBas = ()=> {
    messagesRef.current?.scrollIntoView({behavior: "smooth"});
  }


  // Envoie de message
  const handleEnvoieMessage = async (e) => {
    e.preventDefault();
    if (!texte.trim()) {
      return alert('Le message ne doit pas être vide')
    }


    const res = await envoyerMessage({ conversation: id, contenu: texte });


    if (res.success) {
      scrollBas()
      // Signal vers socketio
      socket.emit('envoiMessage', res.data);
      updateDernierMessage(id, res.data.contenu);
    } else {
      return alert(res.message);
    }
  };

  // Formater la date
  const formaterDate = (str) => {
    const date = new Date(str);
    const heures = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes();

    return `à ${heures}:${minutes}`

  }

  //   // Formater la date complète
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


  useEffect(() => {
    const getMessages = async () => {
      const res = await mesConversations(id);
      if (res.success) {
        // alert('reussite')
        setMessages(res.messages);
        scrollBas();
        // console.log("UN EXEMPLE DE OBJECTS MESSAGES:", res.messages[0])
        setDestinataire(res.messages[0]?.conversation?.participants[1].compte);
        // const conversationIDs = await res.messages.map(m => m.conversation);
        // console.log('VOICI LA LISTE DES IDs:', conversationIDs);
        // console.log("TOUS LES MESSAGES:", res.messages);
        // console.log('MESSAGES: ', res.messages);
      } else {
        alert(res.message);
      }
    };
    getMessages();

    // Réception de nouveaux messages
    const handleNouveauMessage = (messageData) => {
      setMessages(prev => [...prev, messageData]);
    };

    socket.on('nouveau message', handleNouveauMessage);

    // Suppression du listener
    return () => {
      socket.off('nouveau message', handleNouveauMessage);
    };

  }, [id]);


  // if(loading) return <Loading/>

  return (
    <div className="md:w-2/3 flex flex-col">
      {/* {conversationActive ? ( */}

      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src={lien + '/' + destinataire.photoProfil} alt={destinataire.nom} />
            </div>
            {/* {conversationActive.utilisateur.verifie && (
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                                  </div>
                                )} */}
          </div>

          <div>
            <h3 className="font-medium text-gray-900">
              {/* {conversationActive.utilisateur.nom} */}
              {destinataire && destinataire.prenom + ' ' + destinataire.nom}
            </h3>
            <p className="text-xs text-gray-500">
              {/* En rapport avec "{conversationActive.annonce.titre}" */} en rapport avec ...
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

      {/* <div className='py-5 px-3 border-1 h-100 scroll-auto overflow-auto'>
        {messages && messages.map(m => (
          <div className=' py-1 my-5 px-3 rounded-t-lg p-1 ml-auto rounded-bl-lg bg-blue-100 w-fit max-w-100'>
            <p>{m.contenu}</p>
            <p className='text-sm text-gray-700 text-end'>{formaterDate(m.updatedAt)}</p>

          </div>

        ))
        }
      </div> */}


      <div className="p-4 overflow-y-hidden bg-gray-50">
        <div className="space-y-3 py-5 overflow-auto scroll-auto h-100">
          {messages && messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.expediteur === user._id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${message.expediteur === user._id
                  ? 'bg-[#2C5CD5] text-white rounded-br-none'
                  : 'bg-white border border-gray-200 rounded-bl-none'
                  }`}
              >
                <p>{message.contenu}</p>
                <div className={`text-xs mt-1 ${message.expediteur === user._id ? 'text-blue-100' : 'text-gray-500'} text-right`}>
                  {formaterDateComplete(message.updatedAt)}
                  {message.expediteur === user._id && (
                    <FontAwesomeIcon icon={faCheckDouble} className="ml-1" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesRef}/> {/* marque du scroll */}
        </div>
      </div>

      <form onSubmit={handleEnvoieMessage} className='bottom-0'>
        <div className="p-4 border-t border-gray-200 mt-auto  w-full">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon={faSmile} />
            </button>

            <input
              type="text"
              value={texte}
              placeholder="Écrivez votre message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2C5CD5] focus:border-transparent"
              onChange={(e) => setTexte(e.target.value)}
            // value={nouveauMessage}
            // onChange={(e) => setNouveauMessage(e.target.value)}
            // onKeyPress={(e) => e.key === 'Enter' && envoyerMessage()}
            />

            <button
              className="p-2 bg-[#2C5CD5] text-white rounded-lg hover:bg-[#2351C0] transition"
            // onClick={envoyerMessage}
            // disabled={!nouveauMessage.trim()}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </form>
      {/* ) : (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center p-4">
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-300 text-5xl mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune conversation sélectionnée</h3>
                            <p className="text-gray-500">Sélectionnez une conversation pour afficher les messages</p>
                          </div>
                        </div> */}
      {/* )} */}
    </div>
  )
}

export default Conversation