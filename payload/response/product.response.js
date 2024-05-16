class ProductResponse {
    id;
    title;
    stock;
    price;
    category;
    sub_category;
    is_preorder;
    description;
    is_active;
    created_at;
    updated_at;


    constructor(id, title, stock, price, category, sub_category, is_preorder, description, is_active, created_at, updated_at) {
        this.id = id;
        this.title = title;
        this.stock = stock;
        this.price = price;
        this.category = category;
        this.sub_category = sub_category;
        this.is_preorder = is_preorder;
        this.description = description;
        this.is_active = is_active;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    ProductResponse
}