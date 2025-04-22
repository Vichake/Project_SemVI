import express from 'express';

import getMarketData from '../controllers/getMarketData.js';
import addProduct from '../controllers/addProduct.js';

const router = express.Router();

router.get('/getMarketData', getMarketData);
router.post('/addProduct', addProduct);

export default router;