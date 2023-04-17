import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import myDataSource from "./ORM/app-data-source";
import getPostRoutes from './Components/Routes/getAllRoutes';
import {hostname} from 'os';
dotenv.config();
const http = require('http');
const {Server} = require("socket.io");
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});
import {createOutletHash} from "@controllers/Socket/socketJoinToken";
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
    let allPostRoutes = await getPostRoutes();
    app.use("/", allPostRoutes);

});


io.on('connection', async function (socket : any) {
        console.log("Socket connected");
        socket.on("join",async (data:any)=>{
            console.log(data);

            let jsonData=data;
            if(!("outletName" in jsonData)){
                return;
            }
            let hash = await createOutletHash(jsonData["outletName"]);
            if(!hash){
                socket.emit("error","error")
            }
            else{
                socket.emit("message",{"update_endpoint":hash})
            }
        })
    });

export {io, app};
