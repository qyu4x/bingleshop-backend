const  addressInfrastructure = require('../service/address.service');

const create = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const request = req.body;

        const addressResponse = await addressInfrastructure.create(userId, request);
        res.status(200).json({
            data: addressResponse
        });
    } catch (error) {
        next(error);
    }
}

const list = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const addressResponse = await addressInfrastructure.list(userId);
        res.status(200).json({
            data: addressResponse
        });
    } catch (error) {
        next(error);
    }
}

const setMain = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.addressId;

        await addressInfrastructure.setMain(userId, addressId);
        res.status(200).json({
            data: "OK"
        })
    }catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const addressId = req.params.addressId;

        await addressInfrastructure.remove(userId, addressId);
        res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    list,
    setMain,
    remove
}