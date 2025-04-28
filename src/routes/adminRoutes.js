import express from 'express';
import { addContent } from '../adminController/addContent.js';

const router = express.Router();

router.post('/contents',addContent)


export default router;