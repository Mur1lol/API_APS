import { Request, Response } from 'express';
import { autenticaClienteModel, createClienteModel, getClienteModel } from '../models/clienteModel';

const getCliente = async (req: Request, res: Response) => {
    try {
        const dados = await getClienteModel(req.body);
        return res.status(200).json(dados);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCliente = async(req, res) => {
    try {
        const dados = await createClienteModel(req.body);
        return res.status(200).json(dados);
    } catch (error) {
        console.error('Erro durante o registro:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const autenticaCliente = async (req, res) => {
    try {
        const dados = await autenticaClienteModel(req.body);
        return res.status(200).json({ token: dados });
    } catch (error) {
        return res.status(401).json({ error: 'Credenciais inválidas'+error });
    }
};

export { 
    getCliente, 
    createCliente,
    autenticaCliente,
}