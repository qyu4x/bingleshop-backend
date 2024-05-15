const paymentMethodHandler = require('../handler/payment-method.handler');
const {authorize} = require('../middleware/auth.middleware');

const paymentMethodRouter = require('express').Router();

paymentMethodRouter.post('/', authorize(['ADMIN']), paymentMethodHandler.create);
paymentMethodRouter.get('/', paymentMethodHandler.list);
paymentMethodRouter.delete('/:paymentMethodId', authorize(['ADMIN']), paymentMethodHandler.remove);

module.exports = {
    paymentMethodRouter
}