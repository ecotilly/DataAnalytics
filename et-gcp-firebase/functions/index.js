const functions = require('firebase-functions');
var requestVar = require('request');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();
app.use(cors({ origin: true }))
app.use(bodyParser.json())
app.set('views', './views');
app.set('view engine', 'pug');
app.set('trust proxy', true);

// const db = require('./configs/db.config');
// const environment = require('./configs/environment.config');

// force: true will drop the table if it already exists
// db.sequelize.sync({force: environment.force}).then(() => {
//     if (environment.force) {
//         console.log('Drop and Re-Create tables with { force: ' + environment.force + ' }');
//     } else {
//         console.log('Syncing tables with { force: ' + environment.force + ' }');
//     }
// });

// db.sequelize.sync({force: environment.force});

// require('./routes/v1.route')(app);

// exports.main = functions.https.onRequest(app);

app.use(cors({ origin: true }))

app.get("/v1/stats/countByDate", (request, res) => {
    var options = {
        url: "https://asia-east2-mailgmailapi.cloudfunctions.net/ecotilly-function/v1/stats/countByDate",
        method: "get"
    };
    requestVar(options, (error, response, body) => {
        if (error) {
            console.error('error:', error);
        } else {
            console.log('Response: Headers:', response && response.headers);
        res.status(200).send(body);
        }
    });
})

app.get('/', (req, res) => {
    res.status(200).send("Working.");
});

const api = functions.region('asia-east2').https.onRequest(app)

module.exports = {
  api
}
