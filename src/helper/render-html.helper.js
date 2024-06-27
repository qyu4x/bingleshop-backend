const ejs = require('ejs');
const path = require('path');
const {ResponseError} = require("../error/response-error");

const renderHtml = (filename, data) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(path.join(__dirname, '/../views/email/', filename), data, (error, str) => {
            if (error) {
                reject(error);
            } else {
                resolve(str);
            }
        })
    })
}

module.exports = {
    renderHtml
}