import {thirdPartyupdate} from '@base/Components/Controllers/Admin/thirdparty/thirdPartyupdate';
import {adminSessionChecker} from '@base/Components/Middlewares/Admin/sessionChecker';
import express from 'express';
const router = express.Router();
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');

router.post(`/${scriptName}`, adminSessionChecker, thirdPartyupdate);
export {router};