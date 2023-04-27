import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import myDataSource from "./app-data-source";
import {getPostRoutes, getGETRoutes} from './Components/Routes/ADMIN/getAllRoutes';
import {USERgetPostRoutes, USERgetGETRoutes} from './Components/Routes/USER/getAllRoutes';
const path = require("path");
const fs = require("fs");
dotenv.config();
const http = require('http');
const {Server} = require("socket.io");
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: true});
import {createOutletHash} from "@socket/socketJoinToken";
import {createDefaultAdmin} from './Components/utils/AddDefaultAdmin';
var session = require('express-session');
var cors = require('cors');

/* Initialize the orm data source*/

myDataSource
    .initialize()
    .then(async() => {
        console.log("Data Source has been initialized!");
        try {
            await createDefaultAdmin();
        } catch (error) {
            console.log(error);
        }
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app : Express = express();
// const corsOptions = {
//     optionsSuccessStatus: 200,
//     credentials: true,
//     origin: ["http://localhost:3000", "*"]
// };

app.use(cors({origin: true, credentials: true}));
// app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT;
app.use(express.json());
app.use(urlencodedParser);

app.get('/', (req : Request, res : Response) => {
    res.send('Express + TypeScript Server');
});



app.set("trust proxy", 1);

let sess = {
    secret: '2C44-4D44-WppQ38S',
    saveUninitialized: true,
    resave: false,
    proxy: true,
    name:"app",
    cookie: {
        secure: true, // This will only work if you have https enabled!
        httpOnly: false,
        sameSite: 'none'
    }
};
// if (app.get('env') === 'production') {
//     app.set('trust proxy', 1); // trust first proxy
//     sess.cookie.secure = true; // serve secure cookies
// };

app.use(session(sess));

server.listen(process.env.PORT, async() => {
    // let a = await adminHash("test") console.log(a, " password") let b = "test"
    // console.log(b, " password") let c = await adminHashCompare(b,a);
    // console.log(c)

    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    app.use("/uploads", express.static(path.join(__dirname, "/public/images")));



    /* After server is initialized, call the getPostRoutes() function to dynamically fetch all express routes automatically. */
    let allPostRoutes = await getPostRoutes();
    let allGetRoutes = await getGETRoutes();
    if (allGetRoutes) {
        /* Register all the GET routes */
        app.use("/", allGetRoutes);
    };
    if (allPostRoutes) {
        /* Register all the POST routes */
        app.use("/", allPostRoutes);
    };
    console.log("ADMIN routes loaded.");
    console.log("Loading user routes...");
    let allUSERpostRoutes = await USERgetPostRoutes();
    let allUSERgetRoutes = await USERgetGETRoutes();
    if (allUSERpostRoutes) {
        /* Register all the GET routes */
        app.use("/", allUSERpostRoutes);
    };
    if (allUSERgetRoutes) {
        /* Register all the POST routes */
        app.use("/", allUSERgetRoutes);
    };
    console.log("USER routes loaded.");

});

/* Socket connection */
io.on('connection', async function (socket : any) {
    let d = new Date()
    let ank = d.toLocaleString('en-US', {timeZone: 'Asia/Kathmandu'});
    console.log(`${ank}`, `-> Socket connected`);

    socket.on('disconnect', function () {
        socket.disconnect();
    });
    /* After connection, the device emits on the "join" channel and sends outletName in json.*/
    socket.on("join", async(data : any) => {
        console.log(data);

        let jsonData = data;
        if (!("outletName" in jsonData)) {
            return;
        };
        /* The createOutletHash function hashes the outletname and emits it back to the device on the 'message' event*/
        let hash = await createOutletHash(jsonData["outletName"]);
        if (!hash) {
            socket.emit("error", "error");
        } else {
            console.log(`Initial join hash ${hash}`)
            /* OutletName hash is passed and the client uses it as its socket event name. */
            socket.emit("message", {"update_endpoint": hash});
        };
    });
});

export {io, app};
