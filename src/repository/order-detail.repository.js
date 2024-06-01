const {OrdersDetails, Orders, Products, Logistics, Address, sequelize} = require('../model');
const orderStatus = require("../helper/order-status.helper");

const bulkCreate = async (orderDetails) => {
    return await OrdersDetails.bulkCreate(orderDetails);
}

const findAllWithOrderByOrderIdAndUserId = async (orderId, userId) => {
    return await OrdersDetails.findAll({
        where: {
            order_id: orderId
        },
        include: {
            model: Orders,
            as: 'order',
            where: {
                user_id: userId
            },
            attributes: ['id']
        }
    });
}

const findAllWithOrderByUserId = async (userId) => {
    return await OrdersDetails.findAll({
        include: {
            model: Orders,
            as: 'order',
            where: {
                user_id: userId
            },
            attributes: ['id']
        }
    });
}

const findOneWithRelationsByOrderDetailIdAndOrderIdAndUserId = async (orderDetailId, orderId, userId) => {
    return await OrdersDetails.findOne({
        where: {
            id: orderDetailId,
            order_id: orderId
        },
        include: [
            {
                model: Orders,
                as: 'order',
                where: {
                    user_id: userId
                },
                attributes: ['id']
            },
            {
                model: Products,
                as: 'product',
                attributes: ['id', 'title', 'price']
            },
            {
                model: Logistics,
                as: 'logistic'
            },
            {
                model: Address,
                as: 'address'
            },
        ],
    });
}

const findOneByOrderDetailIdAndOrderId = async (orderDetailId, orderId) => {
    return await OrdersDetails.findOne({
            where: {
                id: orderDetailId,
                order_id: orderId
            }
        }
    );
}

const updateOrderStatusByOrderId = async (orderStatus, orderId) => {
    await OrdersDetails.update({
            order_status: orderStatus,
            updated_at: Date.now()
        },
        {
            where: {
                order_id: orderId
            }
        }
    );
}

module.exports = {
    bulkCreate,
    findAllWithOrderByOrderIdAndUserId,
    findAllWithOrderByUserId,
    findOneWithRelationsByOrderDetailIdAndOrderIdAndUserId,
    findOneByOrderDetailIdAndOrderId,
    updateOrderStatusByOrderId
}