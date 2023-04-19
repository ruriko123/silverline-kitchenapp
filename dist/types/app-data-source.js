"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
const Tblordertracker_1 = require("../ORM/entities/Tblordertracker");
const Tblordertrackerdetails_1 = require("../ORM/entities/Tblordertrackerdetails");
//import the models in entities
const myDataSource = new typeorm_1.DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Tblordertracker_1.Tblordertracker, Tblordertrackerdetails_1.Tblordertrackerdetails
    ],
    logging: false,
    synchronize: true,
    migrations: ["./migrations/*.js", "./migrations/*.ts"],
    migrationsRun: true
});
exports.default = myDataSource;
