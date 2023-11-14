import { User } from '../entity/User';
import { AppDataSource } from "../data-source" // Importe a conexão correta do PostgreSQL
import { hash, compare } from 'bcryptjs';

const userRepository = AppDataSource.getRepository(User);

const getAll = async (): Promise<User[]> => {
    const users = await userRepository.find();
    return users;
};

const createUser = async (dados): Promise<User> => {
    console.log("Inserting a new data into the database...");

    const { name, email, password } = dados;

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = await createPasswordHash(password);

    const createdUser = await userRepository.save(user);
    
    console.log("Saved a new user with id: " + user.id);
    return createdUser;
}

const createPasswordHash = async (senha: string): Promise<string> => {
    const saltRounds: number = 10;
    return hash(senha, saltRounds);
};

const autenticaUser = async (dados): Promise<User> => {
    const { email, password } = dados;

    const user = await userRepository.findOne({ 
        where: { email } 
    });

    if (!user) {
        throw new Error('User não encontrado');
    }

    const autenticado = await compare(password, user.password);

    if (autenticado) {
        return user;
    } else {
        throw new Error('Credenciais inválidas');
    }
};

export {
    getAll,
    createUser,
    autenticaUser,
};
