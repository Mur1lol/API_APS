import express = require('express');
const router = express.Router();

import * as userController from './controllers/userController';

/**********************
 * Rotas              *
 **********************/

// Retorna todos os dados
router.get('/user', userController.getUsers);
router.post('/user', userController.insertUser);
router.post('/user/autentica', userController.autenticUser);

export default router ;