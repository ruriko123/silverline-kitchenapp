import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import myDataSource from "./ORM/app-data-source";
dotenv.config();
import "reflect-metadata";
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





app.get('/', (req : Request, res : Response) => {
    res.send('Express + TypeScript Server');
});



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
