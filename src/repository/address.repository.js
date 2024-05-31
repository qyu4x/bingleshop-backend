const {Address} = require('../model');

const findOneByUserIdAndAddressId = async (userId, addressId) => {
    return await Address.findOne({
        where: {
            id: addressId, user_id: userId
        }, attributes: ['id']
    });
}


module.exports = {
    findOneByUserIdAndAddressId
}