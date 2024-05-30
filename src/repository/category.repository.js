const {Categories} = require("../model");
const findOne = async (categoryId) => {
    return await Categories.findOne({
        where: {
            id: categoryId,
            is_active: true
        },
        attributes: ['id']
    })
}

module.exports = {
    findOne
}