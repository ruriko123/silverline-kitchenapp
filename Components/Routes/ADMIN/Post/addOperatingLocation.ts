import { addOperatingLocation } from '@base/Components/Controllers/Admin/addOperatingLocation';
import express from 'express';
const router = express.Router();
import { adminSessionChecker } from '@base/Components/Middlewares/Admin/sessionChecker';
import { upload } from '@base/Components/utils/multer';



var path = require('path');

/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');


router.post(`/${scriptName}`,upload.single("file"), adminSessionChecker,addOperatingLocation);
export {router};