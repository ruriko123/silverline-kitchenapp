import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import myDataSource from "./ORM/app-data-source";
import getPostRoutes from './Components/Routes/getAllRoutes';
dotenv.config();
const http = require('http');
const {Server} = require("socket.io");
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
import {createOutletHash} from "@controllers/Socket/socketJoinToken";


/* Initialize the orm data source*/
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
const app : Express = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT;
app.use(express.json());
app.use(urlencodedParser);

app.get('/', (req : Request, res : Response) => {
    res.send('Express + TypeScript Server');
});

server.listen(process.env.PORT, async() => {

    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    /* After server is initialized, call the getPostRoutes() function to dynamically fetch all express routes automatically. */
    let allPostRoutes = await getPostRoutes();
    /* Register all the routes */
    app.use("/", allPostRoutes);

});




/* Socket connection */
io.on('connection', async function (socket : any) {
        let d = new Date()
        let ank = d.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });
        console.log(`${ank}`,`-> Socket connected`);

        /* After connection, the device emits on the "join" channel and sends outletName in json.*/ 
        socket.on("join",async (data:any)=>{
            console.log(data);

            let jsonData=data;
            if(!("outletName" in jsonData)){
                return;
            };
            /* The createOutletHash function hashes the outletname and emits it back to the device on the 'message' event*/
            let hash = await createOutletHash(jsonData["outletName"]);
            if(!hash){
                socket.emit("error","error");
            }
            else{
                console.log(`Initial join hash ${hash}`)
                /* OutletName hash is passed and the client uses it as its socket event name. */
                socket.emit("message",{"update_endpoint":hash});
            };
        });
    });

export {io, app};
