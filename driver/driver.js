'use strict';

/**
 * Driver module
 * Monitors the system for events
 * on pickup:
 *
 */

const events = require('../caps/caps');

const net = require('net');
const Client = new net.Socket();
Client.connect(3000, 'localhost', ()=> {
  console.log('Driver to Server');
});

Client.on('data', (buffer) => {
  let message = JSON.parse(buffer.toString());
  if (message.event === 'package-ready-for-delivery'){
    handleGoGetPackage(message.payload);
  }
});


function handleGoGetPackage(payload) {

  setTimeout(function () {
    Client.write({event: "cache-update", payload: payload});
    console.log(`pickup: ${payload.orderId}`);
    Client.write({event: "inTransit", payload: payload});
    setTimeout(function () {
      Client.write({event: "cache-update",payload: payload});
      console.log(`delivered: ${payload.orderId}`);
      Client.write({event: "delivered", payload: payload});
    }, 3000);
  }, 1000);
}