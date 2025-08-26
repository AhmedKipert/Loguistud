import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faPaperclip, faPaperPlane, faPhone, faSmile, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { Loading } from '../autres/Loading'
import { conversation } from '../../services/conversationService'


const Conversation = () => {
    const [loading, setLoading] = useState(true);
    const [voirConversation, setVoirConversation] = useState(false);
    const { id } = useParams();

    useEffect(() => {
      conversation(id)
      .then(data => {
        if(data.success) {
          console.log(data.conversation)
          alert(data.message)
          setLoading(false);
        } else {
          alert(data.message);
          setLoading(false);
        }
      });
    }, []);

    if(loading) return <Loading/>

    return (
        <div className="md:w-2/3 flex flex-col border-8 border-amber-500">
            {/* {conversationActive ? ( */}
            <>
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                image avatar et nom {/* <img src={conversationActive.utilisateur.avatar} alt={conversationActive.utilisateur.nom} /> */}
                            </div>
                            {/* {conversationActive.utilisateur.verifie && (
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                                  </div>
                                )} */}
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-900">
                                {/* {conversationActive.utilisateur.nom} */} utilisateur.nom
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

                {/* <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
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
                          </div> */}

                <div className="p-4 border-t border-gray-200 mt-auto border-8 w-full">
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
            </>
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