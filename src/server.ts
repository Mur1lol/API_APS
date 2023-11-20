import { AppDataSource } from "./data-source"
import app from './app';
import { config } from 'dotenv';

config(); // Carregar variáveis de ambiente a partir do arquivo .env

const PORT = process.env.PORT || 3333;

AppDataSource.initialize().then(async () => {
  app.listen(PORT, () => console.log('Server running on ' + PORT));
}).catch(error => console.log(error));