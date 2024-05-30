class OrderResponse {
    id;
    user;
    payment;
    total_price;
    note;
    payment_code;
    payment_expiress_at;
    payment_status;
    payment_date;
    action;
    created_at;
    updated_at;


    constructor(id, user, payment, total_price, note, payment_code, payment_expiress_at, payment_status, payment_date, action, created_at, updated_at) {
        this.id = id;
        this.user = user;
        this.payment = payment;
        this.total_price = total_price;
        this.note = note;
        this.payment_code = payment_code;
        this.payment_expiress_at = payment_expiress_at;
        this.payment_status = payment_status;
        this.payment_date = payment_date;
        this.action = action;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    OrderResponse
}