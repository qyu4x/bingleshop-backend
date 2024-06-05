const ImageKit = require('imagekit');
const { v4: uuidv4 } = require('uuid'); 

const imagekit = new ImageKit({
    publicKey: "public_aGCXX/pFBjAu6K93bIxo7rXa+uw=",
    privateKey: "private_0qSg************************",
    urlEndpoint: "https://ik.imagekit.io/zvqhtklys/product-images"
});

const uploadToImageKit = async (fileBuffer, fileName) => {
    try {
        const image_id = uuidv4(); // generate image ID
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
