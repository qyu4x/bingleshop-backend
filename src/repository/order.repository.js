const {
    Orders, PaymentMethods, Logistics, Products, Address, sequelize, Categories, User, SubCategories, OrdersDetails
} = require('../model');

const create = async (order) => {
    return await Orders.create(order);
}

const findWithUserAndPaymentMethodById = async (orderId) => {
    return await Orders.findByPk(orderId, {
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email', 'full_name']
        }, {
            model: PaymentMethods, as: 'payment_method'
        }]
    });
}

const findOneByOrderIdAndPaymentCode = async (orderId, paymentCode) => {
    return await Orders.findOne({
        where: {
            id: orderId,
            payment_code: paymentCode
        }
    });
}

const findAllWithUserAndPaymentMethodByUserId = async (userId) => {
    return await Orders.findAll({
        where: {
            user_id: userId
        },
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email', 'full_name']
        }, {
            model: PaymentMethods, as: 'payment_method'
        }]
    })
}

module.exports = {
    create,
    findWithUserAndPaymentMethodById,
    findOneByOrderIdAndPaymentCode,
    findAllWithUserAndPaymentMethodByUserId
}