const productHandler = require('../handler/product.handler');
const {authorize} = require('../middleware/auth.middleware');

const productRouter = require('express').Router();

productRouter.post('/:categoryId/sub-categories/:subCategoryId', authorize(['ADMIN']), productHandler.create);
productRouter.put('/:productId', authorize(['ADMIN']), productHandler.update);
productRouter.delete('/:productId', authorize(['ADMIN']), productHandler.remove);
productRouter.get('/search', productHandler.search);
productRouter.get('/:productId', productHandler.get);

module.exports = {
    productRouter
}