import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv'

config();

const secretKey = process.env.TOKEN;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = verify(token, secretKey);
    req['userId'] = decoded.id; // Adiciona o ID do usuário à solicitação para uso posterior, se necessário
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};