const db = require('../models');

const newImage = async (image_id, product_id, sequence, url, is_active) => {
    return await db.product_images.create({
        id: image_id,
        product_id: product_id,
        sequence: sequence,
        url: url,
        is_active: is_active
    });
};

module.exports = { newImage };

