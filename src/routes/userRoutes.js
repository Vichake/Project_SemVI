import express from 'express';

import {getMarketData} from '../controllers/getMarketData.js';
import {addProduct} from '../controllers/addProduct.js';
import { verifyFirebaseToken } from '../controllers/verifyFirebaseToken.js';
import { getUsersProducts } from '../controllers/getUsersProducts.js';
import { getProducts } from '../controllers/getProducts.js';
import { deleteProducts } from '../controllers/deleteProducts.js';


const router = express.Router();
router
.get('/getMarketData', getMarketData)
.post('/addProduct', addProduct)
.get("/getUsersProducts",verifyFirebaseToken,getUsersProducts)
.get("/getProducts",getProducts)
.post("/deleteProducts",verifyFirebaseToken,deleteProducts)

export default router;