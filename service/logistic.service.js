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

    return await Logistics.create(logistic);
}

const list = async () => {
    return await Logistics.findAll({
        where: {
            is_active: true
        },
        order: [
            ['created_at', 'ASC']
        ]
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