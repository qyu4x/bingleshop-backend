const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadToImageKit = async (fileBuffer, fileName) => {
    try {
        const response = await imagekit.upload({
            file: fileBuffer, // binary file data
            fileName: fileName
        });
        return response.url;
    } catch (error) {
        throw new Error('Error uploading file to ImageKit.');
    }
};

module.exports = { uploadToImageKit };
