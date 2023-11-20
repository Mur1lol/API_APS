import { Request, Response, NextFunction } from 'express';

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

const validateFieldsAgenda = async (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;

  if (body.data == '' || body.data == undefined) { return res.status(400).json({ message: 'The field `data` is required and cannot be empty!' }); }
  if (body.hora == '' || body.hora == undefined) { return res.status(400).json({ message: 'The field `hora` is required and cannot be empty!' }); }

  next();
};

export {
  validateFieldsCadastro,
  validateFieldsLogin,
  validateFieldsAgenda
}