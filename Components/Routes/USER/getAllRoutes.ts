import {Router} from "express";
import * as fs from 'fs';
import * as path from 'path';
const router = Router();

let PostrouteArray : any = [];



/* This function returns all the routes inside the POST folder dynamically*/
async function USERgetPostRoutes() {
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



async function USERgetGETRoutes() {
    fs
        .readdirSync(path.join(__dirname, "./Get"))
        .forEach(async(file) => {
            if (`${file}`.includes(".ts") || `${file}`.includes(".js")) {
                let routename = file.replace(".ts", "");
                routename = file.replace(".js", "");
                var {router} = require(__dirname + "/Get/" + routename);
                PostrouteArray.push(router);
            };
        });
    PostrouteArray.forEach((route : any) => router.use("/", route));
    return PostrouteArray;
}
export {USERgetPostRoutes,USERgetGETRoutes};