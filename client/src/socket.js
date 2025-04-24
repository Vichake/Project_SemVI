import { io } from 'socket.io-client';

let sellSocket;
let buySocket;

export const connectSellSocket = () => {
  if (!sellSocket) {
    sellSocket = io('http://localhost:5000/sell');
  }
  return sellSocket;
};

export const connectBuySocket = () => {
  if (!buySocket) {
    buySocket = io('http://localhost:5000/buy');
  }
  return buySocket;
};
