'use strict';

/**
 * Main Hub Application
 * 
 * Manages the state of every package
 * Logs every event to the console with a timestamp and payload
 * 
 */

const events = require('./event.js');

events.on('cache-update', (payload)=> {
  let time = new Date();
  console.log({
    Event: {
      event: `${payload.event}`,
      time: `${time}`,
      payload: `${payload}`,
    },

  });
});