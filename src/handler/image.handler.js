const { uploadToImageKit } = require('../service/image.service');

const uploadImage = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const url = await uploadToImageKit(file.buffer, file.originalname); // storage location to cloud
        res.send({
            success: true,
            url: url
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { uploadImage };

