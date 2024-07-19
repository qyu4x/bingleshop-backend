const { validate } = require('../src/helper/validation.helper');
const { ResponseError } = require('../src/error/response-error');
const { v4: uuidv4 } = require('uuid');
const paymentMethodRepository = require('../src/repository/payment-method.repository');
const paymentMethodService = require('../src/service/payment-method.service');
const { PaymentMethodResponse } = require('../src/payload/response/payment-method.response');


jest.mock('../src/repository/payment-method.repository');
jest.mock('../src/helper/validation.helper');
jest.mock('../src/error/response-error');
jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('Payment Method Service', () => {
    const mockUuid = 'test-uuid';
    const now = Date.now();

    beforeEach(() => {
        jest.clearAllMocks();
        uuidv4.mockReturnValue(mockUuid);
    });

    describe('create', () => {
        it('should create a new payment method', async () => {
            const createRequest = {
                name: 'Test Payment Method',
                payment_fees: 100,
                logo_url: 'https://example.com/logo.png',
                description: 'Test payment method description'
            };

            const createdPaymentMethod = {
                id: mockUuid,
                name: 'Test Payment Method',
                payment_fees: 100,
                logo_url: 'https://example.com/logo.png',
                is_active: true,
                description: 'Test payment method description',
                created_at: now,
                updated_at: null
            };

            validate.mockReturnValue(createRequest);
            paymentMethodRepository.findOneByName.mockResolvedValue(null); // No existing payment method
            paymentMethodRepository.create.mockResolvedValue(createdPaymentMethod);

            const result = await paymentMethodService.create(createRequest);

            expect(validate).toHaveBeenCalledWith(expect.any(Object), createRequest);
            expect(paymentMethodRepository.findOneByName).toHaveBeenCalledWith('Test Payment Method');
            expect(paymentMethodRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                id: mockUuid,
                name: 'Test Payment Method',
                payment_fees: 100,
                logo_url: 'https://example.com/logo.png',
                is_active: true,
                description: 'Test payment method description',
                created_at: now
            }));
            expect(result).toBeInstanceOf(PaymentMethodResponse);
            expect(result).toEqual(expect.objectContaining({
                id: mockUuid,
                name: 'Test Payment Method',
                is_active: true,
            }));
        });

        it('should throw error if payment method already exists', async () => {
            const mockRequest = {
                name: 'Test Payment Method'
            };

            validate.mockReturnValue(mockRequest);
            paymentMethodRepository.findOneByName.mockResolvedValue({ id: mockUuid, name: 'Test Payment Method' });

            await expect(paymentMethodService.create(mockRequest)).rejects.toThrow(ResponseError);
            expect(paymentMethodRepository.findOneByName).toHaveBeenCalledWith('Test Payment Method');
            expect(paymentMethodRepository.create).not.toHaveBeenCalled(); 
        });
    });

    describe('list', () => {
        it('should list all payment methods', async () => {
            const mockPaymentMethods = [
                {
                    id: uuidv4(),
                    name: 'Test Payment Method 1',
                    payment_fees: 50,
                    logo_url: 'https://example.com/logo1.png',
                    is_active: true,
                    description: 'Test payment method 1 description',
                    created_at: now,
                    updated_at: null
                },
                {
                    id: uuidv4(),
                    name: 'Test Payment Method 2',
                    payment_fees: 75,
                    logo_url: 'https://example.com/logo2.png',
                    is_active: true,
                    description: 'Test payment method 2 description',
                    created_at: now,
                    updated_at: null
                }
            ];

            paymentMethodRepository.findAll.mockResolvedValue(mockPaymentMethods);

            const result = await paymentMethodService.list();

            expect(result.length).toBe(2);
            expect(result[0]).toBeInstanceOf(PaymentMethodResponse);
            expect(result[1]).toBeInstanceOf(PaymentMethodResponse);

            expect(paymentMethodRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('remove', () => {
        it('should remove a payment method', async () => {
            const paymentMethodId = mockUuid;

            const paymentMethod = {
                id: paymentMethodId,
                name: 'Test Payment Method',
                payment_fees: 100,
                logo_url: 'https://example.com/logo.png',
                is_active: true,
                description: 'Test payment method description',
                created_at: now,
                updated_at: null,
                save: jest.fn()
            };

            validate.mockReturnValue(paymentMethodId);
            paymentMethodRepository.findOneById.mockResolvedValue(paymentMethod);

            await paymentMethodService.remove(paymentMethodId);

            expect(validate).toHaveBeenCalledWith(expect.any(Object), paymentMethodId);
            expect(paymentMethodRepository.findOneById).toHaveBeenCalledWith(paymentMethodId);
            expect(paymentMethod.is_active).toBe(false);
            expect(paymentMethod.updated_at).toEqual(expect.any(Number));
            expect(paymentMethod.save).toHaveBeenCalled();
        });

        it('should throw error if payment method not found', async () => {
            const paymentMethodId = mockUuid;

            validate.mockReturnValue(paymentMethodId);
            paymentMethodRepository.findOneById.mockResolvedValue(null);

            await expect(paymentMethodService.remove(paymentMethodId)).rejects.toThrow(ResponseError);
            expect(paymentMethodRepository.findOneById).toHaveBeenCalledWith(paymentMethodId);
            expect(paymentMethodRepository.save).not.toHaveBeenCalled(); 
        });
    });
});

