import express from 'express';
const router = express.Router();
var path = require('path');
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');

router.post(`/${scriptName}`, async(req, res) => {
    try {
        res
            .status(200)
            .json({"success": "orderEntry2"});
        return;
    } catch (err) {
        res
            .status(500)
            .json(err);
        return;
    };
});

export {router};
