import { Request, Response } from 'express';
import { createAgendamento, getAgendamentoClienteModel, getAgendamentoFuncionarioModel, getAll } from '../models/agendamentoModel';

const getAlls = async (req: Request, res: Response) => {
  try {
    const dados = await getAll();
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAgendamentoCliente = async (req: Request, res: Response) => {
  try {
    const dados = await getAgendamentoClienteModel(req.body);
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAgendamentoFuncionario = async (req: Request, res: Response) => {
  try {
    const dados = await getAgendamentoFuncionarioModel(req.body);
    return res.status(200).json(dados);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createAgendamentos = async (req, res) => {
  try {
    const dados = await createAgendamento(req.body);
    return res.status(200).json(dados);
  } catch (error) {
    console.error('Erro durante o registro:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getAlls,
  getAgendamentoCliente,
  getAgendamentoFuncionario,
  createAgendamentos,
}