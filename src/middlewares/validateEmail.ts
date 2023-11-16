import { Request, Response, NextFunction } from 'express';

import { AppDataSource } from "../data-source" // Importe a conexão correta do PostgreSQL

import { Cliente } from '../entity/Cliente';
import { Funcionario } from '../entity/Funcionario';

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const existingCliente = await AppDataSource.getRepository(Cliente).findOne({ where: {email: body.email }});
    const existingFuncionario = await AppDataSource.getRepository(Funcionario).findOne({ where: {email: body.email }});
        
    if (existingCliente || existingFuncionario) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    next();
};

export { 
    validateEmail,
}