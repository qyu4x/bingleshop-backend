const {Categories} = require("../model");
const findOneById = async (categoryId) => {
    return await Categories.findOne({
        where: {
            id: categoryId,
            is_active: true
        },
        attributes: ['id']
    })
}

const findOneByName = async (name) => {
    return await Categories.findOne({
        where: {
            name: name,
            is_active: true
        },
        attributes: ['id']
    });
}

const findAll = async () => {
    return await Categories.findAll({
        where: {
            is_active: true
        },
        order: [
            ['name', 'ASC']
        ]
    });
}
module.exports = {
    findOneById,
    findOneByName,
    findAll
}