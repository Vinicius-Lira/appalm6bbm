'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/produto-controller');

router.get('/',  controller.getAll);
router.get('/produtosEmEstoque', controller.getAllEmEstoque);
router.get('/getProdutosByIdContrato/:idContrato', controller.getProdutosByIdContrato);
router.get('/getPropriedadesProdutosSaida/:idProduto', controller.getPropriedadesProdutosSaida);
router.get('/verificaEstoque/:idPropriedade/:qtd', controller.verificaEstoque);
router.get('/:id',  controller.get);
router.post('/',    controller.post);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
