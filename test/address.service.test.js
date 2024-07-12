const addressRepository = require('../src/repository/address.repository');
const addressService = require('../src/service/address.service');

const uuid = require('uuid');
const Joi = require('joi');
const {validate} = require('../helper/validation.helper');
const { ResponseError } = require('../src/error/response-error');
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
        it('should return a list of address by user id', async () => {
            const mockUserId = 'mock-user-id';
            const mockAddressResults = [
                {
                    id: 'random-id',
                    user_id: 'random-user-id',
                    name:'example name',
                    phone_number: '085157723xxx',
                    street: 'example street',
                    province: 'example province',
                    city: 'example city',
                    district: 'example district',
                    postal_code: 12345,
                    is_active: true,
                    created_at: 2398193282,
                    update_at: 2458193282,
                },
                {
                    id: 'random-id-2',
                    user_id: 'random-user-id',
                    name: 'Example Name 2',
                    phone_number: '085157723xxx',
                    street: 'Example Street 2',
                    province: 'Example Province 2',
                    city: 'Example City 2',
                    district: 'Example District 2',
                    postal_code: 54321,
                    is_active: true,
                    created_at: 2398193283,
                    update_at: 2458193283,
                },
            ]
            addressRepository.findAllByUserId.mockResolvedValue(mockAddressResults);

            const addressList = await addressService.list(mockUserId);
            
            expect(addressList).toEqual(mockAddressResults);
            expect(addressRepository.findAllByUserId).toHaveBeenCalledWith(mockUserId);
            expect(addressRepository.findAllByUserId).toHaveBeenCalledTimes(1);
        });
    });

    describe('set main', () => {
        it('should set main address successfully', async () => {
            const userId = 1;
            const addressId = 2;

            //mocking validate function to return mockAddressId directly
            addressService.validate.mockResolvedValue(addressId)
            addressRepository.checkAddressMustExist.mockResolvedValue(addressId);
            addressRepository
            validate.mockResolvedValue(addressId);
            checkAddressMustExist.mockResolvedValue(addressId);
            addressRepository.updateIsMainAddressByUserId.mockResolvedValue();
            addressRepository.updateIsMainAddressByAddressIdAndUserId.mockResolvedValue();

            await setMain(userId, addressId);

            expect(validate).toHaveBeenCalledWith(expect.any(Function), mockAddressesaddressId);
            expect(checkAddressMustExist).toHaveBeenCalledWith(userId, addressId);
            expect(addressRepository.updateIsMainAddressByUserId).toHaveBeenCalledWith(false, userId);
            expect(addressRepository.updateIsMainAddressByAddressIdAndUserId).toHaveBeenCalledWith(true, addressId, userId);
    });
        });
    });

    describe('remove', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should remove address successfully when not main address', async () => {
            const userId = 1;
            const addressId = 2;
            const mockAddress = {
                id: addressId,
                is_main_address: false, 
                save: jest.fn()
            };
            validate.mockReturnValue(addressId);
            checkCategoryMustExist.mockResolvedValue(addressId);
            get.mockResolvedValue(mockAddress);
            AddressModel.save.mockResolvedValue();

            await remove(userId, addressId);

            expect(validate).toHaveBeenCalledWith(expect.any(Function), addressId);
            expect(checkAddressMustExist).toHaveBeenCalledWith(userId, addressId);
            expect(get).toHaveBeenCalledWith(userId, addressId);

            expect(mockAddress.is_active).toBe(false);
            expect(mockAddress.updated_at).toBeGreaterThan(0);
            expect(mockAddress.save).toHaveBeenCalled();
        });

        it('should throw error when trying to remove main address', async () => {
            const userId = 1;
            const addressId = 100;
            const MainAddress = {
              id: addressId,
              is_main_address: true
            };
        
            validate.mockReturnValue(addressId);
            checkAddressMustExist.mockResolvedValue(addressId);
            get.mockResolvedValue(MainAddress);
        
            addressModel.save.mockImplementation(() => {
              throw new Error('save should not be called');
            });
        
            await expect(remove(userId, addressId)).rejects.toThrow(ResponseError);
        
            expect(validate).toHaveBeenCalledWith(expect.any(Function), addressId);
            expect(checkAddressMustExist).toHaveBeenCalledWith(userId, addressId);
            expect(get).toHaveBeenCalledWith(userId, addressId);
          });
        });