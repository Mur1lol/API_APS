import { AppDataSource } from "../data-source";
import { Agendamento } from "../entity/Agendamento";

const repository = AppDataSource.getRepository(Agendamento);

const getAll = async (): Promise<Agendamento[]> => {
  const agendamentos = await repository.find({
    select: {
      cliente: {
        id: true,
        nome: true
      },
      funcionario_funcao: {
        id: true,
        funcionario: {
          id: true,
          nome: true
        },
        funcao: {
          id: true,
          nome_funcao: true
        }
      }
    },
    relations: {
      cliente: true,
      funcionario_funcao: {
        funcionario: true,
        funcao: true
      }
    },
  });

  return agendamentos;
};

const getAgendamentoClienteModel = async (clienteId): Promise<Agendamento[]> => {
  const { userId } = clienteId;
  const agendamentos = await repository.find({
    where: {
      cliente: { id: userId }
    },
    select: {
      cliente: {
        id: true,
        nome: true
      },
      funcionario_funcao: {
        id: true,
        funcionario: {
          id: true,
          nome: true
        },
        funcao: {
          id: true,
          nome_funcao: true
        }
      }
    },
    relations: {
      cliente: true,
      funcionario_funcao: {
        funcionario: true,
        funcao: true
      }
    },
  });

  return agendamentos;
}

const getAgendamentoFuncionarioModel = async (funcionarioId): Promise<Agendamento[]> => {
  const { userId } = funcionarioId;
  const agendamentos = await repository.find({
    where: {
      funcionario_funcao: { funcionario: { id: userId } }
    },
    select: {
      cliente: {
        id: true,
        nome: true
      },
      funcionario_funcao: {
        id: true,
        funcionario: {
          id: true,
          nome: true
        },
        funcao: {
          id: true,
          nome_funcao: true
        }
      }
    },
    relations: {
      cliente: true,
      funcionario_funcao: {
        funcionario: true,
        funcao: true
      }
    },
  });

  return agendamentos;
}

const createAgendamento = async (dados): Promise<Agendamento> => {
  console.log("Inserting a new data into the database...");

  const { data, hora, id_funcionario_funcao } = dados.body;
  const id_cliente = dados['userId'];

  const agendamento = new Agendamento();

  agendamento.data = data;
  agendamento.hora = hora;
  agendamento.cliente = id_cliente;
  agendamento.funcionario_funcao = id_funcionario_funcao;

  const createdAgendamento = await repository.save(agendamento);

  return createdAgendamento;
}

export {
  getAll,
  getAgendamentoClienteModel,
  getAgendamentoFuncionarioModel,
  createAgendamento,
}