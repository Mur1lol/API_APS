import { Funcao } from '../entity/Funcao';
import { AppDataSource } from "../data-source" // Importe a conexão correta do PostgreSQL

const repository = AppDataSource.getRepository(Funcao);

const getAll = async (): Promise<Funcao[]> => {
    const funcaos = await repository.find();
    return funcaos;
};

const createFuncao = async (dados): Promise<Funcao> => {
    console.log("Inserting a new data into the database...");

    const { nome_funcao } = dados;

    const funcao = new Funcao();

    funcao.nome_funcao = nome_funcao;

    const createdFuncao = await repository.save(funcao);
    
    console.log("Saved a new funcao with id: " + funcao.id);
    return createdFuncao;
}

export {
    getAll,
    createFuncao,
};
