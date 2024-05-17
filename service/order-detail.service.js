const {OrdersDetails, sequelize} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error');
const orderStatus = require('../helper/order-status.helper');
const addressService = require('./address.service');
const productService = require('./product.service');

const create = async (userId, orderId, orderDetails) => {
    const tx = await sequelize.transaction();

    try {
        const addressPromises = orderDetails.map(orderDetail => {
            return addressService.get(userId, orderDetail.address_id);
        })

        await Promise.all(addressPromises);

        const productPromises = orderDetails.map(orderDetail => {
            productService.updateStock(orderDetail.product_id, orderDetail.quantity);
        })

        await Promise.all(productPromises);

        orderDetails.forEach(orderDetail => {
            orderDetail.id = uuidv4();
            orderDetail.order_id = orderId;
            orderDetail.order_status = orderStatus.awaiting_payment;
            orderDetail.is_received = false;
            orderDetail.created_at = Date.now();
        })

        console.log(orderDetails)
        await OrdersDetails.bulkCreate(orderDetails);

        tx.commit();
    } catch (error) {
        tx.rollback();
        throw new ResponseError(error.statusCode, error.message);
    }
}

module.exports = {
    create
}