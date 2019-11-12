'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/permissao-controller');

router.get('/:usuario',  controller.get);
router.post('/',    controller.post);
router.put('/',     controller.update);
router.delete('/:id/delete', controller.delete);

module.exports = router;
