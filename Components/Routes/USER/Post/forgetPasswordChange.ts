import { forgetPasswordChange } from "@base/Components/Controllers/USER/login/forgetPasswordChange";




import express from 'express';
const router = express.Router();
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');


router.post(`/${scriptName}`,forgetPasswordChange);
export {router};