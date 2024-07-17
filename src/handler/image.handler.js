const multer = require('multer');
const {uploadToImageKit} = require('../service/image.service');
const {ResponseError} = require("../error/response-error");
const {WebResponse} = require("../payload/response/web.response");

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
        cb(new ResponseError(400, 'File type not supported (jpeg, jpg, png only)'));
    },
    limits: {fileSize: 1000000} //file maximum size 10MB
}).single('image');


const uploadImage = async (req, res, next) => {

    const file = req.file;
    const product_id = req.body.product_id;
    const sequence = req.body.sequence;
    const is_active = req.body.is_active || true;

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        if (!req.file) {
            return res.status(400).json({error: 'No file uploaded'});
        }

        try {
            const response = await uploadToImageKit(file, product_id, sequence, is_active);
            res.status(200).json(new WebResponse(response, null));
        } catch (error) {
            next(error);
        }
    });
};


module.exports = {uploadImage};

