"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("./routes"));
const users_1 = require("./users");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const PORT = process.env.PORT || 5050;
app.use('/', routes_1.default);
app.use((0, cors_1.default)());
io.on('connection', (socket) => {
    console.log('User has been connected.');
    socket.on('ROOM:JOIN', (userData, callback) => {
        const { error, user } = (0, users_1.addUser)(userData, socket.id);
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
    socket.on('ROOM:SEND_MESSAGE', (message, callback) => {
        const user = (0, users_1.getUser)(socket.id);
        if (user) {
            io.to(user.room).emit('ROOM:MESSAGE', {
                user: user.name,
                text: message,
            });
        }
        callback();
    });
    socket.on('disconnect', () => {
        const user = (0, users_1.getUser)(socket.id);
        if (user) {
            socket.broadcast
                .to(user.room)
                .emit('ROOM:MESSAGE', { user: 'Admin', text: `${user.name}, has left the chat` });
        }
        (0, users_1.removeUser)(socket.id);
        console.log('User had disconnect');
    });
});
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('../client/build'));
}
server.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}`);
});
