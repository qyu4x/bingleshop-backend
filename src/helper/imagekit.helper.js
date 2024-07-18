const ImageKit = require("imagekit");
const path = require("path");
require('dotenv').config({path: path.resolve(__dirname, '../../.env')});

const uploadToImageKit = async (file) => {
    const imageKit =  new ImageKit({
        publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
        privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
    });

    return await imageKit.upload({
        file: file.buffer,
        fileName: file.originalname
    });

}

module.exports = {
    uploadToImageKit
}

