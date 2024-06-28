const {ProductImages} = require('../model');

const createImage = async (image_id, product_id, sequence, url, is_active) => {
    return await ProductImages.create({
        id: image_id,
        product_id: product_id,
        sequence: sequence,
        url: url,
        is_active: is_active
    });
};

const findOneById = async (product_id, is_active) => {
    return await ProductImages.findOne({
        where : {
            id : product_id,
            is_active: is_active
        },
    });
};


module.exports = { 
    createImage,
    findOneById,
 };

