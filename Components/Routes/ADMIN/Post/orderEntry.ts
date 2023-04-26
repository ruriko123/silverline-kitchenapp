import express from 'express';
const router = express.Router();
var path = require('path');
/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');
import {thirdPartyorder} from '@base/Components/Controllers/thirdPartyOrder/thirdPartyorder';

router.post(`/${scriptName}`, thirdPartyorder);

export {router};