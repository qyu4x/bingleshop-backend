const {Address} = require('../model');

const findOneByUserIdAndAddressId = async (userId, addressId) => {
    return await Address.findOne({
        where: {
            id: addressId, user_id: userId
        }, attributes: ['id','is_main_address']
    });
}

const updateIsMainAddressByUserId = async (isMainAddress, userId) => {
    await Address.update({
        is_main_address: isMainAddress,
        updated_at: Date.now()
    }, {
        where: {
            user_id: userId
        }
    });
}

const updateIsMainAddressByAddressIdAndUserId = async (isMainAddress, addressId, userId) => {
    await Address.update({
        is_main_address: isMainAddress,
        updated_at: Date.now()
    }, {
        where: {
            id: addressId, user_id: userId
        }
    });
}

const create = async (address) => {
    return await Address.create(address);
}

const findOneByAddressId = async (addressId) => {
    return await Address.findOne({
        where: {
            id: addressId
        },
        attributes: ['id', 'user_id', 'name', 'phone_number', 'street', 'province', 'city',
            'district', 'postal_code', 'is_main_address', 'is_active', 'created_at', 'updated_at']
    })
}

const findAllByUserId = async (userId) => {
    return await Address.findAll({
        where: {
            user_id: userId, is_active: true
        },
        order: [
            ['created_at', 'ASC']
        ],
        attributes: ['id', 'user_id', 'name', 'phone_number', 'street', 'province', 'city',
            'district', 'postal_code', 'is_main_address', 'is_active', 'created_at', 'updated_at']
    });
}

module.exports = {
    create,
    findOneByUserIdAndAddressId,
    updateIsMainAddressByUserId,
    findOneByAddressId,
    findAllByUserId,
    updateIsMainAddressByAddressIdAndUserId
}