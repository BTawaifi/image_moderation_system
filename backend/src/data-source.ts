import "reflect-metadata"
import { DataSource } from "typeorm"
import { Report } from "./entity/Report"
import DOTENV from "dotenv"
import { Archive } from "./entity/Archive"
DOTENV.config()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env["MYSQL_HOST"] ? process.env["MYSQL_HOST"] : 'localhost',
    port: process.env["MYSQL_LOCAL_PORT"] ? +process.env["MYSQL_LOCAL_PORT"] : 3306,
    username: process.env["MYSQL_USERNAME"] ? process.env["MYSQL_USERNAME"] : 'root',
    password: process.env["MYSQL_PASSWORD"] ? process.env["MYSQL_PASSWORD"] : '',
    database: process.env["MYSQL_DATABASE"] ? process.env["MYSQL_DATABASE"] : 'Moderation_DB',
    synchronize: false,
    logging: false,
    entities: [Report, Archive],
    migrations: [],
    subscribers: [],
})