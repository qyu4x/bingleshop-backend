const userRepository = require('../repository/user.repository');

const generateOtp = async () => {
    let isUnique = false;
    let otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    while (!isUnique) {
        const isOtpCodeAvailable = await userRepository.findOneOtpCodeActiveByOtpCode(otpCode);
        if (!isOtpCodeAvailable) {
            isUnique = true;
        }
        otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    return otpCode;
}

module.exports = {
    generateOtp
}