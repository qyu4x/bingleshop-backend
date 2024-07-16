const imageRepository = require('../src/repository/image.repository');
const imageService = require('../src/service/image.service');
const uuid = require('uuid');

jest.mock('../src/repository/image.repository');
jest.mock('../src/service/image.service');
jest.mock('uuid');

describe('create image', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should upload image', async () => {

        const mockRequest = {
            file: {
              originalname: 'mockedFileName.jpg',
              buffer: Buffer.from('mocked file content')
            },
            body: {
              product_id: '4ba73446-3bc7-452c-8a82-bc2d3fc8b90b',
              sequence: 1,
              is_active: 'true' 
            }
          };
    
        const mockCreateImage = {
            product_id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            sequence: 1,
            url: "https://example.com/image.jpg",
            is_active: true,
            created_at: new Date()
        };

          imageRepository.createImage.mockResolvedValue(mockCreateImage);
         

          const createImageResult = await imageService.createImage(mockRequest);

          expect(createImageResult).toEqual(mockCreateImage);
          expect(imageRepository.createImage).toHaveBeenCalledTimes(1);


        })
    });

    it('should throw error when uploading a product with an existing ID', async () => {
      const mockUuid = 'random-uuid-v4';
      uuid.v4.mockReturnValue(mockUuid);

      const mockExistingProductId = '4ba73446-3bc7-452c-8a82-bc2d3fc8b90b';
      const mockExistingProduct = {
              id : '4ba73446-3bc7-452c-8a82-bc2d3fc8b90b',
              is_active: true
      };

      imageRepository.findOneById.mockResolvedValue(mockExistingProduct);
      await expect(imageService.createImage({ body: { product_id: mockExistingProductId } }))
      .rejects.toThrow('Product ID already exists');
      expect(imageRepository.findOneById).toHaveBeenCalledTimes(1);
    
      
  });
  
