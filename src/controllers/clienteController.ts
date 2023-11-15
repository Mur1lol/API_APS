import { Request, Response } from 'express';
import { autenticaCliente, createCliente, getAll } from '../models/clienteModel';

const getAlls = async (req: Request, res: Response) => {
    try {
        const dados = await getAll();
        return res.status(200).json(dados);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createClientes = async(req, res) => {
    try {
        const dados = await createCliente(req.body);
        return res.status(200).json(dados);
    } catch (error) {
        console.error('Erro durante o registro:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const autenticaClientes = async (req, res) => {
    try {
        const dados = await autenticaCliente(req.body);
        return res.status(200).json({ sucess: 'Usuario autenticado'});
    } catch (error) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
};

export { 
    getAlls, 
    createClientes,
    autenticaClientes,
}