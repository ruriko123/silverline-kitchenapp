import express from 'express';
const router = express.Router();


router.post("/orderEntry2", async(req, res) => {
    console.log("a")
    try {
        // const {username, email, password} = req?.body;

        res.status(200).json({"success":"orderEntry2"});
        return;

    } catch (err) {
        res.status(500).json(err);
        return;
    }
})