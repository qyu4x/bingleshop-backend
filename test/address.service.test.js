const addressRepository = require('../src/repository/address.repository');
const addressService = require('../src/service/address.service');

const uuid = require('uuid');
const Joi = require('joi');
const {validate} = require('../src/helper/validation.helper');
const { ResponseError } = require('../src/error/response-error');
const { createAddressSchema } = require('../src/payload/request/address.request');


jest.mock('../src/repository/address.repository');
jest.mock('../src/helper/render-html.helper');
jest.mock('uuid');


    describe('create', () =>  {
        afterEach(() => {
            jest.clearAllMocks();
        });

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
            const mockAddress = { id: 'mock-address-id', 
                ...mockRequest,
                created_at: Date.now(),
                is_active: true
            };

            uuid.mockResolvedValue(mockAddress.id);
            validate.mockResolvedValue(mockRequest)
            addressRepository.updateIsMainAddressByUserId.mockResolvedValue(true);
            addressRepository.create.mockResolvedValue(mockAddress);
    
            const createAddress = await create(mockUserID, mockRequest);

            expect(createAddress).toEqual(mockAddress);
            expect(uuid).toHaveBeenCalled();
            expect(validate).toHaveBeenCalledWith(createAddressSchema,mockRequest);
            expect(addressRepository.create).toHaveBeenCalledWith({
                id : 1,
                user_id: 1,
                ...mockRequest,
                created_at : expect.any(Number),
                is_active: true
            });
        });
    });
   
     describe('checkAddressMustExist', () => {
            afterEach(() => {
               jest.clearAllMocks();
        });
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
         afterEach(() => {
            jest.clearAllMocks();
        });    
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
        const userId = 'user123';
            const mockAddresses = [
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

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return a list of addresses for a user', async () => {
            addressRepository.findAllByUserId.mockResolvedValue(mockAddresses);
    
            const addresses = await list(userId);
    
            expect(addresses).toEqual(mockAddresses);
            expect(addressRepository.findAllByUserId).toHaveBeenCalledWith(userId);
        });

        it('should return an empty data if no addresses are found', async () => {
            addressRepository.findAllByUserId.mockResolvedValue([]);
    
            const addresses = await list(userId);
    
            expect(addresses).toEqual([]);
            expect(addressRepository.findAllByUserId).toHaveBeenCalledWith(userId);
        });

    describe('setMain', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('setMain updates main address successfully', async () => {
            const userId = '123';
            const addressId = '456';
    
            const address = {
                id: addressId,
                user_id: userId,
                is_main_address: false
            };
    
            const updatedAddress = {
                ...address,
                is_main_address: true
            };

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(address);
            addressRepository.updateIsMainAddressByUserId.mockResolvedValue(true);
            addressRepository.updateIsMainAddressByAddressIdAndUserId.mockResolvedValue(true);
    
            await addressService.setMain(userId, addressId);
    
            expect(addressRepository.updateIsMainAddressByUserId).toHaveBeenCalledWith(false, userId);
            expect(addressRepository.updateIsMainAddressByAddressIdAndUserId).toHaveBeenCalledWith(true, addressId, userId);
        });
        
        it('setMain throws error if address not found', async () => {
            const userId = '123';
            const addressId = '456';
    
            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(null);
    
            await expect(addressService.setMain(userId, addressId)).rejects.toThrowError(ResponseError);
        });
    });

    describe('remove', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it('should remove an address successfully', async () => {
            const userId = 1;
            const addressId = 2;
            const mockAddress = {
                id: addressId,
                user_id: userId,
                is_main_address: false, 
                is_active: true,
                save: jest.fn().mockResolvedValue()
            };
    
            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(mockAddress)
            await remove(userId, addressId);

            expect(mockAddress.is_active).toBe(false)
            expect(mockAddress.save).toHaveBeenCalled();
        });

        it('should throw error when trying to remove main address', async () => {
            const userId = 1;
            const addressId = 2;
            const mockAddress = {
                id: addressId,
                user_id: userId,
                is_main_address: true, 
                is_active: true
            };
            const mainAddress = { ... mockAddress, is_main_address: true};
            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(mainAddress)

            await expect(remove(userId,addressId)).rejects.toThrow(ResponseError);
        
          });
        });
    });