const imageRepository = require('../src/repository/image.repository');
const imageService = require('../src/service/image.service');  // Ensure this points to the actual implementation
const productRepository = require('../src/repository/product.repository');
const imagekitHelper = require('../src/helper/imagekit.helper');
const uuid = require('uuid');
const { any } = require('joi');
const {ResponseError} = require("../src/error/response-error");

jest.mock('../src/repository/image.repository');
jest.mock('../src/helper/imagekit.helper');
jest.mock('../src/repository/product.repository');
jest.mock('uuid');

describe('create image', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should upload image', async () => {
        const file = { buffer: Buffer.from('fake-image-data'), originalname: 'test-image.jpg' };
        const product_id = 'test-product-id';
        const sequence = 1;
        const is_active = true;
        const fakeUrl = 'https://fakeurl.com/fakeimage.jpg';

        const mockUuid = 'random-uuid-v4';
        uuid.v4.mockReturnValue(mockUuid);

        const mockCreateImage = {
            image_id: mockUuid,
            product_id: product_id,
            sequence: sequence,
            url: fakeUrl,
            is_active: true,
            created_at: new Date()
        };

        productRepository.findOneById.mockResolvedValue({ id: product_id });
        imagekitHelper.uploadToImageKit.mockResolvedValue({ url: fakeUrl });
        imageRepository.createImage.mockResolvedValue(mockCreateImage);

        const createImageResult = await imageService.uploadToImageKit(file, product_id, sequence, is_active);

        expect(createImageResult).toEqual({ image_url: fakeUrl });
        expect(productRepository.findOneById).toHaveBeenCalledWith(product_id);
        expect(productRepository.findOneById).toHaveBeenCalledTimes(1);
        expect(imagekitHelper.uploadToImageKit).toHaveBeenCalledTimes(1);
        expect(imageRepository.createImage).toHaveBeenCalledTimes(1);
    })
});

it('should throw error when uploading a product, product not found', async () => {
    const file = { buffer: Buffer.from('fake-image-data'), originalname: 'test-image.jpg' };
    const product_id = 'test-product-id';
    const sequence = 1;
    const is_active = true;
    const fakeUrl = 'https://fakeurl.com/fakeimage.jpg';

    const mockUuid = 'random-uuid-v4';
    uuid.v4.mockReturnValue(mockUuid);

    const mockCreateImage = {
        image_id: mockUuid,
        product_id: product_id,
        sequence: sequence,
        url: fakeUrl,
        is_active: true,
        created_at: new Date()
    };

    productRepository.findOneById.mockResolvedValue(null);
    imagekitHelper.uploadToImageKit.mockResolvedValue({ url: fakeUrl });
    imageRepository.createImage.mockResolvedValue(mockCreateImage);

    await expect(imageService.uploadToImageKit(file, product_id, sequence, is_active)).rejects.toThrow('Product not found')

    expect(productRepository.findOneById).toHaveBeenCalledWith(product_id);
    expect(productRepository.findOneById).toHaveBeenCalledTimes(2);
});
  
