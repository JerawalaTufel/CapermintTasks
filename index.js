    const express = require('express')
    const { connectToMongoDB } = require('./src/config/dbConnection');
    const routes = require('./src/routes/routes');
    const i18nMiddleware = require('./src/i18n/i18n')
    const http = require('http');
    const path = require('path');
    const { Server } = require('socket.io');

    require('dotenv').config();

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);    
    const port = process.env.PORT || 5000

    connectToMongoDB()

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(i18nMiddleware);
    app.use(routes)

    // Set the 'views' directory
    app.set('views', path.join(__dirname, 'src/views'));

    // Set EJS as the view engine
    app.set('view engine', 'ejs');
    
    // Socket.IO configuration
    io.on('connection', (socket) => {
        console.log('a user connected');
    
        socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast to all users
        });
    
        socket.on('disconnect', () => {
        console.log('user disconnected');
        });
    });
  
  server.listen(port, () => console.log(`Example app listening on port ${port}!`));
