import {DataSource} from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";
import {Tblordertracker} from "./entities/Tblordertracker";
import {Tblordertrackerdetails} from "./entities/Tblordertrackerdetails";


//import the models in entities

const myDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Tblordertracker, Tblordertrackerdetails
    ],
    logging: false,
    synchronize: true,
    migrations: ["./migrations/*.js","./migrations/*.ts"],
    migrationsRun:true
});

export default myDataSource;