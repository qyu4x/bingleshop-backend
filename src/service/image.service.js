// /service/image.service.js

const ImageKit = require('imagekit');
const fs = require('fs');
const path = require('path');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadToImageKit = (filePath, fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject('Error reading file.');
            }

            imagekit.upload({
                file: data, // binary file data
                fileName: fileName
            })
            .then(response => {
                // Delete the file from the local file system after upload
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
                resolve(response.url);
            })
            .catch(error => {
                reject('Error uploading file to ImageKit.');
            });
        });
    });
};

module.exports = { uploadToImageKit };
