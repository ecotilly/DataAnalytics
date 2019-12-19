const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())
app.set('views', './views');
app.set('view engine', 'pug');
app.set('trust proxy', true);

const db = require('./configs/db.config');
const environment = require('./configs/environment.config');

// force: true will drop the table if it already exists
db.sequelize.sync({force: environment.force}).then(() => {
    if (environment.force) {
        console.log('Drop and Re-Create tables with { force: ' + environment.force + ' }');
    } else {
        console.log('Syncing tables with { force: ' + environment.force + ' }');
    }
});

require('./routes/v1.route')(app);

exports.main = app;