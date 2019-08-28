'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Cadastros/hierarquia-controller');

router.get('/hierarquias', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
