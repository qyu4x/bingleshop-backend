class LogisticResponse {
    id;
    name;
    payment_fees;
    logo_url;
    is_active;
    description;
    created_at;
    updated_at;


    constructor(id, name, payment_fees, logo_url, is_active, description, created_at, updated_at) {
        this.id = id;
        this.name = name;
        this.payment_fees = payment_fees;
        this.logo_url = logo_url;
        this.is_active = is_active;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

module.exports = {
    LogisticResponse
}