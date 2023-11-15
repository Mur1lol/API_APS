import { Funcionario } from '../entity/Funcionario';
import { AppDataSource } from "../data-source" // Importe a conexão correta do PostgreSQL
import { hash, compare } from 'bcryptjs';

const repository = AppDataSource.getRepository(Funcionario);

const getAll = async (): Promise<Funcionario[]> => {
    const funcionarios = await repository.find();
    return funcionarios;
};

const createFuncionario = async (dados): Promise<Funcionario> => {
    console.log("Inserting a new data into the database...");

    const { nome, email, senha } = dados;

    const funcionario = new Funcionario();

    funcionario.nome = nome;
    funcionario.email = email;
    funcionario.senha = await createPasswordHash(senha);

    const createdFuncionario = await repository.save(funcionario);
    
    console.log("Saved a new funcionario with id: " + funcionario.id);
    return createdFuncionario;
}

const createPasswordHash = async (senha: string): Promise<string> => {
    const saltRounds: number = 10;
    return hash(senha, saltRounds);
};

const autenticaFuncionario = async (dados): Promise<Funcionario> => {
    const { email, senha } = dados;

    const funcionario = await repository.findOne({ 
        where: { email } 
    });

    if (!funcionario) {
        throw new Error('Funcionario não encontrado');
    }

    const autenticado = await compare(senha, funcionario.senha);

    if (autenticado) {
        return funcionario;
    } else {
        throw new Error('Credenciais inválidas');
    }
};

export {
    getAll,
    createFuncionario,
    autenticaFuncionario,
};
