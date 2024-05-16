const {Logistics, PaymentMethods} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error');
const {formatCurrency} = require('../helper/i18n-currency.helper');
const {
    getLogisticValidation,
    createLogisticValidation
} = require('../validation/logistic.validation');
const {LogisticResponse} = require('../payload/response/logistic-response')
const {CurrencyResponse} = require('../payload/response/currency.response')

const mapToLogisticResponse = (logisticResponse) => {
    return new LogisticResponse(
        logisticResponse.id,
        logisticResponse.name,
        new CurrencyResponse(
            logisticResponse.payment_fees_permile,
            formatCurrency(logisticResponse.payment_fees_permile, 'id-ID', 'IDR', 'code'),
            formatCurrency(logisticResponse.payment_fees_permile, 'id-ID', 'IDR', 'symbol')
        ),
        logisticResponse.logo_url,
        logisticResponse.is_active,
        logisticResponse.description,
        logisticResponse.created_at,
        logisticResponse.updated_at
    );
}

const create = async (request) => {
    const logistic = validate(createLogisticValidation, request);

    const isLogisticExist = await Logistics.findOne({
        where: {
            name: logistic.name
        },
        attributes: ['id']
    })

    if (isLogisticExist) {
        throw new ResponseError(409, 'Logistic already exists');
    }

    logistic.id = uuidv4();
    logistic.is_active = true;
    logistic.created_at = Date.now();

    const logisticResponse = await Logistics.create(logistic);
    return mapToLogisticResponse(logisticResponse);
}

const list = async () => {
    const logistics = await Logistics.findAll({
        where: {
            is_active: true
        },
        order: [
            ['created_at', 'ASC']
        ]
    })

    return logistics.map(logistic => {
        return mapToLogisticResponse(logistic);
    })
}

const remove = async (logisticId) => {
    logisticId = validate(getLogisticValidation, logisticId);

    const logistic = await Logistics.findOne({
        where: {
            id: logisticId,
            is_active: true
        }
    })

    if (!logistic) {
        throw new ResponseError(404, 'Logistic not found');
    }

    logistic.is_active = false;
    logistic.updated_at = Date.now();
    await logistic.save();
}

module.exports = {
    create,
    list,
    remove
}