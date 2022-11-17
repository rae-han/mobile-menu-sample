const express = require('express');

const router = express.Router();

router.post('/upload', async (req, res, next) => {
  console.log('file upload server')
});

module.exports = router;