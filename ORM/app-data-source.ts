import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();


const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["entities/*.js"],
    logging: true,
    synchronize: true,
    migrations: [],
});

export default myDataSource;