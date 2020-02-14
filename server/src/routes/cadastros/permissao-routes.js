'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/cadastros/permissao-controller');

router.get('/:usuario',  controller.get);
router.get('/getById/:idResponsavel', controller.getById);
router.post('/',    controller.post);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
