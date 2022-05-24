const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/recipes', require('./recipes'));
router.use('/s3Url', require('./s3Url'))

module.exports = router;