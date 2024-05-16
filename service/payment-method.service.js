const {PaymentMethods} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error');
const {formatCurrency} = require('../helper/i18n-currency.helper');
const {
    createPaymentValidation, getPaymentMethodValidation
} = require('../validation/payment-method.validation');
const {PaymentMethodResponse} = require('../payload/response/payment-method.response')
const {CurrencyResponse} = require('../payload/response/currency.response')


const create = async (request) => {
    const paymentMethod = validate(createPaymentValidation, request);

    const isPaymentMethodExist = await PaymentMethods.findOne({
        where: {
            name: paymentMethod.name, is_active: true
        }, attributes: ['id']
    })

    if (isPaymentMethodExist) {
        throw new ResponseError(409, 'Payment method already exists');
    }

    paymentMethod.id = uuidv4();
    paymentMethod.is_active = true;
    paymentMethod.created_at = Date.now();

    const paymentMethodResponse = await PaymentMethods.create(paymentMethod);
    return new PaymentMethodResponse(
        paymentMethodResponse.id,
        paymentMethodResponse.name,
        new CurrencyResponse(
            paymentMethodResponse.payment_fees,
            formatCurrency(paymentMethod.payment_fees, 'id-ID', 'IDR', 'code'),
            formatCurrency(paymentMethod.payment_fees, 'id-ID', 'IDR', 'symbol')
        ),
        paymentMethodResponse.logo_url,
        paymentMethodResponse.is_active,
        paymentMethodResponse.description,
        paymentMethodResponse.created_at,
        paymentMethodResponse.updated_at
    );
}

const list = async () => {
    const paymentMethodResponses = await PaymentMethods.findAll({
        where: {
            is_active: true
        }, order: [['created_at', 'ASC']]
    })

    return paymentMethodResponses.map(paymentMethod => {
        return new PaymentMethodResponse(
            paymentMethod.id,
            paymentMethod.name,
            new CurrencyResponse(
                paymentMethod.payment_fees,
                formatCurrency(paymentMethod.payment_fees, 'id-ID', 'IDR', 'code'),
                formatCurrency(paymentMethod.payment_fees, 'id-ID', 'IDR', 'symbol')
            ),
            paymentMethod.logo_url,
            paymentMethod.is_active,
            paymentMethod.description,
            paymentMethod.created_at,
            paymentMethod.updated_at
        );
    })
}

const remove = async (paymentMethodId) => {
    paymentMethodId = validate(getPaymentMethodValidation, paymentMethodId);

    const paymentMethod = await PaymentMethods.findOne({
        where: {
            id: paymentMethodId, is_active: true
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
    create, list, remove
}