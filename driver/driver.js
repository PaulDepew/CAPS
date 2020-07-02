'use strict';

/**
 * Driver module
 * Monitors the system for events
 * on pickup:
 *
 */

// const events = require('../caps/caps');

// const net = require('net');
// const Client = new net.Socket();
// Client.connect(3000, 'localhost', ()=> {
//   console.log('Driver to Server');
// });

// Client.on('data', (buffer) => {
//   let message = JSON.parse(buffer.toString());
//   if (message.event === 'package-ready-for-delivery'){
//     handleGoGetPackage(message.payload);
//   }
// });

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/caps');

socket.on('package-ready-for-delivery', handleGoGetPackage);


function handleGoGetPackage(payload) {

  setTimeout(function () {
    socket.emit('cache-update', payload);
    console.log(`pickup: ${payload.orderId}`);
    // socket.emit('in-transit', payload);
    setTimeout(function () {
      socket.emit('cache-update', payload);
      
      console.log(`delivered: ${payload.orderId}`);
      socket.emit('delivered', payload);
    }, 3000);
  }, 1000);
}