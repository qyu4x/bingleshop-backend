const {healthRouter} = require('./health.route');
const {userRouter} = require('./user.route');
const {addressRouter} = require('./address.route');
const {categoriesRouter} = require('./category.route');
const {subCategoriesRouter} = require('./sub-category.route');
const {paymentMethodRouter} = require('./payment-method.route');
const {logisticRouter} = require('./logistic.route');
const {orderRouter} = require("./order.route");
const {productRouter} = require("./product.route");
const {orderDetailRouter} = require("./order-detail.route");

const express = require("express");
const router = express.Router();

// health
router.use('/api/v1/healths', healthRouter);

// user
router.use('/api/v1/users', userRouter);

// address
router.use('/api/v1/addresses', addressRouter);

// category
router.use('/api/v1/categories', categoriesRouter);

// sub category
router.use('/api/v1/categories', subCategoriesRouter);

// payment method
router.use('/api/v1/payments', paymentMethodRouter);

// logistic
router.use('/api/v1/logistics', logisticRouter);

// product
router.use('/api/v1/categories', productRouter);
router.use('/api/v1/products', productRouter);

// order
router.use('/api/v1/orders', orderRouter)

// order detail
router.use('/api/v1/orders', orderDetailRouter)

module.exports = {
    router
};