import { CheckAdminLogin } from '@base/Components/Controllers/Admin/checkAdminLogin';


import express from 'express';
const router = express.Router();
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');

router.get(`/${scriptName}`,CheckAdminLogin);
export {router};