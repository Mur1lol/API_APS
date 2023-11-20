import { Request, Response } from 'express';
import { createFuncao, getAll } from '../models/funcaoModel';

const getAlls = async (req: Request, res: Response) => {
  try {
    const dados = await getAll();
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createFuncaos = async (req, res) => {
  try {
    const dados = await createFuncao(req.body);
    return res.status(200).json(dados);
  } catch (error) {
    console.error('Erro durante o registro:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getAlls,
  createFuncaos,
}