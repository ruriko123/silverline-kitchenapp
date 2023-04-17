import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";
import {Tblordertracker} from "./entities/Tblordertracker"
import {Tblordertrackerdetails} from "./entities/Tblordertrackerdetails"


const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Tblordertracker,Tblordertrackerdetails],
    logging: false,
    synchronize: true,
    migrations: [],
});

export default myDataSource;