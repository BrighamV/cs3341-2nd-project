const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport')
const session = require('express-session')
const passportSetup = require('./middleware/passport-setup')(passport)

// import { generateUploadURL } from './s3.js'

// passport config
// require('./middleware/passport-setup');(passport)

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

    // express session
    .use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
    }))

    // passport middleware
    .use(passport.initialize())
    .use(passport.session())

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

