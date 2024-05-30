const logisticHandler = require('../handler/logistic.handler');
const {authorize} = require('../middleware/auth.middleware');

const logisticRouter = require('express').Router();

logisticRouter.post('/', authorize(['ADMIN']), logisticHandler.create);
logisticRouter.get('/', logisticHandler.list);
logisticRouter.delete('/:logisticId', authorize(['ADMIN']), logisticHandler.remove);

module.exports = {
    logisticRouter
}