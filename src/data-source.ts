import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { config } from 'dotenv';

config(); // Carregar variáveis de ambiente a partir do arquivo .env

const AppDataSource = new DataSource({
    type: "postgres",
    
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,

    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

export { AppDataSource };