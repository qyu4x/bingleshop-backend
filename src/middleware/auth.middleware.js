const {ResponseError} = require('../error/response-error');
const {User} = require('../model');
const {Op, where} = require('sequelize');

const authorize = (hasRoles = []) => {
    return async (req, res, next) => {
        try {
            let token = req.get('Authorization');
            if (!token) {
                throw new ResponseError(401, "Unauthorized");
            }

            token = token.trim();
            const user = await User.findOne({
                where: {
                    token: {
                        [Op.eq]: token
                    }
                },
                attributes: ['id', 'username', 'email','role', 'full_name', 'created_at']
            })

            if (!user) {
                throw new ResponseError(401, "Unauthorized");
            }

            const authorized = hasRoles.some(hasRole => hasRole.toUpperCase() === user.role.toUpperCase());
            if (!authorized) {
                throw new ResponseError(403, "Forbidden");
            }

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    authorize
}