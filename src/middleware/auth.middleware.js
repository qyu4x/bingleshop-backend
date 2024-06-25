const {ResponseError} = require('../error/response-error');
const {User} = require('../model');
const jwt = require('jsonwebtoken');
const {Op, where} = require('sequelize');
const userRepository = require('../repository/user.repository');
require('dotenv').config();

const authorize = (hasRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                throw new ResponseError(401, "Unauthorized");
            }
           

            if (!token) {
                return res.status(401).json({ message: 'Access token is missing' });
              }
          
              jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                  console.error('JWT verification error:', err);
                  return res.status(401).json({ message: 'Invalid access token' });
                }
                
                const user = userRepository.findOneById(decoded.id);
                if (!user) {
                  return res.status(401).json({ message: 'User not found' });
                }

                const authorized = hasRoles.some(hasRole => hasRole.toUpperCase() === decoded.role.toUpperCase());
                if (!authorized) {
                    throw new ResponseError(403, "Forbidden");
                }

                req.user = decoded;
            
            next();
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    authorize
}