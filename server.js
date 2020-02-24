const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

const io = socket(server);

const tasks = [];

io.on('connection', (socket) => {
    socket.emit('updateData', tasks);
});

app.use((req, res) => {
    res.status(404).send({ message: 'not found...'});
});