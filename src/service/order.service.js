const {
    Orders, PaymentMethods, Logistics, Products, Address, sequelize, Categories, User, SubCategories, OrdersDetails
} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../helper/validation.helper');
const {ResponseError} = require('../error/response-error');
const {
    createOrderValidation, getPaymentCodeValidation, getOrderValidation
} = require('../payload/request/order.request');
const {generateOrderId, generatePaymentCode} = require('../helper/order.helper');
const orderDetailService = require('./order-detail.service');
const {OrderResponse} = require("../payload/response/order.response");
const {UserResponse} = require("../payload/response/user.response");
const {PaymentMethodResponse} = require("../payload/response/payment-method.response");
const {Hateos} = require("../payload/response/hateos");
const {CurrencyResponse} = require("../payload/response/currency.response");
const {formatCurrency} = require("../helper/i18n-currency.helper");
const orderStatus = require("../helper/order-status.helper");

const logisticRepository = require('../repository/logistic.repository');
const productRepository = require('../repository/product.repository');
const orderRepository = require('../repository/order.repository');
const orderDetailRepository = require('../repository/order-detail.repository');
const paymentMethodRepository = require('../repository/payment-method.repository');

const mapToOrderResponse = (orderResponse, hateos) => {
    return new OrderResponse(
        orderResponse.id,
        new UserResponse(orderResponse.user.id, orderResponse.user.username, orderResponse.user.email, orderResponse.user.full_name,),
        new PaymentMethodResponse(orderResponse.payment_method.id, orderResponse.payment_method.name,
            new CurrencyResponse(
                orderResponse.payment_method.payment_fees,
                formatCurrency(orderResponse.payment_method.payment_fees, 'id-ID', 'IDR', 'code'),
                formatCurrency(orderResponse.payment_method.payment_fees, 'id-ID', 'IDR', 'symbol')),
            orderResponse.payment_method.logo_url,
            orderResponse.payment_method.is_active,
            orderResponse.payment_method.description,
            orderResponse.payment_method.created_at,
            orderResponse.payment_method.updated_at),
        new CurrencyResponse(
            orderResponse.total_price,
            formatCurrency(orderResponse.total_price, 'id-ID', 'IDR', 'code'),
            formatCurrency(orderResponse.total_price, 'id-ID', 'IDR', 'symbol')),
        orderResponse.note,
        orderResponse.payment_code,
        orderResponse.payment_expiress_at,
        orderResponse.payment_status,
        orderResponse.payment_date,
        hateos,
        orderResponse.created_at,
        orderResponse.updated_at
    )
}

const calculateTotalProductAndLogisticPrice = async (orderDetails) => {
    let totalLogisticFees = 0;
    let totalProductPrice = 0;

    for (const orderDetail of orderDetails) {
        const logistic = await logisticRepository.findOneById(orderDetail.logistic_id);
        if (!logistic) {
            throw new ResponseError(404, 'Logistic not found');
        }

        const product = await productRepository.findOneById(orderDetail.product_id);
        if (!product) {
            throw new ResponseError(404, 'Product not found');
        }

        totalLogisticFees += parseInt(logistic.payment_fees_permile);
        totalProductPrice += parseInt(product.price) * orderDetail.quantity;
    }

    return totalLogisticFees + totalProductPrice;

}
const calculateTotalPrice = async (orderRequest) => {
    const payment = await paymentMethodRepository.findOneById(orderRequest.payment_method_id);
    if (!payment) {
        throw new ResponseError(404, 'Payment not found');
    }

    const totalProductAndLogisticPrice = await calculateTotalProductAndLogisticPrice(orderRequest.order_details);
    return totalProductAndLogisticPrice + parseInt(payment.payment_fees);
}

const checkStockProduct = async (orderDetails) => {
    for (const orderDetail of orderDetails) {
        const product = await productRepository.findOneById(orderDetail.product_id);

        if (product.stock < orderDetail.quantity) {
            throw new ResponseError(400, 'Insufficient product stock!');
        }
    }
}
const create = async (request, user) => {
    const orderRequest = validate(createOrderValidation, request);

    const totalPrice = await calculateTotalPrice(orderRequest);

    if (totalPrice != request.total_price) {
        throw new ResponseError(400, 'Total price calculation is not the same!');
    }

    await checkStockProduct(orderRequest.order_details);

    const tx = await sequelize.transaction();
    try {
        orderRequest.id = generateOrderId(user.username, user.created_at);
        orderRequest.user_id = user.id;
        orderRequest.total_price = totalPrice;
        orderRequest.payment_status = false;
        orderRequest.payment_code = generatePaymentCode(user.created_at);
        orderRequest.payment_expires_at = Date.now() + 24 * 60 * 60 * 1000;
        orderRequest.created_at = Date.now();

        const order = await Orders.create(orderRequest);
        await orderDetailService.create(user.id, order.id, orderRequest.order_details);
        tx.commit();

        const orderResponse = await orderRepository.findWithUserAndPaymentMethodById(order.id);
        return mapToOrderResponse(orderResponse,
            new Hateos('OrderDetails',
                `http://localhost:8080/api/v1/orders/${orderResponse.id}/order-details`,
                'GET')
        )
    } catch (error) {
        tx.rollback();
        throw new ResponseError(error.statusCode, error.message);
    }
}

const updatePaymentStatus = async (paymentCode, orderId) => {
    paymentCode = validate(getPaymentCodeValidation, paymentCode);
    orderId = validate(getOrderValidation, orderId);

    const order = await orderRepository.findOneByOrderIdAndPaymentCode(orderId, paymentCode);
    if (!order) {
        throw new ResponseError(404, 'Order not found');
    }

    if (Date.now() > order.payment_expires_at) {
        throw new ResponseError(410, 'Payment time has exceeded the grace period, please reorder!');
    }

    await orderDetailRepository.updateOrderStatusByOrderId(orderStatus.processing, orderId);

    order.payment_status = true;
    order.payment_date = Date.now();
    order.updated_at = Date.now();
    await order.save();
}

const list = async (userId) => {
    const orders = await orderRepository.findAllWithUserAndPaymentMethodByUserId(userId);

    return orders.map(orderResponse => {
        return mapToOrderResponse(orderResponse,
            new Hateos('OrderDetails',
                `http://localhost:8080/api/v1/orders/${orderResponse.id}/order-details`,
                'GET')
        )
    })
}

module.exports = {
    create,
    updatePaymentStatus,
    list
}