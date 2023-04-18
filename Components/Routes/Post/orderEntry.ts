import express from 'express';
const router = express.Router();
var path = require('path');
var scriptName = path.basename(__filename).replace(/\.[^.]*$/,'');
import {orderHistory} from "@reqtypes/orderHistory"
import { saveOrder } from 'Components/Middlewares/saveOrder';



router.post(`/${scriptName}`, async(req, res) => {



    try {
        let order:orderHistory=req?.body;
        let result =await saveOrder(order);
        if ("error" in result){
            res.status(500).json(result);
            return;
        } else{

            res.status(200).json(result["success"]);
            return;
        }

    } catch (err) {
        res.status(500).json(err);
        return;
    }
})

export { router };