const bcrypt = require('bcrypt');

const saltRounds = 10;

const encrypt = (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, saltRounds);
}

const compare = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
    encrypt,
    compare
}