class ProductImagesResponse {
    id;
    url;
    sequence;


    constructor(id, url, sequence) {
        this.id = id;
        this.url = url;
        this.sequence = sequence;
    }
}

module.exports = {
    ProductImagesResponse
}