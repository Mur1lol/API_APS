import express = require('express');
const router = express.Router();

import * as clienteController from './controllers/clienteController';
import * as funcionarioController from './controllers/funcionarioController';
import * as funcaoController from './controllers/funcaoController';
import * as funci_funcaoController from './controllers/funci_funcaoController';
import * as agendamentoController from './controllers/agendamentoController';

import { validateEmail } from './middlewares/validateEmail';
import { verifyToken } from './middlewares/verifyToken';
import { validateFieldsCadastro, validateFieldsLogin, validateFieldsAgenda } from './middlewares/validateFields';

/**********************
 * Cliente            *
 **********************/
router.get('/cliente', verifyToken, clienteController.getCliente);
router.post('/cliente', validateFieldsCadastro, validateEmail, clienteController.createCliente);
router.post('/cliente/login', validateFieldsLogin, clienteController.autenticaCliente);

/**********************
 * Funcionario        *
 **********************/
router.get('/funcionario', verifyToken, funcionarioController.getFuncionario);
router.post('/funcionario', validateFieldsCadastro, validateEmail, funcionarioController.createFuncionario);
router.post('/funcionario/login', validateFieldsLogin, funcionarioController.autenticaFuncionario);

/**********************
 * Funcao             *
 **********************/
router.get('/funcao', funcaoController.getAlls);
router.post('/funcao', funcaoController.createFuncaos);

/**********************
 * Funcionario_Funcao *
 **********************/
router.get('/funci_funcao', funci_funcaoController.getAlls);
router.get('/funci_funcao/:funcao', funci_funcaoController.getFuncionarios);
router.post('/funci_funcao', funci_funcaoController.createFuncionario_Funcaos);

/**********************
 * Agendamento        *
 **********************/
router.get('/agendamento', agendamentoController.getAlls);
router.get('/agendamento/data/:data', agendamentoController.getAgendamentoMes);
router.get('/agendamento/cliente', verifyToken, agendamentoController.getAgendamentoCliente);
router.post('/agendamento', validateFieldsAgenda, agendamentoController.createAgendamentos);

export default router;