let dummy = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJkaXNwbGF5bmFtZSI6InRlc3QiLCJpYXQiOjE2ODI1ODk3MjAsImV4cCI6MTY4NTE4MTcyMH0.dC695qsL733LcdwwPJO_0iJ1HDRaiTmG83nyVcf4tjo"


import { decodeToken } from "@utils/USER/token";
import { RequestHandler } from "express";
const userTokenMiddleware:RequestHandler = async(req, res,next) => {
    if(!req){
        return 
    };
    if(!(req?.body?.token)){
        res.status(400).json({detail:"No token provided."})
    }
    let token  = req?.body?.token;
    let tokenresult = await decodeToken(token);
    if(tokenresult?.error){
        res.status(401).json({detail:"Invalid token."});
        return;
    }else {
        next();
    }

    // if (req.session &&  req.session.admin) {
    //     next();
    // } else {
    //     res.redirect('/login');
    // };
};


export {userTokenMiddleware};

