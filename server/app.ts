import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { config } from 'dotenv';

import { addUser, getUser, user, removeUser } from './users';
import mainRoute from './routes';

const app = express();
app.use(cors());
app.use('/', mainRoute);
config();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL_DEV || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const PORT = process.env.PORT || 5050;

io.on('connection', (socket) => {
  console.log('User has been connected.');

  socket.on('ROOM:JOIN', (userData: user, callback: (error: string) => void) => {
    const { error, user } = addUser(userData, socket.id);

    if (error) {
      return callback(error);
    }

    if (user) {
      socket.join(user.room);

      socket.emit('ROOM:MESSAGE', {
        user: 'Admin',
        text: `Welcome ${user.name} to the room ${user.room}`,
      });
      socket.broadcast
        .to(user.room)
        .emit('ROOM:MESSAGE', { user: 'Admin', text: `${user.name}, has joined` });
    }
  });

  socket.on('ROOM:SEND_MESSAGE', (message: string, callback: () => void) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user.room).emit('ROOM:MESSAGE', {
        user: user.name,
        text: message,
      });
    }

    callback();
  });

  socket.on('disconnect', () => {
    const user = getUser(socket.id);

    if (user) {
      socket.broadcast
        .to(user.room)
        .emit('ROOM:MESSAGE', { user: 'Admin', text: `${user.name}, has left the chat` });
    }

    removeUser(socket.id);
    console.log('User had disconnect');
  });
});

server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
