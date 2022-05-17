'use strict';

//Creamos un servidor web estático----------------------------------
const port = process.env.PORT || 5000;

const express = require('express');
const app = express();

app.use(express.static(__dirname + /public/));

const server = app.listen(port, ()=> {
    console.log(`Juego POng en http://localhost:${port}`);
});


// Definimos el estado global del juego-----------------------------

let connections = [];
let currentState = {
    players: [{},{}],
    ball: {}
}

// Crear un servidor de juegos o mortor de red (WebSocket)--------

const socket = require('socket.io');
const io = socket( server );

io.sockets.on('connect', onConnect);

function onConnect( socket ) {
    console.log('onConnect');

    connections.push(socket.id);
    if(connections.length>2) {
        console.error('onConnect: demasiados jugadores conectados');
        return;
    }

    sendCounter();

    socket.on('start', onStart);
    socket.on('updatePlayer', onUpdatePlayer);
    socket.io('updateBall', onUpdateBall);
    socket.on('disconnect', onDisconnect);

    setInterval(heartBeat, 33);
}

// Declaro los métodos de salida

function onStart( state ) {
    console.log('onStart');

    const index = connections[0] === state.id ? 0 : 1;
    const  csp = currentState.players[index];
    csp.id = state.id;
    // csp.x = state.x;
    csp.y = state.y;
    csp.width = state.width;
    csp.height = state.height;
    csp.score = state.score;
}

function sendCounter() {
    console.log('sendCounter');
    io.sockets.emit('getCounter', connections.length);
}

function heartBeat() {
    io.sockets.emit('hearthBeat', currentState);
}

function onDisconnect() {
    console.log('onDisconnect');

    connections = [];
    currentState = {
        players: [{},{}],
        ball: {}
    }

    //io.sockets.emit('endGame','');
}

// Declaro los manejadores de eventos de entrada

function onUpdatePlayer( state ) {

    for(let i=0, found=false; i<currentState.players.length && !found; i++){
        if(currentState.players[i].id===state.id){
            found = true;
            currentState.players[i].y = state.y;
            currentState.players[i].score = state.score;
        }
    }
}

function onUpdateBall( state ) {
    currentState.ball.x = state.x;
    currentState.ball.y = state.y;
    currentState.ball.speed = state.speed;
    currentState.ball.velocityX = state.velocityX;
    currentState.ball.velocityY = state.velocityY;
}