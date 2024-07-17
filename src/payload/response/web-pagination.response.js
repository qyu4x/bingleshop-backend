class WebPaginationResponse {
    data;
    pagination;
    errors;


    constructor(data, pagination, errors = null) {
        this.data = data;
        this.pagination = pagination;
        this.errors = errors;
    }
}

module.exports = {
    WebPaginationResponse
}