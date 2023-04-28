import { decodeToken } from "@utils/USER/token";
import { RequestHandler } from "express";
const userTokenMiddleware:RequestHandler = async(req, res,next) => {
    if(!req){
        return 
    };
    if(!(req?.headers?.token)){
        res.status(400).json({detail:"No token provided."})
        return;
    }
    let token  = req?.headers?.token;
    let tokenresult = await decodeToken(token);
    if(tokenresult?.error){
        res.status(401).json({detail:"Invalid token."});
        return;
    }else {
        next();
    };

};


export {userTokenMiddleware};

