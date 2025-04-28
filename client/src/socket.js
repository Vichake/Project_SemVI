import { io } from 'socket.io-client';

let sellSocket;
let buySocket;

export const connectSellSocket = () => {
    if (!sellSocket) {
        sellSocket = io("http://localhost:5000/sell", {
          transports: ["websocket"],
        });
    
        sellSocket.on("connect", () => {
          console.log("Connected to /sell namespace");
        });
    
        sellSocket.on("disconnect", () => {
          console.log("Disconnected from /sell namespace");
        });
      }
  return sellSocket;
};

export const disconnectSellSocket = () => {
  if (sellSocket) {
    sellSocket.disconnect();
    sellSocket = null;
  }
};

export const connectBuySocket = () => {
  if (!buySocket) {
    buySocket = io('http://localhost:5000/buy');
  }
  return buySocket;
};


export const disconnectBuySocket = () => {
  if (buySocket) {
    buySocket.disconnect();
    buySocket = null;
  }
};