'use strict';

/**
 * Vendor Module
 * 
 * Declare your store name (in .env)
 * Every 5 seconds, make a customer order
 *  {storename: "", orderId:"", customerName:"", address:"" }
 * User faker to generate random user data
 * monitor the system for "delivered" events and console log "thank you"
 */
require('dotenv').config();
const faker = require('faker');
const events = require('./event');

const storename = process.env.STORENAME;


async function randomOrder(){
  let orderIdNumber = await faker.random.number();
  let customerName = await faker.name.findName();
  let address = await faker.address.streetAddress();

  let  payload = await {
    storename: storename,
    orderId: orderIdNumber,
    customerName: customerName,
    address: address,
  };
  events.emit('cache-update', payload);
  events.emit('pickup', payload);
  return payload;
}

function sendOrders(store){
  setInterval(randomOrder, 5000, store);
}


sendOrders();