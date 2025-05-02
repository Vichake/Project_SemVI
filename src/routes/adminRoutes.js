import express from 'express';

// for content
import { addContent } from '../controllers/contentController/addContent.js';
import { getContent } from '../controllers/contentController/getContent.js'
import { updateContent } from '../controllers/contentController/updateContent.js';
import { deleteContent } from '../controllers/contentController/deleteContent.js';
// for instrument
import { addInstruments } from '../controllers/instrumentsControllers/addInstruments.js';
import { updateInstruments } from '../controllers/instrumentsControllers/updateInstruments.js';
import { deleteInstruments } from '../controllers/instrumentsControllers/deleteInstruments.js';
import {getInstruments} from '../controllers/instrumentsControllers/getInstruments.js';
// for scheme
import { addSchemes } from '../controllers/schemeControllers/addSchemes.js';
import { deleteSchemes } from '../controllers/schemeControllers/deleteSchemes.js'
import { getSchemes } from '../controllers/schemeControllers/getSchemes.js'
import { updateSchemes } from '../controllers/schemeControllers/updateSchemes.js'
// import { addUsers } from '../controllers/userControllers/addUsers.js';
import { updateUsers } from '../controllers/userControllers/updateUsers.js';
import { deleteUsers } from '../controllers/userControllers/deleteUsers.js';


const router = express.Router();

router
.post('/addcontents',addContent)
.get("/content",getContent)
.delete("/content/:id",deleteContent)
.put("/content/:id",updateContent)
.post("/addInstruments",addInstruments)
.get("/getInstruments",getInstruments)
.delete("/deleteInstrument/:id",deleteInstruments)
.put("/updateInstruments/:id",updateInstruments)
.post("/schemes",addSchemes)
.get("/schemes",getSchemes)
.delete('/schemes/:id',deleteSchemes)
.put('/schemes/:id',updateSchemes)

// .post("/addUsers",addUsers)
.post("/updateUsers/:id",updateUsers)
.post("/deleteUsers/:id",deleteUsers)


export default router;