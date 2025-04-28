import express from 'express';
import { addContent } from '../adminController/addContent.js';
import { addInstruments } from '../controllers/instrumentsControllers/addInstruments.js';
import { updateInstruments } from '../controllers/instrumentsControllers/updateInstruments.js';
import { deleteInstruments } from '../controllers/instrumentsControllers/deleteInstruments.js';
import { addUsers } from '../controllers/userControllers/addUsers.js';
import { updateUsers } from '../controllers/userControllers/updateUsers.js';
import { deleteUsers } from '../controllers/userControllers/deleteUsers/index.js';

const router = express.Router();

router
.post('/contents',addContent)
.post("addInstruments",addInstruments)
.post("updateInstruments",updateInstruments)
.post("deleteInstruments",deleteInstruments)
.post("/addUsers",addUsers)
.post("/updateUsers/:id",updateUsers)
.post("/deleteUsers/:id",deleteUsers)


export default router;