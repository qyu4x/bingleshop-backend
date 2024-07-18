const { validate } = require('../src/helper/validation.helper');
const { ResponseError } = require('../src/error/response-error');
const {
    getLogisticValidation,
    createLogisticValidation
} = require('../src/payload/request/logistic.request');
const { formatCurrency } = require('../src/helper/i18n-currency.helper');
const { Logistics } = require('../src/model');
const { LogisticResponse } = require('../src/payload/response/logistic.response');
const { CurrencyResponse } = require('../src/payload/response/currency.response');
const logisticService = require('../src/service/logistic.service');
const logisticRepository = require('../src/repository/logistic.repository');
const { v4: uuidv4 } = require('uuid');

jest.mock('../src/helper/validation.helper');
jest.mock('../src/error/response-error');
jest.mock('../src/repository/logistic.repository');
jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mocked-logistic-id') // Mock uuidv4 to return a fixed value
}));

describe('Logistic Service', () => {
    const validLogisticId = 'valid-logistic-id';
    const invalidLogisticId = 'invalid-logistic-id';
    const validRequest = {
        name: 'logistic-name',
        payment_fees_permile: 5000,
        logo_url: 'https://example.com/logo.png',
        description: 'logistic-description',
    };
    const createdLogistic = {
        id: 'logistic-id',
        ...validRequest,
        is_active: true,
        created_at: Date.now(),
    };
    const logisticResponse = {
        ...createdLogistic,
        payment_fees_permile: new CurrencyResponse(
            validRequest.payment_fees_permile,
            formatCurrency(validRequest.payment_fees_permile, 'id-ID', 'IDR', 'code'),
            formatCurrency(validRequest.payment_fees_permile, 'id-ID', 'IDR', 'symbol')
        )
    };
    const logisticsListResponse = [logisticResponse];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new logistic successfully', async () => {
            validate.mockImplementation((schema, value) => value);
            uuidv4.mockReturnValue('mocked-logistic-id'); 
            logisticRepository.findOneByName.mockResolvedValue(null);
            logisticRepository.create.mockResolvedValue({
                ...createdLogistic,
                id: 'mocked-logistic-id', 
                created_at: Date.now(), 
            });
    
            const result = await logisticService.create(validRequest);
    
            expect(validate).toHaveBeenCalledWith(createLogisticValidation, validRequest);
            expect(uuidv4).toHaveBeenCalled(); 
            expect(logisticRepository.findOneByName).toHaveBeenCalledWith(validRequest.name);
            expect(logisticRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                ...validRequest,
                id: 'mocked-logistic-id', 
                is_active: true,
                created_at: expect.any(Number),
            }));
            expect(result).toBeInstanceOf(LogisticResponse);
        });

        it('should throw a ResponseError if logistic already exists', async () => {
            validate.mockImplementation((schema, value) => value);
            logisticRepository.findOneByName.mockResolvedValue(createdLogistic);

            try {
                await logisticService.create(validRequest);
                // If no error is thrown, fail the test explicitly
                fail('Expected create() to throw an error');
            } catch (error) {
                expect(error).toBeInstanceOf(ResponseError);
            }

            expect(validate).toHaveBeenCalledWith(createLogisticValidation, validRequest);
            expect(logisticRepository.findOneByName).toHaveBeenCalledWith(validRequest.name);
            expect(logisticRepository.create).not.toHaveBeenCalled();
        });
    });

    describe('list', () => {
        it('should list all logistics successfully', async () => {
            logisticRepository.findAll.mockResolvedValue(logisticsListResponse);

            const result = await logisticService.list();

            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(LogisticResponse);
            expect(logisticRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('remove', () => {
        it('should remove a logistic successfully', async () => {
            validate.mockImplementation((schema, value) => value);
            const availableLogistic = { ...createdLogistic, save: jest.fn() };
            logisticRepository.findOneById.mockResolvedValue(availableLogistic);

            await logisticService.remove(validLogisticId);

            expect(validate).toHaveBeenCalledWith(getLogisticValidation, validLogisticId);
            expect(logisticRepository.findOneById).toHaveBeenCalledWith(validLogisticId);
            expect(availableLogistic.is_active).toBe(false);
            expect(availableLogistic.updated_at).toBeDefined();
            expect(availableLogistic.save).toHaveBeenCalled();
        });

        it('should throw a ResponseError if logistic is not found', async () => {
            validate.mockImplementation((schema, value) => value);
            logisticRepository.findOneById.mockResolvedValue(null);

            try {
                await logisticService.remove(invalidLogisticId);
                // If no error is thrown, fail the test explicitly
                fail('Expected remove() to throw an error');
            } catch (error) {
                expect(error).toBeInstanceOf(ResponseError);
            }

            expect(validate).toHaveBeenCalledWith(getLogisticValidation, invalidLogisticId);
            expect(logisticRepository.findOneById).toHaveBeenCalledWith(invalidLogisticId);
        });
    });
});
