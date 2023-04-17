import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import myDataSource from "./ORM/app-data-source";
import getPostRoutes from './Components/Routes/getAllRoutes';
dotenv.config();

var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended: false});

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app : Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(urlencodedParser);

app.get('/', (req : Request, res : Response) => {
    res.send('Express + TypeScript Server');
});

let server = app.listen(port, async() => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    let allPostRoutes = await getPostRoutes();
    app.use("/", allPostRoutes)

});

var io = require('socket.io').listen(server);
io
    .sockets
    .on('connection', function (socket : any) {
        console.log("Socket connected", socket)
    });

io.set("origins", "*:*");

export {io, app};
