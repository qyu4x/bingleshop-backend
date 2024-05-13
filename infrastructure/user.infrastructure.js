const {User} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const role = require('../helper/role.helper');
const {validate} = require('../validation/validation');
const {ResponseError} = require('../error/response-error')
const {
    createUserSchema,
    loginUserSchema
} = require('../validation/user.validation');

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

const login = async (request) => {
    const loginRequest = validate(loginUserSchema, request);

    const user = await User.findOne({
        where: {
            email: loginRequest.email
        },
        attributes: ['id', 'email', 'password']
    })

    if (!user) {
        throw new ResponseError(401, "Email or password is incorrect");
    }

    const isPasswordValid = bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password is incorrect")
    }

    const token = uuidv4().toString();
    await User.update(
        {token: token},
        {
            where: {
                id: user.id
            }
        }
    );

    return token;
}

module.exports = {
    register,
    login
}