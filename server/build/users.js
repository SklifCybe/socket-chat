"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersInRoom = exports.getUser = exports.removeUser = exports.addUser = void 0;
let users = [];
const addUser = (userData, id) => {
    const name = userData.name.trim();
    const room = userData.room.trim();
    const isMatch = !!users.find((user) => user.name === name && user.room === room);
    if (isMatch) {
        return { error: 'Username is exist.', user: null };
    }
    const user = {
        id,
        name: userData.name,
        room: userData.room,
    };
    users.push(user);
    return { user, error: null };
};
exports.addUser = addUser;
const removeUser = (id) => {
    users = users.filter((user) => user.id !== id);
};
exports.removeUser = removeUser;
const getUser = (id) => users.find((user) => user.id === id);
exports.getUser = getUser;
const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
};
exports.getUsersInRoom = getUsersInRoom;
