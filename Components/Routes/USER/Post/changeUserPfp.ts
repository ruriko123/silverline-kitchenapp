import express from 'express';
const router = express.Router();
import { upload } from '@base/Components/utils/multer';
import { userTokenMiddleware } from '@base/Components/Middlewares/USER/tokenChecker';
import { changerUserPfp } from '@base/Components/Controllers/USER/profile/changeUserPfp';


var path = require('path');

/* The name of the file is used as the express route endpoint */
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');


router.post(`/${scriptName}`,upload.single("file"), userTokenMiddleware,changerUserPfp);
export {router};