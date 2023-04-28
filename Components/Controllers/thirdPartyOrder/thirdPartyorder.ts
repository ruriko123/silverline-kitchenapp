import { RequestHandler } from "express";
import {orderHistoryThirdParty} from "@reqtypes/orderHistory";
import {saveOrder} from 'Components/Middlewares/saveOrder';
import { check3Ptoken } from "@base/Components/utils/checkThirdPartytoken";



const thirdPartyorder:RequestHandler = async(req, res) => {
    try {
        /* Validate the token*/
        let tokenresult = await check3Ptoken(req.get("token"));
        if ("error" in tokenresult) {
            res
                .status(500)
                .json(tokenresult);
            return;
        } else if ("tokenError" in tokenresult) {
            res
                .status(401)
                .json({"error": tokenresult["tokenError"]});
            return;
        };
        /* tokenresult returns the company details which is passed with the "order" object*/
        let order : orderHistoryThirdParty = req
            ?.body;
        order["customerName"] = tokenresult.CompanyName;
        order["customerPhone"] = tokenresult.Phone || tokenresult.AltPhone;
        order["Address"] = tokenresult.Address;
        /* The device posts the order JSON which is passed to the saveOrder middleware */
        let result = await saveOrder(order);
        if ("error" in result) {
            res
                .status(500)
                .json(result);
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
};


export {thirdPartyorder};

