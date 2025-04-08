import express from "express";
import http from "http";
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Hantera klientanslutning
io.on('connection', (socket) => {
    console.log('En användare anslöt:', socket.id);

    // Ta emot meddelanden från klienten
    socket.on('message', (msg) => {
        console.log('Meddelande från klient:', msg);

        // Skicka ett svar tillbaka till klienten
        socket.emit('serverMessage', `Servern säger: ${msg}`);
    });

    // Hantera bortkoppling
    socket.on('disconnect', () => {
        console.log('En användare kopplade bort:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Servern körs på http://localhost:3000');
});
