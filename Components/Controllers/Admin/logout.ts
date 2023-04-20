import {RequestHandler} from "express";

const adminLogout : RequestHandler = async(req, res) => {

    try {
        req
        .session
        .destroy(function (err) {
            console.log('Destroyed session')
        });
    res.redirect('/login');
    return;
    } catch (error) {
        res.status(500).json({"error":error});
        return;
    };


};

export {adminLogout};