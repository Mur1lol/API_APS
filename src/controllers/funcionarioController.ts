import { Request, Response } from 'express';
import { autenticaFuncionario, createFuncionario, getAll } from '../models/funcionarioModel';

const getAlls = async (req: Request, res: Response) => {
    try {
        const dados = await getAll();
        return res.status(200).json(dados);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createFuncionarios = async(req, res) => {
    try {
        const dados = await createFuncionario(req.body);
        return res.status(200).json(dados);
    } catch (error) {
        console.error('Erro durante o registro:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const autenticaFuncionarios = async (req, res) => {
    try {
        const dados = await autenticaFuncionario(req.body);
        return res.status(200).json({ sucess: 'Usuario autenticado'});
    } catch (error) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
};

export { 
    getAlls, 
    createFuncionarios,
    autenticaFuncionarios,
}