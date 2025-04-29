import express from 'express';

import {getMarketData} from '../controllers/getMarketData.js';
import {addProduct} from '../controllers/productControllers/addProduct.js';
import { verifyFirebaseToken } from '../controllers/verifyFirebaseToken.js';
import { getUsersProducts } from '../controllers/productControllers/getUsersProducts.js';
import { getProducts } from '../controllers/productControllers/getProducts.js';
import { deleteProducts } from '../controllers/productControllers/deleteProducts.js';
import { getInstruments } from '../controllers/instrumentsControllers/getInstruments.js';



const router = express.Router();
router
.get('/getMarketData', getMarketData)
.post('/addProduct', addProduct)
.get("/getUsersProducts",verifyFirebaseToken,getUsersProducts)
.get("/getProducts",getProducts)
.post("/deleteProducts",verifyFirebaseToken,deleteProducts)
.get("/getInstruments",getInstruments)

export default router;