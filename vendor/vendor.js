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
// const net = require('net');
const faker = require('faker');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');

const storename = process.env.STORENAME;

// const Client = new net.Socket();
// Client.connect(3000, 'localhost', ()=> {
//   console.log('Vendor to Server');
// });

socket.on('hello', sendOrders);

async function randomOrder(){
  let orderIdNumber = await faker.random.number();
  let customerName = await faker.name.findName();
  let address = await faker.address.streetAddress();

  let  payload = {
    storename: 'JollyRogers',
    orderId: orderIdNumber,
    customerName: customerName,
    address: address,
  };
  socket.emit('package-ready-for-delivery', payload);
  socket.emit('data-cache', payload);
}



socket.on('delivered', delivered);

function delivered(payload){
  console.log(`Thank you for delivering ${payload.orderId}`);
}

function sendOrders(){
  setInterval(randomOrder, 5000);
}
      
      
// sendOrders();