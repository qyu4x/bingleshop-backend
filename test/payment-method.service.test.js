const { create, list, remove } = require('../src/service/payment-method.service');
const paymentMethodRepository = require('../src/repository/payment-method.repository');
const { validate } = require('../src/helper/validation.helper');
const { ResponseError } = require('../src/error/response-error');
const { PaymentMethodResponse } = require('../src/payload/response/payment-method.response');
const { CurrencyResponse } = require('../src/payload/response/currency.response');
const { formatCurrency } = require('../src/helper/i18n-currency.helper');
const { v4: uuidv4 } = require('uuid');

jest.mock('../src/repository/payment-method.repository');
jest.mock('../src/helper/validation.helper');
jest.mock('../src/helper/i18n-currency.helper');
jest.mock('uuid', () => ({
    v4: jest.fn(),
}));
jest.mock('../src/payload/request/payment-method.request', () => ({
    createPaymentValidation: jest.fn(),
    getPaymentMethodValidation: jest.fn(),
}));

describe('Payment Method Service', () => {
    const mockUuid = 'random-uuid-v4';
    const mockPaymentMethod = {
        id: mockUuid,
        name: 'New Payment Method',
        payment_fees: 2000,
        logo_url: 'http://example.com/new-logo.png',
        is_active: true,
        description: 'New Description',
        created_at: Date.now(),
        updated_at: Date.now()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        uuidv4.mockReturnValue(mockUuid);
        formatCurrency.mockReturnValue('formattedCurrency');
    });

    describe('create', () => {
        it('should create a new payment method', async () => {
            const mockRequest = {
                name: 'New Payment Method',
                payment_fees: 2000,
                logo_url: 'http://example.com/new-logo.png',
                description: 'New Description'
            };

            const validatedPaymentMethod = {
                ...mockRequest,
                id: mockUuid,
                is_active: true,
                created_at: Date.now()
            };

            validate.mockReturnValue(validatedPaymentMethod);
            paymentMethodRepository.findOneByName.mockResolvedValue(null);
            paymentMethodRepository.create.mockResolvedValue(mockPaymentMethod);

            const result = await create(mockRequest);

            expect(validate).toHaveBeenCalledWith(expect.any(Function), mockRequest);
            expect(paymentMethodRepository.findOneByName).toHaveBeenCalledWith(mockRequest.name);
            expect(paymentMethodRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                id: mockUuid,
                name: mockRequest.name,
                payment_fees: mockRequest.payment_fees,
                logo_url: mockRequest.logo_url,
                description: mockRequest.description,
                is_active: true,
                created_at: expect.any(Number),
            }));
            expect(result).toEqual(new PaymentMethodResponse(
                mockUuid,
                mockRequest.name,
                new CurrencyResponse(
                    mockRequest.payment_fees,
                    'formattedCurrency',
                    'formattedCurrency'
                ),
                mockRequest.logo_url,
                true,
                mockRequest.description,
                expect.any(Number),
                expect.any(Number)
            ));
        });

        it('should throw an error if payment method already exists', async () => {
            const mockRequest = {
                name: 'Existing Payment Method'
            };

            validate.mockReturnValue(mockRequest);
            paymentMethodRepository.findOneByName.mockResolvedValue(mockPaymentMethod);

            await expect(create(mockRequest)).rejects.toThrow(new ResponseError(409, 'Payment method already exists'));
            expect(paymentMethodRepository.findOneByName).toHaveBeenCalledWith(mockRequest.name);
            expect(paymentMethodRepository.create).not.toHaveBeenCalled();
        });
    });

    describe('list', () => {
        it('should return a list of payment methods', async () => {
            const paymentMethods = [mockPaymentMethod];

            paymentMethodRepository.findAll.mockResolvedValue(paymentMethods);

            const result = await list();

            expect(paymentMethodRepository.findAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual([new PaymentMethodResponse(
                mockUuid,
                mockPaymentMethod.name,
                new CurrencyResponse(
                    mockPaymentMethod.payment_fees,
                    'formattedCurrency',
                    'formattedCurrency'
                ),
                mockPaymentMethod.logo_url,
                mockPaymentMethod.is_active,
                mockPaymentMethod.description,
                mockPaymentMethod.created_at,
                mockPaymentMethod.updated_at
            )]);
        });
    });

    describe('remove', () => {
        it('should remove a payment method', async () => {
            const mockRequestId = 'test-payment-method-id';
            const paymentMethod = {
                ...mockPaymentMethod,
                id: mockRequestId,
                save: jest.fn()
            };

            validate.mockReturnValue(mockRequestId);
            paymentMethodRepository.findOneById.mockResolvedValue(paymentMethod);

            await remove(mockRequestId);

            expect(validate).toHaveBeenCalledWith(expect.any(Function), mockRequestId);
            expect(paymentMethodRepository.findOneById).toHaveBeenCalledWith(mockRequestId);
            expect(paymentMethod.save).toHaveBeenCalled();
            expect(paymentMethod.is_active).toBe(false);
            expect(paymentMethod.updated_at).toEqual(expect.any(Number));
        });

        it('should throw an error if payment method does not exist', async () => {
            const mockRequestId = 'non-existent-id';

            validate.mockReturnValue(mockRequestId);
            paymentMethodRepository.findOneById.mockResolvedValue(null);

            await expect(remove(mockRequestId)).rejects.toThrow(new ResponseError(404, 'Payment method not found'));
            expect(paymentMethodRepository.findOneById).toHaveBeenCalledWith(mockRequestId);
        });
    });
});
