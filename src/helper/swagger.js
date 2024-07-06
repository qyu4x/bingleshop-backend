const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require('swagger-ui-express');

const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        servers: [
            {
                url: 'http://localhost:8080/',
                description: 'Development server',
            }
        ],
        info: {
            title: 'BingleShop API Documentation',
            version: '1.0.0',
            description: 'BingleShop is a challenge onlineshop-platinum from binar academy. This API provides various endpoints to manage the BingleShop Application.',
        }
    },
    apis: [path.join(__dirname, '../route/*js')], // files containing annotations as above
};

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
}

module.exports = {
    setupSwagger
}
