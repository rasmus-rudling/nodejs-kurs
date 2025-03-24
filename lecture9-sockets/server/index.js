import express from "express";
import http from "http";
import { Server } from 'socket.io'
import cors from "cors"

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

const sentMessages = []

io.on('connection', (socket) => {
    console.log('En användare anslöt:', socket.id);

    socket.emit('message', sentMessages)

    socket.on('message', (msg) => {
        sentMessages.push(msg)
        console.log(sentMessages)
    });

    // Hantera bortkoppling
    socket.on('disconnect', () => {
        console.log('En användare kopplade bort:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Servern körs på http://localhost:3000');
});
