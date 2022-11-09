const express = require('express');

const store = require('./apis/store');

const router = express.Router();

router.get('/system/health', (req, res, next) => res.status(200).json({ statusCode: 200, statusMessage: 'ok' }));

router.use('/store', store);

module.exports = router;
