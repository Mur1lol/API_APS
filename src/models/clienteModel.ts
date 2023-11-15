import { Cliente } from '../entity/Cliente';
import { AppDataSource } from "../data-source" // Importe a conexão correta do PostgreSQL
import { hash, compare } from 'bcryptjs';

const repository = AppDataSource.getRepository(Cliente);

const getAll = async (): Promise<Cliente[]> => {
    const clientes = await repository.find();
    return clientes;
};

const createCliente = async (dados): Promise<Cliente> => {
    console.log("Inserting a new data into the database...");

    const { nome, email, senha } = dados;

    const cliente = new Cliente();

    cliente.nome = nome;
    cliente.email = email;
    cliente.senha = await createPasswordHash(senha);

    const createdCliente = await repository.save(cliente);
    
    console.log("Saved a new cliente with id: " + cliente.id);
    return createdCliente;
}

const createPasswordHash = async (senha: string): Promise<string> => {
    const saltRounds: number = 10;
    return hash(senha, saltRounds);
};

const autenticaCliente = async (dados): Promise<Cliente> => {
    const { email, senha } = dados;

    const cliente = await repository.findOne({ 
        where: { email } 
    });

    if (!cliente) {
        throw new Error('Cliente não encontrado');
    }

    const autenticado = await compare(senha, cliente.senha);

    if (autenticado) {
        return cliente;
    } else {
        throw new Error('Credenciais inválidas');
    }
};

export {
    getAll,
    createCliente,
    autenticaCliente,
};
