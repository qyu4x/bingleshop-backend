const generateOrderId = (username, createdAt) => {
    const usernameCode = username.substring(0, 3).toUpperCase();
    const uniqueCode = createdAt.toString().substring(Math.max(0, createdAt.length - 5), createdAt.length);
    const unix = Math.floor(Date.now() / 1000);

    return `${usernameCode}-${unix}-${uniqueCode}`;
}


const generatePaymentCode = (createdAt) => {
    const uniqueCode = createdAt.toString().substring(Math.max(0, Math.floor(createdAt.length / 2) - 2), Math.max(0, Math.floor(createdAt.length / 2) + 3));
    const unix = Math.floor(Date.now() / 1000).toString().substring(Math.max(0, Date.now().toString().length - 5));

    return `${Math.floor(Math.random() * 100).toString().padStart(2, '0')}-${uniqueCode}-${unix}`;
}

module.exports = {
    generateOrderId,
    generatePaymentCode
}