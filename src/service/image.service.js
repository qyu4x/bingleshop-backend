const ImageKit = require('imagekit');
const {v4: uuidv4} = require('uuid');
const {createImage} = require('../repository/image.repository');
const imageRepository = require('../repository/image.repository');
const productRepository = require('../repository/product.repository');
const {ResponseError} = require("../error/response-error");
const path = require("path");
const imageKitHelper = require('../helper/imagekit.helper');

require('dotenv').config({path: path.resolve(__dirname, '../../.env')});

const uploadToImageKit = async (file, product_id, sequence, is_active) => {
    const image_id = uuidv4();

    const product = await productRepository.findOneById(product_id);
    if (!product) {
        throw new ResponseError(404, 'Product not found');
    }

    const response = await imageKitHelper.uploadToImageKit(file);
    const url = response.url;

    await createImage(image_id, product_id, sequence, url, is_active);
    return {image_url: url};
};

module.exports = {uploadToImageKit};
