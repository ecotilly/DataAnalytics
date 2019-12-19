module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('order', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        orderId: {
            type: Sequelize.STRING
        },
        orderDate: {
            type: Sequelize.STRING
        },
        orderTax: {
            type: Sequelize.INTEGER
        },
        orderAmount: {
            type: Sequelize.INTEGER
        },
        clientId: {
            type: Sequelize.STRING
        },
        userName: {
            type: Sequelize.STRING
        },
        userMobile: {
            type: Sequelize.STRING
        },
        userEmail: {
            type: Sequelize.STRING
        }
    });

    return Order;
}