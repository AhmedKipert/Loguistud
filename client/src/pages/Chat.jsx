import React, { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import AuthContext from '../context/AuthContext';

const Chat = () => {
    const { lien } = useContext(AuthContext)
    const socket = io(lien, {
        withCredentials: true
    });

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        socket.on('message', msg => {
            setMessages(prev => [...prev, msg]);
        })

        socket.on('welcome', msg=> setText(msg))

        return () => {
            socket.off('message');
        }
    }, []);


    const envoyerMessage = () => {
        if (input)
            socket.emit('message', input);
        else
            alert('le message est vide');
    }

    return (
        <div className='p-5'>
            <h1 className='h-auto rounded bg-blue-300 text-center text-3xl p-1'>{text}</h1>
            <h1 className='text-2xl'>Chat minimal</h1>
            <ul>
                {messages.map((m, i) => (
                    <li className='my-3 border-l-2 bg- pl-2 rounded-2xl' key={i}>{m}</li>
                ))}
            </ul>
            <br />
            <input className='bg-gray-100 p-2 rounded-lg' type="text" placeholder='taper votre message' value={input} onChange={(e) => setInput(e.target.value)} />
            <br />
            <button onClick={envoyerMessage} className='mt-3 bg-blue-500 py-1 text-white hover:bg-blue-700 rounded px-5'>Envoyer</button>
        </div>
    )
}

export default Chat