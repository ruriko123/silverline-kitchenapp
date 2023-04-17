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
const app_data_source_1 = __importDefault(require("./ORM/app-data-source"));
const getAllRoutes_1 = __importDefault(require("./Components/Routes/getAllRoutes"));
dotenv_1.default.config();
const http = require('http');
const { Server } = require("socket.io");
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: false });
const socketJoinToken_1 = require("./Components/Controllers/Socket/socketJoinToken");
app_data_source_1.default
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
exports.app = app;
const server = http.createServer(app);
const io = new Server(server);
exports.io = io;
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(urlencodedParser);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
server.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    let allPostRoutes = yield (0, getAllRoutes_1.default)();
    app.use("/", allPostRoutes);
}));
io.on('connection', function (socket) {
    console.log("Socket connected", socket);
    socket.on("join", (data) => {
        let jsonData = JSON.parse(data);
        if (!("outletName" in jsonData)) {
            return;
        }
        let hash = (0, socketJoinToken_1.createOutletHash)(jsonData["outletName"]);
        if (!hash) {
            socket.emit("error", "error");
        }
        else {
            socket.emit("message", { "update_endpoint": hash });
        }
    });
});
