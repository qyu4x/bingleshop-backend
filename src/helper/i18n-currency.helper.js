const {ResponseError} = require("../error/response-error");
const formatCurrency = (value, locale = 'id-ID', currency = 'IDR', displayType = 'symbol') => {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            currencyDisplay: displayType
        }).format(value);
    } catch (error) {
        throw new ResponseError(500, error.message);
    }
}

module.exports = {
    formatCurrency
}