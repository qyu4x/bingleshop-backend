const {ResponseError} = require('../error/response-error');
const {User} = require('../model');
const jwt = require('jsonwebtoken');
const {Op, where} = require('sequelize');
const userRepository = require('../repository/user.repository');
const {WebResponse} = require("../payload/response/web.response");
require('dotenv').config();

const authorize = (hasRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json(new WebResponse(null, 'Unauthorized'));
            }


            if (!token) {
                return res.status(401).json(new WebResponse(null, 'Access token is missing'));
            }

            jwt.verify(token, process.env.SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json(new WebResponse(null, 'Invalid access token'));
                }

                const user = await userRepository.findOneById(decoded.id);

                if (!user) {
                    return res.status(404).json(new WebResponse(null, 'User not found'));
                }

                const authorized = hasRoles.some(hasRole => hasRole.toUpperCase() === decoded.role.toUpperCase());
                if (!authorized) {
                    return res.status(403).json(new WebResponse(null, 'Forbidden'));
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