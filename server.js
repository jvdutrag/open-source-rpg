const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on('connect', socket => {
    socket.on('room:join', roomName => {
        console.log('entrou na sala', roomName)
        return socket.join(roomName);
    });

    socket.on('update_hit_points', data => {
        return io.to('portrait').emit('update_hit_points', data);
    });
});

nextApp.prepare().then(() => {
    app.all('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(process.env.PORT || 3000, err => {
        if(err) {
            throw err;
        }

        console.log('[Server] Successfully started');
    });
})