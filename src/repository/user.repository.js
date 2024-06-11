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
        where: {id: userId, is_active: true},
        attributes: ['id', 'username', 'full_name', 'email', 'birth_date', 'role', 'is_active', 'created_at', 'updated_at']
    })
}

const create = async (user) => {
    return await User.create(user);
}

module.exports = {
    findOneByUsername,
    findOneByEmail,
    create,
    findOneById

}