const ImageKit = require('imagekit');
const {v4: uuidv4} = require('uuid');
const {createImage} = require('../repository/image.repository');
const imageRepository = require('../repository/image.repository');
const productRepository = require('../repository/product.repository');
const {ResponseError} = require("../error/response-error");
const path = require("path");

require('dotenv').config({path: path.resolve(__dirname, '../../.env')});

const imagekit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

const uploadToImageKit = async (file, product_id, sequence, is_active) => {
    const image_id = uuidv4();

    const product = await productRepository.findOneById(product_id);
    if (!product) {
        throw new ResponseError(404, 'Product not found');
    }

    const response = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname
    });

    const url = response.url;

    await createImage(image_id, product_id, sequence, url, is_active);

    return {image_url: url};
};

module.exports = {uploadToImageKit};
