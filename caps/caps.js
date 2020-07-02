'use strict';

/**
 * Main Hub Application
 * 
 * Manages the state of every package
 * Logs every event to the console with a timestamp and payload
 * 
 */
require('dotenv').config('../.env');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
const io = socketIO(PORT);

let storeRooms = {};


let caps = io.of('/caps');
caps.on('connection', (socket)=> {
  console.log('someone joined!');
  socket.emit('hello', 'hello');
  socket.on('data-cache', logger);
});



function logger(payload) {
  let time = new Date();
  console.log({ 
    Event: 
    {
      time: `${time}`,
      payload: payload,
    }},
  );

}