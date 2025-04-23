import { io } from 'socket.io-client';

export const sellSocket = io('http://localhost:5000/sell');
export const buySocket = io('http://localhost:5000/buy');
