const {PaymentMethods} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error');
const {formatCurrency} = require('../helper/i18n-currency.helper');
const {
    createPaymentValidation,
    getPaymentMethodValidation
} = require('../validation/payment-method.validation');

const create = async (request) => {
    const paymentMethod = validate(createPaymentValidation, request);

    const isPaymentMethodExist = await PaymentMethods.findOne({
        where: {
            name: paymentMethod.name
        },
        attributes: ['id']
    })

    if (isPaymentMethodExist) {
        throw new ResponseError(409, 'Payment method already exists');
    }

    paymentMethod.id = uuidv4();
    paymentMethod.is_active = true;
    paymentMethod.created_at = Date.now();

    return await PaymentMethods.create(paymentMethod);
}

const list = async () => {
    return await PaymentMethods.findAll({
        where: {
            is_active: true
        },
        order: [
            ['created_at', 'ASC']
        ]
    })
}

const remove = async (paymentMethodId) => {
    paymentMethodId = validate(getPaymentMethodValidation, paymentMethodId);

    const paymentMethod = await PaymentMethods.findOne({
        where: {
            id: paymentMethodId,
            is_active: true
        }
    })

    if (!paymentMethod) {
        throw new ResponseError(404, 'Payment method not found');
    }

    paymentMethod.is_active = false;
    paymentMethod.updated_at = Date.now();
    await paymentMethod.save();
}

module.exports = {
    create,
    list,
    remove
}