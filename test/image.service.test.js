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

    it('should upload image and create image', async () => {

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

          const mockUuid = 'random-uuid-v4';

        const mockCreateImage = {
            product_id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            sequence: 1,
            url: "https://example.com/image.jpg",
            is_active: true,
            created_at: new Date()
        };

          uuid.v4.mockReturnValue(mockUuid);
          imageRepository.createImage.mockResolvedValue(imageObject);
          imageRepository.findOneById.mockResolvedValue(foundImage);

          const createImageResult = await imageService.createImage(mockRequest);

          expect(createImageResult).toEqual(mockCreateImage);
          expect(imageRepository.createImage).toHaveBeenCalledTimes(1);
          expect(imageRepository.findOneById).toHaveBeenCalledTimes(1);

        })
    });
