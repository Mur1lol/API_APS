import { Funcionario } from '../entity/Funcionario';
import { AppDataSource } from "../data-source" // Importe a conexão correta do PostgreSQL
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv'

config();

const secretKey = process.env.TOKEN; 
const repository = AppDataSource.getRepository(Funcionario);

const getFuncionarioModel = async (): Promise<Funcionario[]> => {
    const funcionarios = await repository.find();
    return funcionarios;
};

const createFuncionarioModel = async (dados): Promise<Funcionario> => {
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

const autenticaFuncionarioModel = async (dados): Promise<Funcionario> => {
    const { email, senha } = dados;

    const funcionario = await repository.findOne({ 
        where: { email } 
    });

    if (!funcionario) {
        throw new Error('Cliente não encontrado');
    }

    const autenticado = await compare(senha, funcionario.senha);

    if (autenticado) {
        const token = sign({ id: funcionario.id, email: funcionario.email }, secretKey, { expiresIn: '1h' });
        return token;
    } else {
        throw new Error('Credenciais inválidas');
    }
};

export {
    getFuncionarioModel,
    createFuncionarioModel,
    autenticaFuncionarioModel,
};
