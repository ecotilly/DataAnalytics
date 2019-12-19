module.exports = function (app) {

    const notifyController = require('../controller/notify.controller');
    const statsController = require('../controller/stats.controller');

    app.post('/v1/create', notifyController.create);
    app.get('/v1/fetch', notifyController.findAll);
    app.post('/v1/notify', notifyController.notify);
    app.get('/v1/stats/orderscount', statsController.ordersCount);
    app.get('/v1/stats/productscount', statsController.productsCount);
    app.get('/v1/stats/countByDate', statsController.ordersCountByDate);
    app.get('/v1/stats/countByUserName', statsController.ordersCountByUserName);
    app.get('/v1/stats/topProducts', statsController.topProducts);
}