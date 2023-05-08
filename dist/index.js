"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_data_source_1 = __importDefault(require("./app-data-source"));
const getAllRoutes_1 = require("./Components/Routes/ADMIN/getAllRoutes");
const getAllRoutes_2 = require("./Components/Routes/USER/getAllRoutes");
const path = require("path");
const fs = require("fs");
dotenv_1.default.config();
const http = require('http');
const { Server } = require("socket.io");
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ limit: '150mb', extended: true });
const socketJoinToken_1 = require("@socket/socketJoinToken");
const AddDefaultAdmin_1 = require("./Components/utils/AddDefaultAdmin");
var session = require('express-session');
var cors = require('cors');
/* Initialize the orm data source*/
app_data_source_1.default
    .initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Data Source has been initialized!");
    try {
        yield (0, AddDefaultAdmin_1.createDefaultAdmin)();
    }
    catch (error) {
        console.log(error);
    }
}))
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
exports.app = app;
// const corsOptions = {
//     optionsSuccessStatus: 200,
//     credentials: true,
//     origin: ["http://localhost:3000", "*"]
// };
app.use(cors({ origin: true, credentials: true }));
// app.use(cors(corsOptions));
const server = http.createServer(app);
const io = new Server(server);
exports.io = io;
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(bodyparser.json({ limit: '150mb' }));
app.use(urlencodedParser);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.set("trust proxy", 1);
let sess = {
    secret: '2C44-4D44-WppQ38S',
    saveUninitialized: true,
    resave: false,
    proxy: true,
    name: "app",
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    }
};
if (process.env.NODE_ENV === 'PRODUCTION') {
    let sess = {
        secret: '2C44-4D44-WppQ38S',
        saveUninitialized: true,
        resave: false,
        proxy: true,
        name: "app",
        cookie: {
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }
    };
    app.use(session(sess));
}
;
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    let sess = {
        secret: '2C44-4D44-WppQ38S',
        saveUninitialized: true,
        resave: false,
        proxy: true,
        name: "app",
        cookie: {
            httpOnly: true,
        }
    };
    app.use(session(sess));
}
;
server.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    // let a = await adminHash("test") console.log(a, " password") let b = "test"
    // console.log(b, " password") let c = await adminHashCompare(b,a);
    // console.log(c)
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    app.use("/uploads", express_1.default.static(path.join(__dirname, "/public/images")));
    /* After server is initialized, call the getPostRoutes() function to dynamically fetch all express routes automatically. */
    let allPostRoutes = yield (0, getAllRoutes_1.getPostRoutes)();
    let allGetRoutes = yield (0, getAllRoutes_1.getGETRoutes)();
    if (allGetRoutes) {
        /* Register all the GET routes */
        app.use("/", allGetRoutes);
    }
    ;
    if (allPostRoutes) {
        /* Register all the POST routes */
        app.use("/", allPostRoutes);
    }
    ;
    console.log("ADMIN routes loaded.");
    console.log("Loading user routes...");
    let allUSERpostRoutes = yield (0, getAllRoutes_2.USERgetPostRoutes)();
    let allUSERgetRoutes = yield (0, getAllRoutes_2.USERgetGETRoutes)();
    if (allUSERpostRoutes) {
        /* Register all the GET routes */
        app.use("/", allUSERpostRoutes);
    }
    ;
    if (allUSERgetRoutes) {
        /* Register all the POST routes */
        app.use("/", allUSERgetRoutes);
    }
    ;
    console.log("USER routes loaded.");
}));
/* Socket connection */
io.on('connection', function (socket) {
    return __awaiter(this, void 0, void 0, function* () {
        let d = new Date();
        let ank = d.toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' });
        console.log(`${ank}`, `-> Socket connected`);
        socket.on('disconnect', function () {
            socket.disconnect();
        });
        /* After connection, the device emits on the "join" channel and sends outletName in json.*/
        socket.on("join", (data) => __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            let jsonData = data;
            if (!("outletName" in jsonData)) {
                return;
            }
            ;
            /* The createOutletHash function hashes the outletname and emits it back to the device on the 'message' event*/
            let hash = yield (0, socketJoinToken_1.createOutletHash)(jsonData["outletName"]);
            if (!hash) {
                socket.emit("error", "error");
            }
            else {
                console.log(`Initial join hash ${hash}`);
                /* OutletName hash is passed and the client uses it as its socket event name. */
                socket.emit("message", { "update_endpoint": hash });
            }
            ;
        }));
    });
});
