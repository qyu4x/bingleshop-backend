const {healthRouter} = require('./health.route');
const {userRouter} = require('./user.route');
const {addressRouter} = require('./address.route');
const {categoriesRouter} = require('./categories.route');
const {subCategoriesRouter} = require('./sub-category.route');

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

module.exports = {
    router
};