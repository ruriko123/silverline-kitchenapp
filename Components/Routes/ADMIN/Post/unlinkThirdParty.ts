import { unlinkThirdParty } from '@base/Components/Controllers/Admin/thirdparty/unlinkThirdParty';
import {adminSessionChecker} from '@base/Components/Middlewares/Admin/sessionChecker';

import express from 'express';
const router = express.Router();
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');




router.post(`/${scriptName}`, adminSessionChecker, unlinkThirdParty);
export {router};