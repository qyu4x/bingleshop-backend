class SimpleProductResponse {
    id;
    title;
    price;


    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}

module.exports = {
    SimpleProductResponse
}