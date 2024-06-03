const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadImage } = require('../handler/image.handler');

const imageRouter = express.Router();

// Multer setup 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Endpoint to handle image upload
imageRouter.post('/upload', upload.single('image'), uploadImage);

module.exports = {
    imageRouter
};
