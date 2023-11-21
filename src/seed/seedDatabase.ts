import { Funcionario } from '../entity/Funcionario';
import { AppDataSource } from "../data-source";
import { Funcao } from '../entity/Funcao';

const repositoryFuncionario = AppDataSource.getRepository(Funcionario);
const repositoryFuncao = AppDataSource.getRepository(Funcao);

export async function seedDatabase() {
  try {
    // Dados estáticos
    const usersData = [
      { nome: 'Murilo', email: 'murilo@murilo', senha: '12345', admin:true },
      { nome: 'Fabio', email: 'flavia@flavia', senha: '12345', admin:true },
      { nome: 'Flavia', email: 'fabio@fabio', senha: '12345', admin:true },
      { nome: 'Sebastião', email: 'bastiao@bastiao', senha: '12345', admin:true }
    ];

    // Cria instâncias das entidades
    const users = usersData.map(userData => repositoryFuncionario.create(userData));

    // Persiste os dados no banco de dados
    await repositoryFuncionario.save(users);

    console.log('Dados estáticos adicionados com sucesso.');
  } catch (error) {
    console.error('Erro ao adicionar dados estáticos:', error);
  }

  try {
    // Dados estáticos
    const funcoesData = [
      { nome_funcao: 'Cabeleireiro(a)' },
      { nome_funcao: 'Manicure' },
      { nome_funcao: 'Pedicure' },
    ];

    // Cria instâncias das entidades
    const funcoes = funcoesData.map(funcaoData => repositoryFuncao.create(funcaoData));

    // Persiste os dados no banco de dados
    await repositoryFuncao.save(funcoes);

    console.log('Dados estáticos adicionados com sucesso.');
  } catch (error) {
    console.error('Erro ao adicionar dados estáticos:', error);
  }
}

// Executa a função para adicionar dados estáticos
seedDatabase();
