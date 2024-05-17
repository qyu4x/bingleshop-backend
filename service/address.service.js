const {Address} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error')
const {
    createAddressSchema, getAddressValidation
} = require('../validation/address.validation');

const checkAddressMustExist = async (userId, addressId) => {
    const address = await Address.findOne({
        where: {
            id: addressId, user_id: userId
        }, attributes: ['id']
    })

    if (!address) {
        throw new ResponseError(404, "Address not found");
    }

    return address.id;
}

const create = async (userId, request) => {
    const address = validate(createAddressSchema, request);

    if (address.is_main_address) {
        await Address.update({
            is_main_address: false
        }, {
            where: {
                user_id: userId
            }
        })
    }

    address.id = uuidv4();
    address.user_id = userId;
    address.created_at = Date.now();
    address.is_active = true;

    await Address.create(address);

    return await Address.findOne({
        where: {
            id: address.id
        },
        attributes: ['id', 'user_id', 'name', 'phone_number', 'street', 'province', 'city',
            'district', 'postal_code', 'is_main_address', 'is_active', 'created_at', 'updated_at']
    })
}

const list = async (userId) => {
    return await Address.findAll({
        where: {
            user_id: userId, is_active: true
        },
        order: [
            ['created_at', 'ASC']
        ],
        attributes: ['id', 'user_id', 'name', 'phone_number', 'street', 'province', 'city',
            'district', 'postal_code', 'is_main_address', 'is_active', 'created_at', 'updated_at']
    })
}

const setMain = async (userId, addressId) => {
    addressId = validate(getAddressValidation, addressId);
    addressId = await checkAddressMustExist(userId, addressId);

    await Address.update({
        is_main_address: false
    }, {
        where: {
            user_id: userId
        }
    })

    await Address.update({
        is_main_address: true,
        updated_at: Date.now()
    }, {
        where: {
            id: addressId, user_id: userId
        }
    })
}

const remove = async (userId, addressId) => {
    addressId = validate(getAddressValidation, addressId);
    addressId = await checkAddressMustExist(userId, addressId);

    const address = await get(userId, addressId);

    if (address.is_main_address) {
        throw new ResponseError(400, 'Main address cannot be deleted');
    }

    address.is_active = false;
    address.updated_at = Date.now();
    await address.save()
}

const get = async (userId, addressId) => {
    const address = await Address.findOne({
        where: {
            id: addressId, user_id: userId
        },
        attributes: ['id', 'is_main_address']
    })

    if (!address) {
        throw new ResponseError(404, 'Address not found');
    }
}

module.exports = {
    create,
    get,
    list,
    setMain,
    remove
}