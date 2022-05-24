const express = require('express');
const router = express.Router();
const generate = require('../middleware/s3');



router.get('/', async (req, res) => {
    const url = await generate.generateUploadURL()
    // console.log("ehre in url", url)
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send({url})
})

// router.get('/', generate.generateUploadURL)


module.exports = router;