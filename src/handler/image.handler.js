const path = require('path');
const { uploadToImageKit } = require('../service/image.service');

const uploadImage = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, '../', file.path);
    
    try {
        const url = await uploadToImageKit(filePath, file.filename);
        res.send({
            success: true,
            url: url
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
.
module.exports = { uploadImage };
