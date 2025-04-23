import express from 'express';

import getMarketData from '../controllers/getMarketData.js';
import addProduct from '../controllers/addProduct.js';
import { verifyFirebaseToken } from '../controllers/verifyFirebaseToken.js';
import { getProducts } from '../controllers/getProducts.js';

const router = express.Router();
router
.get('/getMarketData', getMarketData)
.post('/addProduct', addProduct)
.get("/getProducts",verifyFirebaseToken,getProducts)

export default router;