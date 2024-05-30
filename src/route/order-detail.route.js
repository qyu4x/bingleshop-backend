const orderDetailHandler = require('../handler/order-detail.handler');
const {authorize} = require('../middleware/auth.middleware');

const orderDetailRouter = require('express').Router();

orderDetailRouter.get('/:orderId/order-details', authorize(['USER']), orderDetailHandler.get);
orderDetailRouter.get('/', authorize(['USER']), orderDetailHandler.list);
orderDetailRouter.get('/:orderId/order-details/:orderDetailId', authorize(['USER']), orderDetailHandler.getSpecific);
orderDetailRouter.patch('/:orderId/order-details/:orderDetailId', authorize(['ADMIN']), orderDetailHandler.updateOrderStatus);
orderDetailRouter.patch('/:orderId/order-details/:orderDetailId/received', authorize(['ADMIN']), orderDetailHandler.updateOrderStatusReceived);

module.exports = {
    orderDetailRouter
}