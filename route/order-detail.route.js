const orderDetailHandler = require('../handler/order-detail.handler');
const {authorize} = require('../middleware/auth.middleware');

const orderDetailRouter = require('express').Router();

orderDetailRouter.get('/', authorize(['USER']), orderDetailHandler.list);
orderDetailRouter.get('/:orderId/order-details', authorize(['USER']), orderDetailHandler.get);
orderDetailRouter.get('/:orderId/order-details/:orderDetailId', authorize(['USER']), orderDetailHandler.getSpecific);

module.exports = {
    orderDetailRouter
}