'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/almoxarifado/propriedadesProduto-controller');

router.get('/',  controller.getAll);
router.get('/produtoid/:idProduto', controller.getByIdProduto);
router.get('/produtoidProdutoidContrato/:idProduto/:idContrato', controller.getByIdProdutoIdContrato);
router.get('/:id',  controller.get);
router.post('/',    controller.post);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
