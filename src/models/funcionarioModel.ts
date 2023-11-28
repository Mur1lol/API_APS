import { Funcionario } from '../entity/Funcionario';
import { AppDataSource } from "../data-source"
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv'

config();

type AutenticationResult = {
  token: string;
  funcionario: {
    id: number;
    nome: string;
    email: string;
    tipo: string;
  }
}

type CreationResult = {
  sucess: string;
  id: number;
}

const secretKey = process.env.TOKEN;
const repository = AppDataSource.getRepository(Funcionario);

const getFuncionarioModel = async (userId): Promise<Funcionario> => {
  const funcionarios = await repository.findOne({ where: { id: userId } });
  return funcionarios;
};

const createFuncionarioModel = async (dados): Promise<CreationResult> => {
  console.log("Inserting a new data into the database...");

  const { nome, email, senha, admin } = dados.body;
  const ad = dados['admin'];

  const funcionario = new Funcionario();

  funcionario.nome = nome;
  funcionario.email = email;
  funcionario.senha = await createPasswordHash(senha);
  funcionario.admin = admin || ad;

  const createdFuncionario = await repository.save(funcionario);

  console.log("Saved a new funcionario with id: " + funcionario.id);
  return { sucess: 'Funcionario Cadastrado!', id: funcionario.id};
}

const createPasswordHash = async (senha: string): Promise<string> => {
  const saltRounds: number = 10;
  return hash(senha, saltRounds);
};

const autenticaFuncionarioModel = async (dados): Promise<AutenticationResult> => {
  const { email, senha } = dados;

  const funcionario = await repository.findOne({
    where: { email }
  });

  if (!funcionario) {
    throw new Error('Funcionario não encontrado');
  }

  const autenticado = await compare(senha, funcionario.senha);

  if (autenticado) {
    const tipo = (funcionario.admin) ? 'admin' : 'funcionario';
    const payload = {
      id: funcionario.id,
      nome: funcionario.nome,
      email: funcionario.email,
      tipo: tipo
    }
    const token = sign(payload, secretKey, { expiresIn: '1h' });
    return { token, funcionario: payload };
  } else {
    throw new Error('Credenciais inválidas');
  }
};

export {
  getFuncionarioModel,
  createFuncionarioModel,
  autenticaFuncionarioModel,
};
