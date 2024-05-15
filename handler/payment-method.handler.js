const paymentMethodService = require('../service/payment-method.service');

const create = async (req, res, next) => {
    try {
        const request = req.body;

        const paymentMethodResponse = await paymentMethodService.create(request);
        res.status(200).json({
            data: paymentMethodResponse
        });
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const paymentMethodResponse = await paymentMethodService.list();
        res.status(200).json({
            data: paymentMethodResponse
        });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const paymentMethodId = req.params.paymentMethodId;

        await paymentMethodService.remove(paymentMethodId);
        res.status(200).json({
            data: "OK"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    list,
    remove
}