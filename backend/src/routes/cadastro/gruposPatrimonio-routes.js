'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Cadastros/gruposPatrimonio-controller');

router.get('/gruposPatrimonio', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;
