const environment = require('./environment.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(environment.database, environment.username, environment.password, {
    host: environment.host,
    dialect: environment.dialect,
    operatorsAliases: false,
    pool: {
        max: environment.pool.max,
        min: environment.pool.min,
        acquire: environment.pool.acquire,
        idle: environment.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.orders = require('../models/order.model')(sequelize, Sequelize);
db.products = require('../models/product.model')(sequelize, Sequelize);

// Here we can connect order and products base on order'id
db.orders.hasMany(db.products, {foreignKey: 'fk_orderId', sourceKey: 'uuid'});
db.products.belongsTo(db.orders, {foreignKey: 'fk_orderId', targetKey: 'uuid'});

module.exports = db;