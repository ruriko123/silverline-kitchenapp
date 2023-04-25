import {RequestHandler} from "express";

const adminLogout : RequestHandler = async(req, res) => {

    try {
        req
        .session
        .destroy(function (err) {
            console.log('Destroyed session')
        });
        res
        .status(200)
        .json({"success": "Logout successful."});
    return;
    return;
    } catch (error) {
        res.status(500).json({"error":error});
        return;
    };


};

export {adminLogout};