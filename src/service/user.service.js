const {User} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const role = require('../helper/role.helper');
const {validate} = require('../helper/validation.helper');
const {ResponseError} = require('../error/response-error')
const {
    createUserSchema,
    loginUserSchema
} = require('../payload/request/user.request');
const userRepository = require('../repository/user.repository');
require('dotenv').config();

const existByUsername = async (username) => {
    const user = await userRepository.findOneByUsername(username);
    if (user) {
        throw new ResponseError(409, "Username already registered")
    }
}

const existByEmail = async (email) => {
    const user = await userRepository.findOneByEmail(email);
    if (user) {
        throw new ResponseError(409, "Email already registered")
    }
}

const register = async (request) => {
    const user = validate(createUserSchema, request);

    await existByUsername(user.username);
    await existByEmail(user.email)

    user.password = await bcrypt.hash(user.password, 10);

    user.id = uuidv4();
    user.role = role.user;
    user.is_active = true;
    user.created_at = Date.now();

    const createdUser = await userRepository.create(user);
    return await userRepository.findOneById(createdUser.id);
}

    const login = async (request) => {
    const loginRequest = validate(loginUserSchema, request);

    const user = await userRepository.findOneByEmail(loginRequest.email);

    if (!user) {
        throw new ResponseError(401, "Email or password is incorrect");
    }

    const isPasswordValid = bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password is incorrect");
    }

    const token = jwt.sign({ "id" : user.id, "email" : user.email, "role": user.role, "username": user.username  },process.env.SECRET, { expiresIn: '24h' });

    user.token = token;
    user.updated_at = Date.now();
    user.save();

    return token;
}

const get = async (userId) => {
    const user = await userRepository.findOneById(userId);
    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    return user;
}

const logout = async (userId) => {
    const user = await userRepository.findOneById(userId);
    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    user.token = null;
    user.updated_at = Date.now();
    user.save();
}

module.exports = {
    register,
    login,
    logout,
    get
}