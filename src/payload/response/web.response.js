class WebResponse {
    data;
    errors;


    constructor(data = null, errors = null) {
        this.data = data;
        this.errors = errors;
    }
}

module.exports = {
    WebResponse
}