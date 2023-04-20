import { adminLogout } from '@base/Components/Controllers/Admin/logout';
import express from 'express';
import { adminSessionChecker } from '@base/Components/Middlewares/Admin/sessionChecker';
const router = express.Router();
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');




router.post(`/${scriptName}`,adminSessionChecker,adminLogout);

export {router};