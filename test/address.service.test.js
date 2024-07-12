const addressRepository = require('../src/repository/address.repository');
const addressService = require('../src/service/address.service');

const uuid = require('uuid');
const Joi = require('joi');
const {validate} = require('../helper/validation.helper');
const { ResponseError } = require('../src/error/response-error');
const { describe } = require('node:test');
const { createAddressSchema } = require('../src/payload/request/address.request');


jest.mock('../src/repository/address.repository');
jest.mock('../src/helper/render-html.helper');
jest.mock('uuid');

describe('Address Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () =>  {
        it('should create a new adress' , async () => {
            const mockUserID = 'mock-user-id';
            const mockRequest = {
                name : 'Name Example',
                phone_number : '085157723xxxx',
                street: 'Example Street',
                city: 'Example City',
                province: 'Example Province',
                district: 'Example District',
                postal_code: 12345,
                is_main_address: true,
            };
            const mockCreatedAddress = { id: 'mock-address-id', ...mockRequest};

            addressRepository.create.mockResolvedValue();
            addressRepository.findOneByAddressId.mockResolvedValue(mockCreatedAddress)

            const {error, value} = createAddressSchema.validate(mockRequest);
            expect(error).toBeUndefined();

            const result = await create(mockUserID, mockRequest);

            expect(result).toEqual(mockCreatedAddress);
            expect(addressRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                user_id: 1,
                street: 'Example Street',
                city: 'Example Street',
                province: 'Example Province',
                district: 'Example District',
                postal_code: 12345,
            }));
            expect(addressRepository.findOneByAddressId).toHaveBeenCalledWith(mockCreatedAddress.id);
        });
    });

    describe('checkAddressMustExist', () => {
        it('should return address id if address exists', async () => {
            const mockUserId = 'mock-user-id';
            const mockAddressId = 'mock-address-id';
            const mockAddress = { id: mockAddressId };

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(mockAddress);

            const result = await checkAddressMustExist(mockUserId, mockAddressId);

            expect(result).toEqual(mockAddressId);
            expect(addressRepository.findOneByUserIdAndAddressId).toHaveBeenCalledWith(mockUserId, mockAddressId);
        });

        it('should throw ResponseError if address does not exist', async () => {
            const mockUserId = 'mock-user-id';
            const mockAddressId = 'mock-address-id';

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(null);

            await expect(checkAddressMustExist(mockUserId, mockAddressId)).rejects.toThrow(ResponseError);
            
            expect(addressRepository.findOneByUserIdAndAddressId).toHaveBeenCalledWith(mockUserId, mockAddressId);
        });
    });

    describe('get', () => {
        it('should get an address by userId and addressId', async () => {
            const mockUserId = 'mock-user-id';
            const mockAddressId = 'mock-address-id';

            const mockAddress = {
                id: addressId,
                user_id: userId,
                street: 'Example Street',
                city: 'Example City',
                province: 'Example Province',
                district: 'Example District',
                postal_code: 12345,
            };
            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(mockAddress);

            const resultAddress = await addressService.get(mockUserId, mockAddressId);

            expect(resultAddress).toEqual(mockAddress);
            expect(addressRepository.findOneByUserIdAndAddressId).toHaveBeenCalledWith(mockUserId, mockAddressId);
        });

        it('should throw error if address is not found', async () => {
            const mockUserID = 'user123';
            const mockAddressId = 'address123';

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(null);

            await expect(addressService.get(mockUserID, mockAddressId)).rejects.toThrowError(ResponseError);
        });
    });


    describe('list', () => {
        it('should return a list of addresses for a user', async () => {
            const mockUserId = 'mock-user-id';
            const mockAddresses = [{ id: 'mock-address-id-1' }, { id: 'mock-address-id-2' }];

            addressRepository.findAllByUserId.mockResolvedValue(mockAddresses);

            const result = await list(mockUserId);

            expect(result).toEqual(mockAddresses);
            expect(addressRepository.findAllByUserId).toHaveBeenCalledWith(mockUserId);
        });
    });

    describe('set main', () => {
        it('should set an address for a user', async () => {
            const mockUserId = 'mock-user-id';
            const mockAddresses = [{ id: 'mock-address-id-1' }, { id: 'mock-address-id-2' }];

            addressRepository.findAllByUserId.mockResolvedValue(mockAddresses);

            const result = await list(mockUserId);

            expect(result).toEqual(mockAddresses);
            expect(addressRepository.findAllByUserId).toHaveBeenCalledWith(mockUserId);
        });
    });
});
