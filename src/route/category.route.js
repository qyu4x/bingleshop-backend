const categoriesHandler = require('../handler/category.handler');
const {authorize} = require('../middleware/auth.middleware');

const categoriesRouter = require('express').Router();

categoriesRouter.post('/', authorize(['ADMIN']), categoriesHandler.create);
categoriesRouter.get('/', categoriesHandler.list);
categoriesRouter.delete('/:categoryId', authorize(['ADMIN']), categoriesHandler.remove);

module.exports = {
    categoriesRouter
}