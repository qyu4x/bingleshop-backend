const productHandler = require('../handler/product.handler');
const {authorize} = require('../middleware/auth.middleware');

const productRouter = require('express').Router();

productRouter.post('/:categoryId/sub-categories/:subCategoryId', authorize(['ADMIN']), productHandler.create);

module.exports = {
    productRouter
}