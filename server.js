import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js"; // Now this will work 
import userRoutes from "./src/routes/userRoutes.js"; // Now this will work
import adminRoutes from "./src/routes/adminRoutes.js"; // Now this will work


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/user", userRoutes); 
app.use("/admin", adminRoutes);
// app.get('/', (req,res)=>{
//     res.send('API is running...')
// })

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
});

app.set('io',io);

const sellProduct = io.of("/sell");
sellProduct.on('connection',(socket)=>{
    console.log('A user connected to /sell to sellProduct');

    socket.on('product-added',(product)=>{
        // Broadcast new product to everyone in /sell except sender
        socket.broadcast.emit('productAdded',product);
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected from /sell');
    });
});

const buyProduct = io.of('/buy');
buyProduct.on('connection', (socket) => {
  console.log('A user connected to /buy namespace');

  socket.on('newPurchase', (purchaseData) => {
    socket.broadcast.emit('purchaseMade', purchaseData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from /buy');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
