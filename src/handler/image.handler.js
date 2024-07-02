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

        const file = req.file;
        const product_id = req.body.product_id;
        const sequence = req.body.sequence;
        const is_active = req.body.is_active || true;

        upload(req, res, async (err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            
            try {
                console.log("File", file);
                const response = await uploadToImageKit(file, product_id, sequence, is_active);
                console.log("response", response);
                res.status(200).json({ data: response });
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
                next(error);
            }
        });
    };


module.exports = { uploadImage };

