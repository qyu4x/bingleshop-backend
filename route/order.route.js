const orderHandler = require('../handler/order.handler');
const {authorize} = require('../middleware/auth.middleware');

const orderRouter = require('express').Router();

orderRouter.post('/', authorize(['USER']), orderHandler.create);
orderRouter.put('/:paymentCode/orders/:orderId', authorize(['ADMIN']), orderHandler.updatePayment);

module.exports = {
    orderRouter
}