import {DataSource} from "typeorm";
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";


const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + "/ORM/entities/*.js",__dirname + "/ORM/entities/*.ts"],
    synchronize: true,
    logging: false,
    migrations: [__dirname + '/ORM/migrations/*.ts',__dirname + '/ORM/migrations/*.js'],
    
});




export default myDataSource;