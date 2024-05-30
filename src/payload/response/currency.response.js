class CurrencyResponse {
    amount;
    currency;
    display;

    constructor(amount, currency, display) {
        this.amount = amount;
        this.currency = currency;
        this.display = display;
    }
}

module .exports = {
    CurrencyResponse
}