import { Request, Response } from 'express';
import { getFuncionarioModel, createFuncionarioModel, autenticaFuncionarioModel } from '../models/funcionarioModel';

const getFuncionario = async (req: Request, res: Response) => {
  try {
    const userId = req['userId'];
    const dados = await getFuncionarioModel(userId);
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createFuncionario = async (req, res) => {
  try {
    const dados = await createFuncionarioModel(req.body);
    return res.status(200).json({ sucess: 'Funcionario Cadastrado!' });
  } catch (error) {
    console.error('Erro durante o registro:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const autenticaFuncionario = async (req, res) => {
  try {
    const dados = await autenticaFuncionarioModel(req.body);
    return res.status(200).json({ dados });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export {
  getFuncionario,
  createFuncionario,
  autenticaFuncionario,
}