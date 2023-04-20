import { RequestHandler } from "express";
import type session from "express-session";

const adminSessionChecker:RequestHandler = async(req, res,next) => {
    if(!req){
        return ""
    }
    console.log(`Session Checker: ${req.session.id}`);
    console.log(req.session);
    if (req.session &&  req.session.admin) {
        console.log(`Found User Session`);
        next();
    } else {
        console.log(`No User Session Found`);
        res.redirect('/login');
    };
};


export {adminSessionChecker};

