import "reflect-metadata"
import { DataSource } from "typeorm"
import { config } from 'dotenv';

import { Cliente } from "./entity/Cliente";
import { Funcionario } from "./entity/Funcionario";
import { Funcao } from "./entity/Funcao";
import { Funcionario_Funcao } from "./entity/Funcionario_Funcao";
import { Agendamento } from "./entity/Agendamento";

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
    entities: [Cliente, Funcionario, Funcao, Funcionario_Funcao, Agendamento],
    migrations: [],
    subscribers: [],
})

export { AppDataSource };