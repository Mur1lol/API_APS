import { Request, Response } from 'express';
import { getAll, createUser, autenticaUser } from '../models/userModel';

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const insertUser = async(req, res) => {
    try {
        const users = await createUser(req.body);
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erro durante o registro:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const autenticUser = async (req, res) => {
    try {
        const users = await autenticaUser(req.body);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
};

export { 
    getUsers, 
    insertUser,
    autenticUser,
}