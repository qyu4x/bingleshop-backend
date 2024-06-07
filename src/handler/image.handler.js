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
        const response = await uploadToImageKit(file, product_id, sequence, is_active);
        res.status(200).json({data:response});
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { uploadImage };

