const {User} = require("../model");
const findOneByUsername = async (username) => {
    return await User.findOne({
        where: {username: username, is_active: true},
        attributes: ['id']
    });
}
const findOneByEmail = async (email) => {
    return await User.findOne({
        where: {email: email, is_active: true},
        attributes: ['id', 'email', 'password']
    });
}

const findOneById = async (userId) => {
    return await User.findOne({
        where: {id: userId,  otp_is_active: false, is_active: true},
        attributes: ['id', 'username', 'full_name', 'email', 'birth_date', 'role', 'is_active', 'created_at', 'updated_at']
    })
}

const findOneInactiveById = async (userId) => {
    return await User.findOne({
        where: {id: userId, is_active: false},
        attributes: ['id', 'username', 'full_name', 'email', 'birth_date', 'role', 'is_active', 'created_at', 'updated_at']
    })
}

const findOneByUserIdAndOtpCode = async (userId, otpCode) => {
    return await User.findOne({
        where: {id: userId, otp_code: otpCode, otp_is_active: false, is_active: false},
        attributes: ['id', 'username', 'otp_is_active', 'otp_code', 'otp_validation_expired_at', 'email', 'birth_date', 'full_name', 'role', 'is_active', 'created_at', 'updated_at']
    })
}

const findOneOtpCodeActiveByOtpCode = async (otpCode) => {
    return await User.findOne({
        where: {otp_code: otpCode, otp_is_active: false, is_active: false},
        attributes: ['id', 'username', 'otp_code', 'otp_validation_expired_at']
    })
}

const findOneInactiveAccountByUserId = async (userId) => {
    return await User.findOne({
        where: {id: userId, otp_is_active: false, is_active: false},
        attributes: ['id', 'username', 'otp_is_active', 'otp_code', 'otp_validation_expired_at', 'email', 'full_name', 'birth_date', 'role', 'is_active', 'created_at', 'updated_at']
    })
}

const create = async (user) => {
    return await User.create(user);
}

module.exports = {
    findOneByUsername,
    findOneByEmail,
    create,
    findOneById,
    findOneByUserIdAndOtpCode,
    findOneInactiveAccountByUserId,
    findOneOtpCodeActiveByOtpCode,
    findOneInactiveById

}