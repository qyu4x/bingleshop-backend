const {PaymentMethods} = require('../model');

const findOneByName = async (name) => {
    await PaymentMethods.findOne({
        where: {
            name: name, is_active: true
        }, attributes: ['id', 'is_active']
    });
}

const findOneById = async (paymentMethodId) => {
    return await PaymentMethods.findOne({
        where: {
            id: paymentMethodId, is_active: true
        }
    });
}

const create = async (paymentMethod) => {
    return await PaymentMethods.create(paymentMethod);
}

const findAll = async () => {
    return await PaymentMethods.findAll({
        where: {
            is_active: true
        }, order: [['created_at', 'ASC']]
    });
}

module.exports = {
    findOneByName,
    create,
    findAll,
    findOneById
}