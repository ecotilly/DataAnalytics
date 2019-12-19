const db = require('../configs/db.config');
const Order = db.orders;
const Product = db.products;
const sequelize = db.sequelize;

exports.ordersCount = (req, res) => {
    sequelize.query("select count(distinct \"orderId\") from orders", {type: sequelize.QueryTypes.SELECT})
        .then(function (customers) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(customers);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send(customers[0]);
        });
}

exports.productsCount = (req, res) => {
    sequelize.query("select count(distinct \"productId\") from products", {type: sequelize.QueryTypes.SELECT})
        .then(function (customers) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(customers);
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send(customers[0]);
        });
}

exports.ordersCountByDate = (req, res) => {
    sequelize.query("select to_date(\"orderDate\",'YYYY-MM-DD'), count(*) from orders GROUP BY to_date(\"orderDate\",'YYYY-MM-DD')", {type: sequelize.QueryTypes.SELECT})
        .then(function (orderStats) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(orderStats);
            var data = {"xaxis": [], "yaxis": []}
            orderStats.forEach(function (element) {
                data.xaxis.push(element.to_date);
                data.yaxis.push(element.count);
            })
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send(data);
        });
}

exports.ordersCountByUserName = (req, res) => {
    sequelize.query("select \"userName\", count(*) from orders GROUP BY \"userName\"", {type: sequelize.QueryTypes.SELECT})
        .then(function (orderStats) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(orderStats);
            var data = {"labels": [], "values": []}
            orderStats.forEach(function (element) {
                data.labels.push(element.userName);
                data.values.push(element.count);
            })
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send(data);
        });
}


exports.topProducts = (req, res) => {
    sequelize.query("select p.\"productId\", count(*) as count from products p group by p.\"productId\" order by count desc limit 10", {type: sequelize.QueryTypes.SELECT})
        .then(function (prodStats) {
            // We don't need spread here, since only the results will be returned for select queries
            console.log(prodStats);
            var data = {"yaxis": [], "series": []}
            prodStats.forEach(function (element) {
                data.yaxis.push(element.productId);
                data.series.push(element.count);
            })
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.status(200).send(data);
        });
}