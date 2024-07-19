const {validate} = require('../src/helper/validation.helper');
const {ResponseError} = require("../src/error/response-error");
const { v4: uuidv4 } = require('uuid');
const paymentMethodRepository = require('../src/repository/payment-method.repository');
const paymentMethodService = require('../src/service/payment-method.service');
const { PaymentMethods } = require('../src/model/paymentmethods');

jest.mock('../src/repository/payment-method.repository');
jest.mock('../src/helper/validation.helper');
jest.mock('../src/error/response-error');
jest.mock('../src/service/payment-method.service');
jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('Payment Method Service - create', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new payment method', async () => {
        const createRequest = {
            name: 'Test Payment Method',
            payment_fees: 100,
            logo_url: 'https://example.com/logo.png',
            description: 'Test payment method description'
        };

        const createdPaymentMethod = {
            id: uuidv4(),
            name: 'Test Payment Method',
            payment_fees: 100,
            logo_url: 'https://example.com/logo.png',
            is_active: true,
            description: 'Test payment method description',
            created_at: Date.now(),
            updated_at: null
        };

        paymentMethodRepository.findOneByName.mockResolvedValue(null); // No existing payment method
        paymentMethodRepository.create.mockResolvedValue(createdPaymentMethod);

        const result = await createPaymentMethodService(createRequest);

        expect(result).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: 'Test Payment Method',
            isActive: true,

        }));

        expect(paymentMethodRepository.findOneByName).toHaveBeenCalledWith('Test Payment Method');
        expect(paymentMethodRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            id: expect.any(String),
            name: 'Test Payment Method',
            payment_fees: 100,
        }));
    });


    it('should throw error if payment method already exists', async () => {
        const mockRequest = {
            name: 'Test Payment Method'
        };

        paymentMethodRepository.findOneByName.mockResolvedValue({ id: uuidv4(), name: 'Test Payment Method' });

        await expect(createPaymentMethodService(mockRequest)).rejects.toThrow(ResponseError);
        expect(paymentMethodRepository.findOneByName).toHaveBeenCalledWith('Test Payment Method');
        expect(paymentMethodRepository.create).not.toHaveBeenCalled(); 
    });
});

describe('list payment', () => {
    it('should list all payment methods', async () => {
        const mockPaymentMethods = [
            {
                id: uuidv4(),
                name: 'Test Payment Method 1',
                payment_fees: 50,
                logo_url: 'https://example.com/logo1.png',
                is_active: true,
                description: 'Test payment method 1 description',
                created_at: Date.now(),
                updated_at: null
            },
            {
                id: uuidv4(),
                name: 'Test Payment Method 2',
                payment_fees: 75,
                logo_url: 'https://example.com/logo2.png',
                is_active: true,
                description: 'Test payment method 2 description',
                created_at: Date.now(),
                updated_at: null
            }
        ];

        paymentMethodRepository.findAll.mockResolvedValue(mockPaymentMethods);

        const result = await listPaymentMethodsService();

        expect(result.length).toBe(2);
        expect(result[0]).toBeInstanceOf(PaymentMethodResponse);
        expect(result[1]).toBeInstanceOf(PaymentMethodResponse);

        expect(paymentMethodRepository.findAll).toHaveBeenCalled();
    });
});

describe( 'remove payment', () => {
    it('should remove a payment method', async () => {
        const PaymentMethodId = uuidv4();

        const PaymentMethod = {
            id: PaymentMethodId,
            name: 'Test Payment Method',
            payment_fees: 100,
            logo_url: 'https://example.com/logo.png',
            is_active: true,
            description: 'Test payment method description',
            created_at: Date.now(),
            updated_at: null
        };

        paymentMethodRepository.findOneById.mockResolvedValue(PaymentMethod);

        await paymentMethodService.remove(PaymentMethodId)
        expect(paymentMethodRepository.findOneById).toHaveBeenCalledWith(PaymentMethodId);

    });

    it('should throw error if payment method not found', async () => {
        const PaymentMethodId = uuidv4();

        paymentMethodRepository.findOneById.mockResolvedValue(null);

        await expect(paymentMethodService.remove(PaymentMethodId)).rejects.toThrow(ResponseError);
        expect(paymentMethodRepository.findOneById).toHaveBeenCalledWith(PaymentMethodId);
        expect(paymentMethodRepository.save).not.toHaveBeenCalled(); 
    });
    });