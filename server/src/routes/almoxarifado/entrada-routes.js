'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/almoxarifado/entrada-controller');

router.get('/',  controller.getAll);
router.get('/:id',  controller.get);
router.get('/entradaItens/:idEntrada', controller.getItensEntrada);
router.post('/',    controller.post);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
