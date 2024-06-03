const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../handler/image.handler');

const imageRouter = express.Router();

// Multer setup 
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to handle image upload
imageRouter.post('/upload', upload.single('image'), uploadImage);

module.exports = {
    imageRouter
};
