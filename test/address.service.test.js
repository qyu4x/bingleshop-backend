const { create, get, list, setMain, remove } = require('../src/service/address.service');
const addressRepository = require('../src/repository/address.repository');
const { validate } = require('../src/helper/validation.helper');
const { ResponseError } = require('../src/error/response-error');
const { v4: uuidv4 } = require('uuid');
const { createAddressSchema, getAddressValidation } = require('../src/payload/request/address.request');

jest.mock('../src/repository/address.repository');
jest.mock('../src/helper/validation.helper');
jest.mock('uuid', () => ({
    v4: jest.fn(),
}));
jest.mock('../src/payload/request/address.request', () => ({
    createAddressSchema: jest.fn(),
    getAddressValidation: jest.fn(),
    updateIsMainAddressByUserId: jest.fn(),
}));

const checkAddressMustExist = async (userId, addressId) => {
    const address = await
        addressRepository.findOneByUserIdAndAddressId(userId, addressId);

    if (!address) {
        throw new ResponseError(404, "Address not found");
    }

    return address.id;
};



describe('Address Service', () => {
    const userId = 'test-user-id';
    const addressId = 'test-address-id';
    const address = {
        id: addressId,
        user_id: userId,
        is_main_address: false,
        is_active: true,
        created_at: Date.now(),
        updated_at: Date.now(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        uuidv4.mockReturnValue(addressId);
    });

    describe('checkAddressMustExist', () => {

        it('should return the address id if address exists', async () => {

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(address);

            const result = await checkAddressMustExist(userId,
                addressId);


            expect(addressRepository.findOneByUserIdAndAddressId).toHaveBeenCalledWith(userId,
                addressId);
            expect(result).toEqual(addressId);
        });

        it('should throw an error if address does not exist', async () => {

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(null);

            await expect(checkAddressMustExist(userId,
                addressId)).rejects.toThrow(new ResponseError(404, "Address not found"));
        });
    });

    describe('create', () => {
        it('should create a new address', async () => {
            // Setup Mocks
            const userId = 'test-user-id';
            const addressId = 'test-address-id';
            const address = {
                name: 'Test Name',
                phone_number: '1234567890',
                street: 'Test Street',
                province: 'Test Province',
                city: 'Test City',
                district: 'Test District',
                postal_code: '12345',
                is_main_address: true,
                is_active: true
            };
    
            const validatedAddress = {...address, id: addressId, user_id: userId, created_at: Date.now()};
    
            validate.mockReturnValue(validatedAddress);
            uuidv4.mockReturnValue(addressId);
    
            addressRepository.create.mockResolvedValue(validatedAddress);
            addressRepository.findOneByAddressId.mockResolvedValue(validatedAddress);
            addressRepository.updateIsMainAddressByUserId.mockResolvedValue();
    
            // Call the create function
            const result = await create(userId, address);
    
            // Assertions
            expect(validate).toHaveBeenCalledWith(createAddressSchema, address);
    
            expect(addressRepository.updateIsMainAddressByUserId).toHaveBeenCalledWith(false, userId);
    
            expect(addressRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                id: addressId,
                user_id: userId,
                name: 'Test Name',
                phone_number: '1234567890',
                street: 'Test Street',
                province: 'Test Province',
                city: 'Test City',
                district: 'Test District',
                postal_code: '12345',
                is_main_address: true,
                is_active: true,
                created_at: expect.any(Number),
            }));
    
            expect(result).toEqual(validatedAddress);
        });
    });

    describe('get', () => {
        it('should return an address', async () => {

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(address);

            const result = await get(userId, addressId);


            expect(addressRepository.findOneByUserIdAndAddressId).toHaveBeenCalledWith(userId,
                addressId);
            expect(result).toEqual(address);
        });

        it('should throw an error if address not found', async () => {

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(null);

            await expect(get(userId, addressId)).rejects.toThrow(new
                ResponseError(404, 'Address not found'));
        });
    });

    describe('list', () => {
        it('should return a list of addresses', async () => {
            const addresses = [address];

            addressRepository.findAllByUserId.mockResolvedValue(addresses);

            const result = await list(userId);


            expect(addressRepository.findAllByUserId).toHaveBeenCalledWith(userId);
            expect(result).toEqual(addresses);
        });
    });

    describe('setMain', () => {
        it('should set an address as main', async () => {
            validate.mockReturnValue(addressId);

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(address);

            await setMain(userId, addressId);

            expect(validate).toHaveBeenCalledWith(getAddressValidation,
                addressId);

            expect(addressRepository.findOneByUserIdAndAddressId).toHaveBeenCalledWith(userId,
                addressId);

            expect(addressRepository.updateIsMainAddressByUserId).toHaveBeenCalledWith(false,
                userId);

            expect(addressRepository.updateIsMainAddressByAddressIdAndUserId).toHaveBeenCalledWith(true,
                addressId, userId);
        });

        it('should throw an error if address does not exist', async () => {
            validate.mockReturnValue(addressId);

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(null);

            await expect(setMain(userId, addressId)).rejects.toThrow(new ResponseError(404, "Address not found"));
        });
    });

    describe('remove', () => {
         it('should remove an address', async () => {
        // Setup Mocks
        const userId = 'test-user-id';
        const addressId = 'test-address-id';
        const address = {
            id: addressId,
            user_id: userId,
            name: 'Test Name',
            phone_number: '1234567890',
            street: 'Test Street',
            province: 'Test Province',
            city: 'Test City',
            district: 'Test District',
            postal_code: '12345',
            is_main_address: false,
            is_active: true,
            created_at: Date.now(),
            updated_at: Date.now(),
            save: jest.fn() // Mocking the save method
        };

        validate.mockReturnValue(addressId);
        addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(address);

        // Call the remove function
        await remove(userId, addressId);

        // Assertions
        expect(validate).toHaveBeenCalledWith(getAddressValidation, addressId);
        expect(addressRepository.findOneByUserIdAndAddressId).toHaveBeenCalledWith(userId, addressId);

        expect(address.save).toHaveBeenCalled();
        expect(address.is_active).toBe(false);
        expect(address.updated_at).toEqual(expect.any(Number));
    });

    it('should throw an error if address does not exist', async () => {
        validate.mockReturnValue(addressId);

        addressRepository.findOneByUserIdAndAddressId.mockResolvedValue(null);

        await expect(remove(userId, addressId)).rejects.toThrow(new ResponseError(404, "Address not found"));
    });

        it('should throw an error if trying to remove main address',
            async () => {
                validate.mockReturnValue(addressId);

                addressRepository.findOneByUserIdAndAddressId.mockResolvedValue({
                    ...address, is_main_address: true
                });

                await expect(remove(userId, addressId)).rejects.toThrow(new
                    ResponseError(400, 'Main address cannot be deleted'));
            });
    });
});

