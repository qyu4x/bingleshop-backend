class WebPaginationResponse {
    data;
    pagination;
    error;


    constructor(data, pagination, error = null) {
        this.data = data;
        this.pagination = pagination;
        this.error = error;
    }
}

module.exports = {
    WebPaginationResponse
}