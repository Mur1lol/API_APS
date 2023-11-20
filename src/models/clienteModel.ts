import { Cliente } from '../entity/Cliente';
import { AppDataSource } from "../data-source"
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv'

config();

type AutenticationResult = {
  token: string;
  cliente: {
    id: number;
    nome: string;
    email: string;
    tipo: string;
  };
}

const secretKey = process.env.TOKEN;
const repository = AppDataSource.getRepository(Cliente);

const getClienteModel = async (userId): Promise<Cliente> => {
  const clientes = await repository.findOne({ where: { id: userId } });
  return clientes;
};

const createClienteModel = async (dados): Promise<Cliente> => {
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

const autenticaClienteModel = async (dados): Promise<AutenticationResult> => {
  const { email, senha } = dados;

  const cliente = await repository.findOne({
    where: { email }
  });

  if (!cliente) {
    throw new Error('Cliente não encontrado');
  }

  const autenticado = await compare(senha, cliente.senha);

  if (autenticado) {
    const payload = {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      tipo: 'cliente'
    }
    const token = sign(payload, secretKey, { expiresIn: '1h' });
    return { token, cliente: payload };
  } else {
    throw new Error('Credenciais inválidas');
  }
};

export {
  getClienteModel,
  createClienteModel,
  autenticaClienteModel,
};
