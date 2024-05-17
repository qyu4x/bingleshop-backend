const orderHandler = require('../handler/order.handler');
const {authorize} = require('../middleware/auth.middleware');

const orderRouter = require('express').Router();

orderRouter.post('/', authorize(['USER']), orderHandler.create);
orderRouter.get('/', authorize(['USER']), orderHandler.list);
orderRouter.patch('/:paymentCode/orders/:orderId', authorize(['ADMIN']), orderHandler.updatePaymentStatus);

module.exports = {
    orderRouter
}