import express from 'express';
const router = express.Router();



router.post("/orderEntry", async(req, res) => {
    var path = require('path');
    var scriptName = path.basename(__filename);
    console.log(scriptName);
    try {
        // const {username, email, password} = req?.body;

        res.status(200).json({"success":"orderEntry"});
        return;

    } catch (err) {
        res.status(500).json(err);
        return;
    }
})

export { router };