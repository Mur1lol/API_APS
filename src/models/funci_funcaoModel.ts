import { Funcionario_Funcao } from '../entity/Funcionario_Funcao';
import { AppDataSource } from "../data-source" // Importe a conexão correta do PostgreSQL

const repository = AppDataSource.getRepository(Funcionario_Funcao);

const getAll = async (): Promise<Funcionario_Funcao[]> => {
  const funci_funcaos = await repository.find({
    select: {
      funcionario: {
        id: true,
        nome: true
      },
      funcao: {
        id: true,
        nome_funcao: true
      }
    },
    relations: {
      funcionario: true,
      funcao: true
    }
  });
  return funci_funcaos;
};

const getFuncionariosModel = async (funcaoId): Promise<Funcionario_Funcao[]> => {
  const funci_funcaos = await repository.find({
    where: {
      funcao: { id: funcaoId }
    },
    select: {
      funcionario: {
        id: true,
        nome: true
      }
    },
    relations: {
      funcionario: true,
    }
  });
  return funci_funcaos;
};

const createFuncionario_Funcao = async (dados): Promise<Funcionario_Funcao> => {
  console.log("Inserting a new data into the database...");

  const { id_funcionario, id_funcao } = dados;

  const funci_funcao = new Funcionario_Funcao();

  funci_funcao.funcionario = id_funcionario;
  funci_funcao.funcao = id_funcao;

  const createdFuncionario_Funcao = await repository.save(funci_funcao);

  console.log("Saved a new funci_funcao with id: " + funci_funcao.id);
  return createdFuncionario_Funcao;
}

export {
  getAll,
  createFuncionario_Funcao,
  getFuncionariosModel
};
