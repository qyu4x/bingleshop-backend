const {sendEmail} = require("../helper/send-email.helper");
const {renderHtml} = require("../helper/render-html.helper");
const get = () => {
    return 'PONG';
}

module.exports = {
    get
}