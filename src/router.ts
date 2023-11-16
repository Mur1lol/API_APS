import express = require('express');
const router = express.Router();

import * as clienteController      from './controllers/clienteController';
import * as funcionarioController  from './controllers/funcionarioController';
import * as funcaoController       from './controllers/funcaoController';
import * as funci_funcaoController from './controllers/funci_funcaoController';
import * as agendamentoController  from './controllers/agendamentoController';

import { validateEmail } from './middlewares/validateEmail';
import { verifyToken } from './middlewares/verifyToken';

/**********************
 * Cliente            *
 **********************/
router.get('/cliente', verifyToken, clienteController.getCliente);
router.post('/cliente', validateEmail, clienteController.createCliente);
router.post('/cliente/login', clienteController.autenticaCliente);

/**********************
 * Funcionario        *
 **********************/
router.get('/funcionario', verifyToken, funcionarioController.getFuncionario);
router.post('/funcionario', validateEmail, funcionarioController.createFuncionario);
router.post('/funcionario/login', funcionarioController.autenticaFuncionario);

/**********************
 * Funcao             *
 **********************/
router.get('/funcao', funcaoController.getAlls);
router.post('/funcao', funcaoController.createFuncaos);

/**********************
 * Funcionario_Funcao *
 **********************/
router.get('/funci_funcao', funci_funcaoController.getAlls);
router.post('/funci_funcao', funci_funcaoController.createFuncionario_Funcaos);

/**********************
 * Agendamento        *
 **********************/
router.get('/agendamento', agendamentoController.getAlls);
router.get('/agendamento/data/:data', agendamentoController.getAgendamentoMes);
router.get('/agendamento/cliente', verifyToken, agendamentoController.getAgendamentoCliente)
router.post('/agendamento', agendamentoController.createAgendamentos);

export default router ;