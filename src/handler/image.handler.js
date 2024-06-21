const multer = require('multer');
const { uploadToImageKit } = require('../service/image.service');

const storage = multer.memoryStorage();

const upload = multer({
        storage: storage, 
        fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(file.originalname.split('.').pop());
        if (mimetype && extname) {
            return cb(null, true) 
        }
        cb(new Error('File type not supported (jpeg, jpg, png only)'));
            
        },
        limits: {fileSize: 1000000 } //file maximum size 10MB
    }).single('image');


    const uploadImage = async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const file = req.file;
            const product_id = req.body.product_id;
            const sequence = req.body.sequence;
            const is_active = req.body.is_active || true;
    
            try {
                const response = await uploadToImageKit(file, product_id, sequence, is_active);
                res.status(200).json({ data: response });
            } catch (error) {
                res.status(500).send(error);
            }
        });
    };


module.exports = { uploadImage };

