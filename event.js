'use strict';

/**
 * Global Event Pool shared by all modules
 * @param payload
 * @response event
 */

const EventEmitter = require('events');

const events = new EventEmitter();

// Pickup Event
events.on('pickup', handlePickup);

function handlePickup(payload){
  events.emit('cache-update', payload);
  console.log(`Driver: picked up ${payload.orderId}`);
  events.emit('inTransit', payload);
}

// In-Transit Event
events.on('inTransit', handleInTransit);

function handleInTransit(payload){
  events.emit('cache-update', payload);
  console.log(`Driver: delivered ${payload.orderId}`);
  events.emit('delivered', payload);
}

// Delivered Event
events.on('delivered', handleDelivered);

function handleDelivered(payload){
  events.emit('cache-update', payload);
  console.log(`Vendor: Thank you for delivering ${payload.orderId}`);
}


// Cache Logger
events.on('cache-update', logger);

function logger(payload) {
  let time = new Date();
  console.log({
    Event: {
      time: `${time}`,
      payload: payload,
    },

  });
}

module.exports = events;
