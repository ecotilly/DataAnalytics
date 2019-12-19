const db = require('../configs/db.config');
const Order = db.orders;
const Product = db.products;
const sequelize = db.sequelize;

exports.create = (req, res) => {
    // Save to database
    Order.create(req.body, {include: [Product]}).then(customer => {
        // Send created customer to client
        console.log("created: " + req.body);
        res.status(200).send("done");
    });
};

exports.findAll = (req, res) => {
    Order.findAll().then(orders => {
        // Send all customers to Client
        res.status(200).send(orders);
    });
};

exports.notify = (req, res) => {
    res.render('invoice.view.pug', req.body);
}