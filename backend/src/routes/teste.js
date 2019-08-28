'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/teste-controller');
const controller1 = require('../controllers/Cadastros/funcoes-controller');

router.get('/funcao/:id', controller1.get);
router.get('/funcoes', controller1.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
