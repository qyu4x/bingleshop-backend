const {ResponseError} = require('../error/response-error');
const {User} = require('../model');

const authorize = (hasRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.get('Authorization').trim();
            if (!token) {
                throw new ResponseError(401, "Unauthorized");
            }

            const user = await User.findOne({
                where: {
                    token: {
                        [Op.eq]: token
                    }
                }
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