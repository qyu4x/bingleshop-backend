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
            validate.mockReturnValue(address);
            addressRepository.create.mockResolvedValue(address);

            addressRepository.findOneByAddressId.mockResolvedValue(address);

            const result = await create(userId, address);

            expect(validate).toHaveBeenCalledWith(createAddressSchema,
                address);

            expect(addressRepository.updateIsMainAddressByUserId).toHaveBeenCalledWith(false,
                userId);

            expect(addressRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                id: addressId,
                user_id: userId,
                created_at: expect.any(Number),
                is_active: true,
            }));
            expect(result).toEqual(address);
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
    });

    describe('remove', () => {
        it('should remove an address', async () => {
            validate.mockReturnValue(addressId);

            addressRepository.findOneByUserIdAndAddressId.mockResolvedValue({
                ...address, is_main_address: false
            });

            await remove(userId, addressId);

            expect(validate).toHaveBeenCalledWith(getAddressValidation,
                addressId);

            expect(addressRepository.findOneByUserIdAndAddressId).toHaveBeenCalledWith(userId,
                addressId);

            expect(addressRepository.update).toHaveBeenCalledWith(expect.objectContaining({
                is_active: false,
                updated_at: expect.any(Number),
            }));
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

