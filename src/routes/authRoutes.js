import express from 'express';
import { login } from '../controllers/login.js';
import { signUp } from '../controllers/signUp.js';
import {getUser} from '../controllers/getUser.js'


const router = express.Router();

router
.post('/signup', signUp)
.post('/login', login)
.get('/getUser',getUser)



export default router;