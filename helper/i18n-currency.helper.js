const formatCurrency = (value, displayType = 'symbol') => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        currencyDisplay: displayType
    }).format(value);
}

module.exports = {
    formatCurrency
}