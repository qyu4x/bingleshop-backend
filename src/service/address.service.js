const {Address} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../helper/validation.helper');
const {ResponseError} = require('../error/response-error')
const {
    createAddressSchema, getAddressValidation
} = require('../payload/request/address.request');

const addressRepository = require('../repository/address.repository');
const {updateIsMainAddressByUserId, updateIsMainAddressByAddressIdAndUserId} = require("../repository/address.repository");

const checkAddressMustExist = async (userId, addressId) => {
    const address = await addressRepository.findOneByUserIdAndAddressId(userId, addressId);

    if (!address) {
        throw new ResponseError(404, "Address not found");
    }

    return address.id;
}

const create = async (userId, request) => {
    const address = validate(createAddressSchema, request);

    if (address.is_main_address) {
        await addressRepository.updateIsMainAddressByUserId(false, userId);
    }

    address.id = uuidv4();
    address.user_id = userId;
    address.created_at = Date.now();
    address.is_active = true;

    await addressRepository.create(address);
    return await addressRepository.findOneByAddressId(address.id);
}

const list = async (userId) => {
    return await addressRepository.findAllByUserId(userId);
}

const setMain = async (userId, addressId) => {
    addressId = validate(getAddressValidation, addressId);
    addressId = await checkAddressMustExist(userId, addressId);

    await addressRepository.updateIsMainAddressByUserId(false, userId);
    await updateIsMainAddressByAddressIdAndUserId(true, addressId, userId);
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
    const address = await addressRepository.findOneByUserIdAndAddressId(userId, addressId);

    if (!address) {
        throw new ResponseError(404, 'Address not found');
    }
    return address;
}

module.exports = {
    create,
    get,
    list,
    setMain,
    remove
}