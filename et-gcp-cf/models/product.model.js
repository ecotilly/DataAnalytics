module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        productId: {
            type: Sequelize.STRING
        },
        productName: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        subTotal: {
            type: Sequelize.INTEGER
        }
    });

    return Product;
}