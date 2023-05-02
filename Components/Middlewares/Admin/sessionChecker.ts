import { RequestHandler } from "express";
import type session from "express-session";

const adminSessionChecker:RequestHandler = async(req, res,next) => {
    if(!req){
        return ""
    }
    if (req.session &&  req.session.admin) {
        next();
    } else {
        res.redirect('/login');
    };
};


export {adminSessionChecker};

