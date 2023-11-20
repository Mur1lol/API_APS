import { Request, Response } from 'express';
import { createFuncionario_Funcao, getAll, getFuncionariosModel } from '../models/funci_funcaoModel';

const getAlls = async (req: Request, res: Response) => {
  try {
    const dados = await getAll();
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFuncionarios = async (req: Request, res: Response) => {
  try {
    const { funcao } = req.params;
    const dados = await getFuncionariosModel(funcao);
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createFuncionario_Funcaos = async (req, res) => {
  try {
    const dados = await createFuncionario_Funcao(req.body);
    return res.status(200).json(dados);
  } catch (error) {
    console.error('Erro durante o registro:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getAlls,
  createFuncionario_Funcaos,
  getFuncionarios
}