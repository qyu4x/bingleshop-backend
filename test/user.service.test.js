const userRepository = require('../src/repository/user.repository');
const userService = require('../src/service/user.service');

const uuid = require('uuid');
const {sendEmail} = require("../src/helper/send-email.helper");
const {generateOtp} = require('../src/helper/generate-otp');
const {renderHtml} = require("../src/helper/render-html.helper");
const role = require("../src/helper/role.helper");
const bcrypt = require("bcrypt");

jest.mock('../src/repository/user.repository');
jest.mock('../src/helper/generate-otp');
jest.mock('../src/helper/send-email.helper');
jest.mock('../src/helper/render-html.helper');
jest.mock('uuid');
jest.mock('bcrypt');


describe('register', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user and send verification email', async () => {
        const mockRequest = {
            username: 'testuser',
            full_name: 'Test User',
            email: 'testuser@example.com',
            password: 'testpassword',
            birth_date: '2002-08-08'
        };

        const mockUuid = 'random-uuid-v4';
        const htmlTemplate = '<html><h1>render some html value</h1>></html>>';

        const mockCreatedUser = {id: mockUuid, ...mockRequest};

        uuid.v4.mockReturnValue(mockUuid);
        generateOtp.mockResolvedValue('76543');
        renderHtml.mockResolvedValue(htmlTemplate);
        sendEmail.mockResolvedValue('email sent');

        userRepository.findOneByUsername.mockResolvedValue(null);
        userRepository.findOneByEmail.mockResolvedValue(null);

        userRepository.create.mockResolvedValue(mockCreatedUser);
        userRepository.findOneInactiveById.mockResolvedValue(mockCreatedUser);

        const registerResult = await userService.register(mockRequest);

        expect(registerResult).toEqual(mockCreatedUser);

        expect(sendEmail).toHaveBeenCalledTimes(1);
        expect(userRepository.create).toHaveBeenCalledTimes(1);
        expect(userRepository.findOneInactiveById).toHaveBeenCalledTimes(1);

        expect(renderHtml).toHaveBeenCalledWith("otp.ejs", {name: "Test User", otp: "76543"});

        expect(sendEmail).toHaveBeenCalledWith(
            'testuser@example.com',
            'Verify Your Account with This OTP Code (Valid for 5 Minutes)',
            htmlTemplate
        );

        expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining(
            {
                username: 'testuser',
                full_name: 'Test User',
                email: 'testuser@example.com',
            }
        ));
    });

    it('must fail to register a new user because the username already registered', async () => {

        const mockRequest = {
            username: 'testuser',
            full_name: 'Test User',
            email: 'testuser@example.com',
            password: 'testpassword',
            birth_date: '2002-08-08'
        };

        const mockUuid = 'random-uuid-v4';

        uuid.v4.mockReturnValue(mockUuid);

        userRepository.findOneByUsername.mockResolvedValue({id: mockUuid});
        userRepository.findOneByEmail.mockResolvedValue(null);


        await expect(userService.register(mockRequest)).rejects.toThrow('Username already registered');

        expect(sendEmail).toHaveBeenCalledTimes(0);
        expect(userRepository.create).toHaveBeenCalledTimes(0);
        expect(userRepository.findOneInactiveById).toHaveBeenCalledTimes(0);

        expect(renderHtml).toHaveBeenCalledTimes(0);
        expect(sendEmail).toHaveBeenCalledTimes(0)
        expect(userRepository.create).toHaveBeenCalledTimes(0);
    });

    it('must fail to register a new user because the email already registered', async () => {

        const mockRequest = {
            username: 'testuser',
            full_name: 'Test User',
            email: 'testuser@example.com',
            password: 'testpassword',
            birth_date: '2002-08-08'
        };

        const mockUuid = 'random-uuid-v4';

        uuid.v4.mockReturnValue(mockUuid);

        userRepository.findOneByUsername.mockResolvedValue(null);
        userRepository.findOneByEmail.mockResolvedValue({id: mockUuid});


        await expect(userService.register(mockRequest)).rejects.toThrow('Email already registered');

        expect(sendEmail).toHaveBeenCalledTimes(0);
        expect(userRepository.create).toHaveBeenCalledTimes(0);
        expect(userRepository.findOneInactiveById).toHaveBeenCalledTimes(0);

        expect(renderHtml).toHaveBeenCalledTimes(0);
        expect(sendEmail).toHaveBeenCalledTimes(0)
        expect(userRepository.create).toHaveBeenCalledTimes(0);
    });
})

describe('verify otp code', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should verify registered account with otp code', async () => {
        const mockUuid = 'random-uuid-v4';
        const otpCode = '765432';

        const mockUserData = {
            id : mockUuid,
            username: 'nekohime',
            otp_is_active: false,
            otp_code: otpCode,
            otp_validation_expired_at: Date.now() + (60 * 60 * 1000 * 24 * 365),
            is_active: false,
            created_at: Date.now(),
            save: jest.fn().mockResolvedValue({id : mockUuid})
        }

        uuid.v4.mockReturnValue(mockUuid);
        userRepository.findOneByUserIdAndOtpCode.mockResolvedValue(mockUserData);

        await expect(userService.verifyOtpCode('random-user-id', {otp_code : otpCode})).resolves.not.toThrow();
        expect(userRepository.findOneByUserIdAndOtpCode).toHaveBeenCalledTimes(1);
        expect(mockUserData.save).toHaveBeenCalledTimes(1);
    });

    it('must fail to verify registered account with otp code because user not found', async () => {
        const mockUuid = 'random-uuid-v4';
        const otpCode = '765432';

        const mockUserData = {
            id : mockUuid,
            username: 'nekohime',
            otp_is_active: false,
            otp_code: '765431',
            otp_validation_expired_at: Date.now() + (60 * 60 * 1000 * 24 * 365),
            is_active: false,
            created_at: Date.now(),
            save: jest.fn().mockResolvedValue({id : mockUuid})
        }

        uuid.v4.mockReturnValue(mockUuid);
        userRepository.findOneByUserIdAndOtpCode.mockResolvedValue(null);

        await expect(userService.verifyOtpCode('random-user-id', {otp_code : otpCode}))
            .rejects.toThrow('User not found');

        expect(userRepository.findOneByUserIdAndOtpCode).toHaveBeenCalledTimes(1);
        expect(mockUserData.save).toHaveBeenCalledTimes(0);
    });

    it('must fail to verify registered account with otp code because otp code expired', async () => {
        const mockUuid = 'random-uuid-v4';
        const otpCode = '765432';

        const mockUserData = {
            id : mockUuid,
            username: 'nekohime',
            otp_is_active: false,
            otp_code: otpCode,
            otp_validation_expired_at: Date.now() - (60 * 60 * 1000 * 24 * 365),
            is_active: false,
            created_at: Date.now(),
            save: jest.fn().mockResolvedValue({id : mockUuid})
        }

        uuid.v4.mockReturnValue(mockUuid);
        userRepository.findOneByUserIdAndOtpCode.mockResolvedValue(mockUserData);

        await expect(userService.verifyOtpCode('random-user-id', {otp_code : otpCode}))
            .rejects.toThrow('The OTP code has expired. Please request a new one.');

        expect(userRepository.findOneByUserIdAndOtpCode).toHaveBeenCalledTimes(1);
        expect(mockUserData.save).toHaveBeenCalledTimes(0);
    });

    it('must fail to verify registered account with otp code because otp code invalid', async () => {
        const mockUuid = 'random-uuid-v4';
        const otpCode = '765432';

        const mockUserData = {
            id : mockUuid,
            username: 'nekohime',
            otp_is_active: false,
            otp_code: '765431',
            otp_validation_expired_at: Date.now() + (60 * 60 * 1000 * 24 * 365),
            is_active: false,
            created_at: Date.now(),
            save: jest.fn().mockResolvedValue({id : mockUuid})
        }

        uuid.v4.mockReturnValue(mockUuid);
        userRepository.findOneByUserIdAndOtpCode.mockResolvedValue(mockUserData);

        await expect(userService.verifyOtpCode('random-user-id', {otp_code : otpCode}))
            .rejects.toThrow('The OTP code is invalid. Please check the code and try again.');

        expect(userRepository.findOneByUserIdAndOtpCode).toHaveBeenCalledTimes(1);
        expect(mockUserData.save).toHaveBeenCalledTimes(0);
    });
})

describe('refresh otp code', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should refresh otp code registered account with user id', async () => {
        const mockUuid = 'random-uuid-v4';
        const otpCode = '765432';

        uuid.v4.mockReturnValue(mockUuid);
        generateOtp.mockResolvedValue(otpCode);

        const mockUserData = {
            id : mockUuid,
            full_name: 'Neko Hime',
            email: 'nekohime@gmail.com',
            username: 'nekohime',
            otp_is_active: false,
            otp_code: otpCode,
            otp_validation_expired_at: Date.now() - (60 * 60 * 1000 * 24 * 365),
            is_active: false,
            created_at: Date.now(),
            save: jest.fn().mockResolvedValue({id : mockUuid})
        }

        const htmlTemplate = '<html><h1>render some html value</h1>></html>>';

        uuid.v4.mockReturnValue(mockUuid);
        generateOtp.mockResolvedValue(otpCode);
        renderHtml.mockResolvedValue(htmlTemplate);
        sendEmail.mockResolvedValue('email sent');
        userRepository.findOneInactiveAccountByUserId.mockResolvedValue(mockUserData);

        await expect(userService.refreshOtpCode('random-user-id')).resolves.not.toThrow();

        expect(mockUserData.save).toHaveBeenCalledTimes(1);
        expect(renderHtml).toHaveBeenCalledWith("otp.ejs", {name: mockUserData.full_name, otp: otpCode});

        expect(sendEmail).toHaveBeenCalledWith(
            'nekohime@gmail.com',
            'Verify Your Account with This OTP Code (Valid for 5 Minutes)',
            htmlTemplate
        );
    });

    it('must have failed to refresh otp code due to unregistered account', async () => {
        const mockUuid = 'random-uuid-v4';
        const otpCode = '765432';

        uuid.v4.mockReturnValue(mockUuid);
        generateOtp.mockResolvedValue(otpCode);

        const mockUserData = {
            id : mockUuid,
            full_name: 'Neko Hime',
            email: 'nekohime@gmail.com',
            username: 'nekohime',
            otp_is_active: false,
            otp_code: otpCode,
            otp_validation_expired_at: Date.now() - (60 * 60 * 1000 * 24 * 365),
            is_active: false,
            created_at: Date.now(),
            save: jest.fn().mockResolvedValue({id : mockUuid})
        }

        uuid.v4.mockReturnValue(mockUuid);
        userRepository.findOneInactiveAccountByUserId.mockResolvedValue(null);

        await expect(userService.refreshOtpCode('random-user-id')).rejects.toThrow('User not found');

        expect(mockUserData.save).toHaveBeenCalledTimes(0);
        expect(renderHtml).toHaveBeenCalledTimes(0);
        expect(sendEmail).toHaveBeenCalledTimes(0);
    });
})

describe('login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should login and return jwt token', async () => {
        const mockUuid = 'random-uuid-v4';

        const loginRequest = {
            email: 'nekohime@gmail.com',
            password: 'plaintextPassword'
        };

        const mockUserData = {
            id : mockUuid,
            full_name: 'Neko Hime',
            email: 'nekohime@gmail.com',
            password: 'hashedPassword',
            username: 'nekohime',
            role: role.user,
            is_active: true,
            created_at: Date.now(),
        }

        uuid.v4.mockReturnValue(mockUuid);
        bcrypt.compare.mockResolvedValue(true);
        userRepository.findOneByEmail.mockResolvedValue(mockUserData);

        const userLoginResult = await userService.login(loginRequest);
        expect(userLoginResult).toEqual(expect.any(String));

        expect(userRepository.findOneByEmail).toHaveBeenCalledTimes(1);
    });

    it('should fail to log in and return the error user not found', async () => {
        const mockUuid = 'random-uuid-v4';

        const loginRequest = {
            email: 'nekohime@gmail.com',
            password: 'plaintextPassword'
        };

        uuid.v4.mockReturnValue(mockUuid);
        bcrypt.compare.mockReturnValue(true);
        userRepository.findOneByEmail.mockResolvedValue(null);

        await expect(userService.login(loginRequest)).rejects.toThrow('User not found');

        expect(userRepository.findOneByEmail).toHaveBeenCalledTimes(1);
    });

    it('should fail to log in and return the error email or password is incorrect', async () => {
        const mockUuid = 'random-uuid-v4';

        const loginRequest = {
            email: 'nekohime@gmail.com',
            password: 'plaintextPassword'
        };

        const mockUserData = {
            id : mockUuid,
            full_name: 'Neko Hime',
            email: 'nekohime@gmail.com',
            password: 'hashedPassword',
            username: 'nekohime',
            role: role.user,
            is_active: true,
            created_at: Date.now(),
        }

        uuid.v4.mockReturnValue(mockUuid);
        bcrypt.compare.mockReturnValue(false);
        userRepository.findOneByEmail.mockResolvedValue(mockUserData);

        await expect(userService.login(loginRequest)).rejects.toThrow('Email or password is incorrect');

        expect(userRepository.findOneByEmail).toHaveBeenCalledTimes(1);
    });

    describe('current', () => {
        it('should get current user by user id', async () => {
            const mockUuid = 'random-uuid-v4';

            const mockUserData = {
                id : mockUuid,
                full_name: 'Neko Hime',
                email: 'nekohime@gmail.com',
                password: 'hashedPassword',
                username: 'nekohime',
                role: role.user,
                is_active: true,
                created_at: Date.now(),
            }

            uuid.v4.mockReturnValue(mockUuid);
            userRepository.findOneById.mockResolvedValue(mockUserData);

            const userResult = await userService.get(mockUuid);

            expect(userResult).toBe(mockUserData);
            expect(userRepository.findOneById).toHaveBeenCalledTimes(1);
        });

        it('should not get the current user because the user is not found', async () => {
            const mockUuid = 'random-uuid-v4';

            uuid.v4.mockReturnValue(mockUuid);
            userRepository.findOneById.mockResolvedValue(null);

            await expect(userService.get(mockUuid)).rejects.toThrow('User not found');
            expect(userRepository.findOneById).toHaveBeenCalledTimes(1);
        });
    })

})