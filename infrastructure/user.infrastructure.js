const {User} = require('../model');
const {Op} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const role = require('../helper/role.helper');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error')
const {createUserSchema} = require('../validation/user.validation');

const existByUsername = async (username) => {
    return await User.findOne({
        where: {username: username, is_active: true},
        attributes: ['id']
    })
}

const existByEmail = async (email) => {
    return await User.findOne({
        where: {email: email, is_active: true},
        attributes: ['id']
    })
}

const register = async (request) => {
    const user = validate(createUserSchema, request);

    if (await existByUsername(user.username)) {
        throw new ResponseError(409, "Username already registered")
    }

    if (await existByEmail(user.email)) {
        throw new ResponseError(409, "Email already registered")
    }

    user.password = await bcrypt.hash(user.password, 10);

    user.id = uuidv4();
    user.role = role.user;
    user.is_active = true;
    user.created_at = Date.now();

    const createdUser = await User.create(user);
    return await User.findOne({
        where: {
            id: createdUser.id
        },
        attributes: ['id', 'username', 'full_name', 'email', 'birth_date', 'role', 'is_active', 'created_at', 'updated_at']
    })

}

module.exports = {
    register
}