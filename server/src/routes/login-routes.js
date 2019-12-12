'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/login-controller');

router.post('/validToken', controller.validToken);
router.post('/autenticaSaida', controller.autenticaSaida);
router.post('/loginoff', controller.loginoff);
router.post('/',    controller.post);
router.put('/',     controller.update);

module.exports = router;
