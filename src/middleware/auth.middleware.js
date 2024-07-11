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
                return res.status(401).json({message: 'Access token is missing'});
            }

            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err) {
                    console.error('JWT verification error:', err);
                    return res.status(401).json({message: 'Invalid access token'});
                }

                const user = await userRepository.findOneById(decoded.id);
                if (!user) {
                    return res.status(401).json({message: 'User not found'});
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

const authorizeSocket = (hasRoles = []) => {
    return async (socket, next) => {
        try {
            const token = socket.handshake.headers['authorization']?.split(' ')[1]
            if (!token) {
                next(new Error('Unauthorized'))
            }

            if (!token) {
                next(new Error('Unauthorized'))
            }

            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err) {
                    console.error('JWT verification error:', err)
                    next(new Error('Invalid access token'))
                }

                const user = await userRepository.findOneById(decoded.id);
                if (!user) {
                    next(new Error('User not found'))
                }

                const authorized = hasRoles.some(hasRole => hasRole.toUpperCase() === decoded.role.toUpperCase());
                if (!authorized) {
                    next(new Error('Forbidden'))
                }

                socket.user = decoded;

                next();
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    authorize, authorizeSocket
}