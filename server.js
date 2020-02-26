const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

const io = socket(server);

const tasks = [];

io.on('connection', (socket) => {
    socket.emit('updateData', tasks);
    socket.on('addTask', task => {
        tasks.push(task);
        socket.broadcast.emit('addTask', task);
    });
    socket.on('removeTask', (taskIndex) => {
        tasks.splice(taskIndex, 1);
        socket.broadcast.emit('removeTask', taskIndex);
    });
});

app.use((req, res) => {
    res.status(404).send({ message: 'not found...'});
});