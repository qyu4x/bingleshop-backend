const addressHandler = require('../handler/address.handler');
const {authorize} = require('../middleware/auth.middleware');

const addressRouter = require('express').Router();

addressRouter.post('/', authorize(['USER']), addressHandler.create);
addressRouter.get('/', authorize(['USER']), addressHandler.list);
addressRouter.patch('/:addressId/main', authorize(['USER']), addressHandler.setMain);
addressRouter.delete('/:addressId', authorize(['USER']), addressHandler.remove);

module.exports = {
    addressRouter
}