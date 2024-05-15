const {PaymentMethods} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error');
const {capitalizeEachFirstWord} = require('../helper/capitalize.helper');
const {
    createPaymentValidation
} = require('../validation/payment-method.validation');

const create = (request) => {

}

const list = () => {

}

const remove = () => {

}

module.exports = {
    create,
    list,
    remove
}