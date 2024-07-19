require('dotenv').config();
const {User} = require('../model');
const {Op, where} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const role = require('../helper/role.helper');
const {validate} = require('../helper/validation.helper');
const {ResponseError} = require('../error/response-error')
const {
    createUserSchema,
    loginUserSchema, otpCodeSchema
} = require('../payload/request/user.request');
const userRepository = require('../repository/user.repository');
const {generateOtp} = require("../helper/generate-otp");
const {sendEmail} = require("../helper/send-email.helper");
const {renderHtml} = require("../helper/render-html.helper");


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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.id = uuidv4();
    user.role = role.user;
    user.is_active = false;
    user.otp_is_active = false;
    user.otp_code = await generateOtp();
    user.otp_validation_expired_at = Date.now() + (5 * 60 * 1000);
    user.created_at = Date.now();

    const data = await renderHtml('otp.ejs', {name: user.full_name, otp: user.otp_code});
    await sendEmail(user.email, 'Verify Your Account with This OTP Code (Valid for 5 Minutes)', data);

    const createdUser = await userRepository.create(user);
    return await userRepository.findOneInactiveById(createdUser.id);
}

const verifyOtpCode = async (userId, request) => {
    const userRequest = validate(otpCodeSchema, request);
    const user = await userRepository.findOneByUserIdAndOtpCode(userId, userRequest.otp_code);

    if (!user) {
        throw new ResponseError(404, 'User not found');
    }

    if (Date.now() > user.otp_validation_expired_at) {
        throw new ResponseError(400, 'The OTP code has expired. Please request a new one.');
    }

    if (user.otp_code !== userRequest.otp_code) {
        throw new ResponseError(400, 'The OTP code is invalid. Please check the code and try again.');
    }

    user.otp_is_active_user = true;
    user.is_active = true;
    user.updated_at = Date.now();
    user.save();
}


const refreshOtpCode = async (userId) => {
    const user = await userRepository.findOneInactiveAccountByUserId(userId);

    if (!user) {
        throw new ResponseError(404, 'User not found');
    }

    user.otp_code = await generateOtp();
    user.otp_validation_expired_at = Date.now() + (5 * 60 * 1000);
    user.updated_at = Date.now();
    user.save();

    const data = await renderHtml('otp.ejs', {name: user.full_name, otp: user.otp_code});
    await sendEmail(user.email, 'Verify Your Account with This OTP Code (Valid for 5 Minutes)', data);
}

const login = async (request) => {
    const loginRequest = validate(loginUserSchema, request);

    const user = await userRepository.findOneByEmail(loginRequest.email);

    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password is incorrect");
    }

    return {token: jwt.sign({
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "username": user.username
        }, process.env.SECRET, {expiresIn: '24h'})}
}

const get = async (userId) => {
    const user = await userRepository.findOneById(userId);
    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    return user;
}


module.exports = {
    register,
    login,
    get,
    verifyOtpCode,
    refreshOtpCode
}