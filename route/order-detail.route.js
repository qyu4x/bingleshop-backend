const orderDetailHandler = require('../handler/order-detail.handler');
const {authorize} = require('../middleware/auth.middleware');

const orderDetailRouter = require('express').Router();

orderDetailRouter.get('/:orderId/order-details', authorize(['USER']), orderDetailHandler.get);

module.exports = {
    orderDetailRouter
}