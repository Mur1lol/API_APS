import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv'

config();

const secretKey = process.env.TOKEN;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = verify(token, secretKey);
    req['userId'] = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

const verifyTokenCliente = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = verify(token, secretKey);
    if (decoded.tipo == 'cliente') {
      req['userId'] = decoded.id;
      next();
    }
    else {
      throw new Error("Acesso negado!");
    }
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

const verifyTokenFuncionario = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = verify(token, secretKey);
    if (decoded.tipo == 'funcionario') {
      req['userId'] = decoded.id;
      next();
    }
    else {
      throw new Error("Acesso negado!");
    }
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

const verifyTokenAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = verify(token, secretKey);
    if (decoded.tipo == 'admin') {
      req['userId'] = decoded.id;
      next();
    }
    else {
      throw new Error("Acesso negado!");
    }
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export {
  verifyToken,
  verifyTokenCliente,
  verifyTokenFuncionario,
  verifyTokenAdmin
}