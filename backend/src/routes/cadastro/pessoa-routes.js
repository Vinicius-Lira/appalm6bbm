'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/Cadastros/pessoas-controller');

router.get('/pessoas', controller.getAll);
router.get('/:id', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;
