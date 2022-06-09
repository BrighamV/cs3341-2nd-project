const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/recipes', require('./recipes'));
router.use('/s3Url', require('./s3Url'))
router.use('/auth', require('./auth'))

module.exports = router;