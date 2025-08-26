require('dotenv').config();
const cors = require('cors');
const cookie = require('cookie')
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
const User = require('./models/User');

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST']
    }
}); 

const connectDB = require('./config/db');
const etudiantRoute = require('./routes/etudiantRoute');
const proprietaireRoute = require('./routes/proprietaireRoute');
const logementRoute = require('./routes/logementRoute');
const userRoute = require('./routes/userRoute');
const conversationRoute = require('./routes/conversationRoute');

const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3002;
const path = require('path');
const jwt = require('jsonwebtoken')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

io.use( async(socket, next)=> {
    const cookies = socket.handshake.headers.cookie;

    if(!cookies) return next(new Error('Non autorisé: pas de token'));
    
    const parsed = cookie.parse(cookies);
    const token = parsed.token;

    if(!token) return next(new Error('Non autorisé: pas de token'));

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const userSocket = await User.findById(user.id).select('-motdepasse -__v').populate('compte', '-motdepasse -__v');
        socket.user = userSocket;
        // console.log('User socket: ', socket.user)
        next();

    } catch(error) {
        next(new Error('Token invalide'));
    }
})
io.on('connection', socket => {
    console.log('Un user vient de se connecter: ', socket.user.compte.prenom);
    // Connexion
    // socket.emit('welcome', 'Bienvenue sur l\'applicaton de chat en temps réel');

    // Reception de message
    socket.on('message', msg => { 
        io.emit('message', msg);
    });
    
    // Deconnexion
    // socket.on('disconnect', ()=> {
    //     console.log('Un user vient de se déconnecter')
    // })

});

app.use('/api/etudiants', etudiantRoute);
app.use('/api/proprietaires', proprietaireRoute);
app.use('/api/logements', logementRoute);
app.use('/api/auth', userRoute);
app.use('/api', conversationRoute);

connectDB();

server.listen(PORT, ()=> {
    console.log('Serveur en écoute au port ', PORT, '...');
});