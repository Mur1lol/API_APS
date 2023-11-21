import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../data-source"
import { Funcionario } from '../entity/Funcionario';
import { Funcao } from '../entity/Funcao';

const validateFieldsCadastro = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  if (body.nome == '' || body.nome == undefined) { return res.status(400).json({ message: 'The field `nome` is required and cannot be empty!' }); }
  if (body.email == '' || body.email == undefined) { return res.status(400).json({ message: 'The field `email` is required and cannot be empty!' }); }
  if (body.senha == '' || body.senha == undefined) { return res.status(400).json({ message: 'The field `senha` is required and cannot be empty!' }); }

  next();
};

const validateFieldsLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  if (body.email == '' || body.email == undefined) { return res.status(400).json({ message: 'The field `email` is required and cannot be empty!' }); }
  if (body.senha == '' || body.senha == undefined) { return res.status(400).json({ message: 'The field `senha` is required and cannot be empty!' }); }

  next();
};

const validateFieldsFunciFuncao = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  const existingFuncionario = await AppDataSource.getRepository(Funcionario).findOne({ where: {id: body.id_funcionario} });
  const existingFuncao      = await AppDataSource.getRepository(Funcao).findOne({ where: { id: body.id_funcao } });

  if (!existingFuncionario) {
    return res.status(400).json({ message: 'This `funcionario` doesn`t exists' });
  }
  if (!existingFuncao) {
    return res.status(400).json({ message: 'This `funcao` doesn`t exists' });
  }

  next();
}

const validateFieldsAgenda = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  const horarios = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];

  if (body.data == '' || body.data == undefined) { return res.status(400).json({ message: 'The field `data` is required and cannot be empty!' }); }
  if (body.hora == '' || body.hora == undefined) { return res.status(400).json({ message: 'The field `hora` is required and cannot be empty!' }); }

  if (horarios.indexOf(body.hora) <= -1) {
    return res.status(400).json({ message: 'The field `hora` is wrong!' });
  }

  next();
};

export {
  validateFieldsCadastro,
  validateFieldsLogin,
  validateFieldsFunciFuncao,
  validateFieldsAgenda
}