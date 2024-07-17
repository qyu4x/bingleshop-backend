const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../handler/image.handler');
const { authorize } = require('../middleware/auth.middleware');

const imageRouter = express.Router();

// Multer setup 
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Endpoint to handle image upload
imageRouter.post('/upload', authorize('ADMIN'), upload.single('file'), uploadImage);

module.exports = {
    imageRouter
};
