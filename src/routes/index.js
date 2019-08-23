'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // res.status(200).send({
    //     title: "Node Store API",
    //     version: "0.0.1"
    // });
    res.render('index', { title: 'Express' });
});

module.exports = router;
