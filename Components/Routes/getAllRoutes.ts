import {Router} from "express";
import * as fs from 'fs';
import * as path from 'path';
const router = Router();

let PostrouteArray : any = [];



/* This function returns all the routes inside the POST folder dynamically*/
async function getPostRoutes() {
    fs
        .readdirSync(path.join(__dirname, "./Post"))
        .forEach(async(file) => {
            if (`${file}`.includes(".ts") || `${file}`.includes(".js")) {
                let routename = file.replace(".ts", "");
                routename = file.replace(".js", "");
                var {router} = require(__dirname + "/Post/" + routename);
                PostrouteArray.push(router);
            };
        });
    PostrouteArray.forEach((route : any) => router.use("/", route));
    return PostrouteArray;
}

export default getPostRoutes;