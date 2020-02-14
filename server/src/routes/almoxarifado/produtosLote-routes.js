'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/almoxarifado/produtosLote-controller');

router.get('/lote/:idLote',  controller.getAll);
router.get('/:id',  controller.get);
router.post('/',    controller.post);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
