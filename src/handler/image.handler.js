const { uploadToImageKit } = require('../service/image.service');

const uploadImage = async (req, res) => {
    const file = req.file;
    const product_id = req.product_id
    const sequence = req.body.sequence;
    const is_active = req.body.is_active || true;
   
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const url = await uploadToImageKit(file.buffer, file.originalname); //storage location to cloud
        res.send({
            success: true,
            image_id: newImage.id,
            url: newImage.url
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { uploadImage };

