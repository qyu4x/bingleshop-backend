const { Op } = require('sequelize');
const { Chat } = require("../model");

const findOneById = async (chatId) => {
    return await Chat.findOne({
        where: {
            id: chatId
        },
        attributes: ['id']
    })
}

const findOneByUser = async (userId) => {
    return await Chat.findAll({
        where: {
            [Op.or]: [{ user_id_sender: userId }, { user_id_recipient: userId }],
        },
        attributes: ['id']
    });
}

const findAll = async () => {
    return await Chat.findAll({
        // where: {
        //     is_active: true
        // },
        order: [
            ['created_at', 'ASC']
        ]
    });
}

const create = async (chat) => {
    return await Chat.create(chat);
}

module.exports = {
    create,
    findOneById,
    findOneByUser,
    findAll
}