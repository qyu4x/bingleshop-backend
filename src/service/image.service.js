const ImageKit = require('imagekit');
const { v4: uuidv4 } = require('uuid');
const { createImage } = require('../repository/image.repository');
const imageRepository = require('../repository/image.repository'); 


const imagekit = new ImageKit({
    publicKey: "public_aGCXX/pFBjAu6K93bIxo7rXa+uw=",
    privateKey: "private_0qSgXiGFlTkaGXBf3tfKXAQTj+0=",
    urlEndpoint: "https://ik.imagekit.io/zvqhtklys/product-images"
});

const uploadToImageKit = async (file, product_id, sequence, is_active) => {
    try {
        const image_id = uuidv4(); 

        const product = await imageRepository.findOneById(product_id); 
        if (product) {
            throw new Error ('Product with this id is already exists');
        }
    
        const response = await imagekit.upload({
            file: file.buffer, 
            fileName: file.originalname 
        });
        console.log(response);
        
        const url = response.url;
        
        await createImage(image_id, product_id, sequence, url, is_active);
        
        return url;
    } catch (error) {
        console.log(error);
        throw new Error('Error uploading file to ImageKit.');
    }
};

module.exports = {uploadToImageKit};
