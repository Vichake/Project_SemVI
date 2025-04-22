import express from 'express';

import getMarketData from '../controllers/getMarketData.js';

const router = express.Router();

router.get('/getMarketData', getMarketData);

export default router;