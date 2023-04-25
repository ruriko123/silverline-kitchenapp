import { RequestHandler } from "express";
import type session from "express-session";

const CheckAdminLogin:RequestHandler = async(req, res,next) => {
    if(!req){
        return ""
    }
    console.log(`Session Checker: ${req.session.id}`);
    console.log(req.session);
    if (req.session &&  req.session.admin) {
        res.status(200).json({"status":true});
    } else {
        res.status(500).json({"status":false});
    };
};


export {CheckAdminLogin};

