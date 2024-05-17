class OrderDetailResponse {
    id;
    order_id;
    product_id;
    logistic_id;
    address_id;
    quantity;
    order_status;
    unit_price;
    received_at;
    is_received;
    created_at;
    updated_at;


    constructor(id, order_id, product_id, logistic_id, address_id, quantity, order_status, unit_price, received_at, is_received, created_at, updated_at) {
        this.id = id;
        this.order_id = order_id;
        this.product_id = product_id;
        this.logistic_id = logistic_id;
        this.address_id = address_id;
        this.quantity = quantity;
        this.order_status = order_status;
        this.unit_price = unit_price;
        this.received_at = received_at;
        this.is_received = is_received;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    OrderDetailResponse
}