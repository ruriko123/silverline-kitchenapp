import express from 'express';
const router = express.Router();
var path = require('path');
var scriptName = path
    .basename(__filename)
    .replace(/\.[^.]*$/, '');
import {orderHistory} from "@reqtypes/orderHistory";
import {saveOrder} from 'Components/Middlewares/saveOrder';

router.post(`/${scriptName}`, async(req, res) => {
    try {
        let order : orderHistory = req
            ?.body;
        /* The device posts the order JSON which is passed to the saveOrder middleware */
        let result = await saveOrder(order);
        if ("error" in result) {
            res
                .status(500)
                .json(result);
            return;
        } else if ("tokenError" in result) {
            res
                .status(401)
                .json({"error": result["tokenError"]});
            return;
        } else if ("notokenError" in result) {
            res
                .status(401)
                .json({"error": result["notokenError"]});
            return;
        } else {
            /* After the middleware emits the data to the device through socket connection, the same data is sent back to the user who post it  */
            res
                .status(200)
                .json(result["success"]);
            return;
        };
    } catch (err) {
        res
            .status(500)
            .json(err);
        return;
    };
});

export {router};
