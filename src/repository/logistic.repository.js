const {Logistics} = require('../model');

const findOneByName = async (name) => {
    return await Logistics.findOne({
        where: {
            name: name,
            is_active: true
        },
        attributes: ['id']
    });
}

const findOneById = async (logisticId) => {
    return await Logistics.findOne({
        where: {
            id: logisticId,
            is_active: true
        }
    });
}

const create = async (logistic) => {
    return await Logistics.create(logistic);
}

const findAll = async () => {
    return await Logistics.findAll({
        where: {
            is_active: true
        },
        order: [
            ['created_at', 'ASC']
        ]
    });
}

module.exports = {
    findOneById,
    findOneByName,
    create,
    findAll
}