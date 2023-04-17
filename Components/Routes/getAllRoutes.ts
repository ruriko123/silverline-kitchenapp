import { Router } from "express";
import * as fs from 'fs';
import * as path from 'path';
const router = Router();


let routeArray:any=[];

async function getPostRoutes() {

    fs.readdirSync(path.join(__dirname,"./Post")).forEach(async (file) => {
        if(`${file}`.includes(".ts")||`${file}`.includes(".js")){
            let routename = file.replace(".ts","");
            routename = file.replace(".js","");
            var {router} = require(__dirname+"/Post/" +routename);
            routeArray.push(router);
        }
    });
    
    routeArray.forEach((route:any) => router.use("/", route));
    return routeArray;
    
}
export default getPostRoutes;