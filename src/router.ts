import express = require('express');
const router = express.Router();

import * as clienteController from './controllers/clienteController';
import * as funcionarioController from './controllers/funcionarioController';
import * as funcaoController from './controllers/funcaoController';
import * as funci_funcaoController from './controllers/funci_funcaoController';
import * as agendamentoController from './controllers/agendamentoController';

/**********************
 * Cliente            *
 **********************/
router.get('/cliente', clienteController.getAlls);
router.post('/cliente', clienteController.createClientes);
router.post('/cliente/login', clienteController.autenticaClientes);

/**********************
 * Funcionario        *
 **********************/
router.get('/funcionario', funcionarioController.getAlls);
router.post('/funcionario', funcionarioController.createFuncionarios);
router.post('/funcionario/login', funcionarioController.autenticaFuncionarios);

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
router.post('/agendamento', agendamentoController.createAgendamentos);

export default router ;