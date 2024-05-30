const subCategoriesHandler = require('../handler/sub-category.handler');
const {authorize} = require('../middleware/auth.middleware');

const subCategoriesRouter = require('express').Router();

subCategoriesRouter.post('/:categoryId/sub-categories', authorize(['ADMIN']), subCategoriesHandler.create);
subCategoriesRouter.get('/:categoryId/sub-categories', subCategoriesHandler.list);
subCategoriesRouter.delete('/:categoryId/sub-categories/:subCategoryId', authorize(['ADMIN']), subCategoriesHandler.remove);

module.exports = {
    subCategoriesRouter
}
