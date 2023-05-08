import { customerDetails } from '@base/Components/Controllers/USER/profile/customerDetails';
import { userTokenMiddleware } from '@base/Components/Middlewares/USER/tokenChecker';
import express from 'express';
const router = express.Router();
var path = require('path');



/* The name of the file is used as the express route endpoint */


var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');
router.get(`/${scriptName}`, userTokenMiddleware,customerDetails);
export {router};