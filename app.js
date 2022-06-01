const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passportSetup = require('./middleware/passport-setup')

// import { generateUploadURL } from './s3.js'


const port = process.env.PORT || 8080;
const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        // added next three lines to test frontend
        // response.setHeader("Access-Control-Allow-Origin", "*");
        // res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        next();
    })
    .use('/', require('./routes'));

process.on('uncaughtException', (err,origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDB((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`DB working and hosted on ${port}`);
    }
});

