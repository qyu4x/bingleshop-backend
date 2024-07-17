class WebResponse {
    data;
    error;


    constructor(data = null, error = null) {
        this.data = data;
        this.error = error;
    }
}

module.exports = {
    WebResponse
}