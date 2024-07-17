const paymentMethodService = require('../src/service/payment-method.service');
const paymentMethodRepository = require('../src/repository/payment-method.repository');
const {v4: uuidv4} = require('uuid');
const {validate} = require('../src/helper/validation.helper');

jest.mock('../src/repository/payment-method.repository');
jest.mock('../src/helper/validation.helper');

describe('create', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should create a new payment method successfully', async () => {
        const request = {
            name: 'Credit Card',
            payment_fees: 2.5,
            logo_url: 'https://example.com/creditcard.png',
            description: 'Credit card payment method'
        };
    validate.mockReturnValue(request);

    paymentMethodRepository.findOneByName.mockResolvedValue
