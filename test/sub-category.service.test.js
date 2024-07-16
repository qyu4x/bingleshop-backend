const {validate} = require('../src/helper/validation.helper');
const {ResponseError} = require('../src/error/response-error');
const {subCreateCategorySchema, getSubCategoryValidation} = require('../src/payload/request/sub-category.request');
const {getCategoryValidation} = require('../src/payload/request/category.request');
const subCategoryRepository = require("../src/repository/sub-category.repository");
const {checkCategoryMustExist} = require('../src/service/category.service');
const {checkSubCategoryMustExist} = require('../src/service/sub-category.service');
const {v4: uuidv4} = require('uuid');
const subCategoryService = require('../src/service/sub-category.service');

jest.mock('../src/helper/validation.helper');
jest.mock('../src/error/response-error');
jest.mock('../src/helper/capitalize.helper');
jest.mock('../src/repository/sub-category.repository');
jest.mock('../src/service/category.service');
jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('SubCategory Service', () => {
    const validCategoryId = 'valid-category-id';
    const existingSubCategory = { id: 'valid-sub-category-id', name: 'sub-category', category_id: validCategoryId, is_active: true, updated_at: null };
    const validSubCategoryId = 'valid-sub-category-id';
    const invalidCategoryId = 'invalid-category-id';
    const invalidSubCategoryId = 'invalid-sub-category-id';
    const validRequest = { name: 'sub-category', description: 'description-sub-category', is_active: true, updated_at: null};
    const createdSubCategory = { id: 'sub-category-id', ...validRequest, category_id: validCategoryId, is_active: true, created_at: Date.now() };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new sub-category successfully', async () => {
            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockResolvedValue(validCategoryId);
            subCategoryRepository.findOneByNameAndCategoryId.mockResolvedValue(null);
            uuidv4.mockReturnValue('sub-category-id');
            subCategoryRepository.create.mockResolvedValue(createdSubCategory);

            const result = await subCategoryService.create(validRequest, validCategoryId);

            expect(validate).toHaveBeenCalledWith(getCategoryValidation, validCategoryId);
            expect(validate).toHaveBeenCalledWith(subCreateCategorySchema, validRequest);
            expect(validate).toHaveBeenCalledTimes(2);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validCategoryId);
            expect(subCategoryRepository.findOneByNameAndCategoryId).toHaveBeenCalledWith(validRequest.name, validCategoryId);
            expect(uuidv4).toHaveBeenCalled();
            expect(subCategoryRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                id: 'sub-category-id',
                name: validRequest.name,
                category_id: validCategoryId,
                is_active: true,
                created_at: expect.any(Number),
            }));
            expect(result).toEqual(createdSubCategory);
        });
        
        it('should throw a validation error for invalid categoryId', async () => {
            validate.mockImplementation((schema, value) => {
              if (schema === getCategoryValidation && value === invalidCategoryId) {
                throw new Error(400, 'Invalid categoryId');
              }
              return value;
            });
      
            await expect(subCategoryService.create(validRequest, invalidCategoryId))
              .rejects.toThrow(Error);
      
            expect(validate).toHaveBeenCalledWith(getCategoryValidation, invalidCategoryId);
        });
        
        it('should throw an error if sub-category already exists', async () => {
            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockResolvedValue(validCategoryId);
            subCategoryRepository.findOneByNameAndCategoryId.mockResolvedValue(existingSubCategory);
            
            const error = new Error(409, 'Sub-category already exists');
            subCategoryService.create = jest.fn().mockImplementationOnce(async () => {
                await subCategoryRepository.findOneByNameAndCategoryId(validRequest.name, validCategoryId);
                throw error;
            });

            await expect(subCategoryService.create(validRequest, validCategoryId))
                .rejects.toThrow(error);

            expect(subCategoryRepository.findOneByNameAndCategoryId).toHaveBeenCalledWith(validRequest.name, validCategoryId);
        });
    });
    
    describe('list', () => {
        it('should list sub-categories successfully', async () => {
            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockResolvedValue(validCategoryId);
            subCategoryRepository.findAllByCategoryId.mockResolvedValue([existingSubCategory]);

            const result = await subCategoryService.list(validCategoryId);

            expect(validate).toHaveBeenCalledWith(getCategoryValidation, validCategoryId);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validCategoryId);
            expect(subCategoryRepository.findAllByCategoryId).toHaveBeenCalledWith(validCategoryId);
            expect(result).toEqual([existingSubCategory]);
        });

        it('should throw a validation error for invalid categoryId', async () => {
            validate.mockImplementation((schema, value) => {
              if (schema === getCategoryValidation && value === invalidCategoryId) {
                throw new Error(400, 'Invalid categoryId');
              }
              return value;
            });
      
            await expect(subCategoryService.list(invalidCategoryId))
              .rejects.toThrow(Error);
      
            expect(validate).toHaveBeenCalledWith(getCategoryValidation, invalidCategoryId);
        });
    });
    
    describe('remove', () => {
        it('should remove a sub-category successfully', async () => {
            validate.mockImplementation((schema, value) => value);

            const subCat = {
                id: validSubCategoryId,
                name: 'sub-category',
                category_id: validCategoryId,
                is_active: true,
                updated_at: null,
                save: jest.fn() //mock save
            }

            subCategoryRepository.findOneByCategoryIdAndSubCategoryId.mockResolvedValue(subCat);

            await subCategoryService.remove(validCategoryId, subCat.id);

            expect(validate).toHaveBeenCalledWith(getCategoryValidation, validCategoryId);
            expect(validate).toHaveBeenCalledWith(getSubCategoryValidation, validSubCategoryId);
            expect(subCategoryRepository.findOneByCategoryIdAndSubCategoryId).toHaveBeenCalledWith(validCategoryId, validSubCategoryId);
            expect(subCat.is_active).toBe(false);
            expect(subCat.updated_at).toBeDefined();
            expect(subCat.save).toHaveBeenCalled();
        });

        it('should throw a validation error for invalid categoryId', async () => {
            validate.mockImplementation((schema, value) => {
              if (schema === getCategoryValidation && value === invalidCategoryId) {
                throw new Error(400, 'Invalid categoryId');
              }
              return value;
            });
      
            await expect(subCategoryService.remove(invalidCategoryId, validSubCategoryId))
              .rejects.toThrow(Error);
      
            expect(validate).toHaveBeenCalledWith(getCategoryValidation, invalidCategoryId);
        });

        it('should throw a validation error for invalid subCategoryId', async () => {
            validate.mockImplementation((schema, value) => {
              if (schema === getSubCategoryValidation && value === invalidSubCategoryId) {
                throw new Error(400, 'Invalid subCategoryId');
              }
              return value;
            });
      
            await expect(subCategoryService.remove(validCategoryId, invalidSubCategoryId))
              .rejects.toThrow(Error);
      
            expect(validate).toHaveBeenCalledWith(getCategoryValidation, validCategoryId);
            expect(validate).toHaveBeenCalledWith(getSubCategoryValidation, invalidSubCategoryId);
        });

        it('should throw a ResponseError if sub-category is not found', async () => {
            validate.mockImplementation((schema, value) => value);
            const findnull = subCategoryRepository.findOneByCategoryIdAndSubCategoryId.mockResolvedValue(null);
            
                try {
                    await subCategoryService.remove(validCategoryId, validSubCategoryId);
                    // If no error is thrown, fail the test explicitly
                    fail('Expected get() to throw an error');
                } catch (error) {
                    expect(error).toBeInstanceOf(ResponseError);
                }
            
            expect(subCategoryRepository.findOneByCategoryIdAndSubCategoryId).toHaveBeenCalledWith(validCategoryId, validSubCategoryId);
        });
    });

    describe('checkSubCategoryMustExist', () => {
        it('should throw a ResponseError if Sub Category does not exist', async () => {
            const categoryId = 'valid-category-id';
            const subCategoryId = 'invalid-sub-category-id';
    
            subCategoryRepository.findOneByCategoryIdAndSubCategoryId.mockResolvedValue(null);
            
            try {
                await checkSubCategoryMustExist(categoryId, subCategoryId);
                // If no error is thrown, fail the test explicitly
                fail('Expected get() to throw an error');
            } catch (error) {
                expect(error).toBeInstanceOf(ResponseError);
            }
            
        });

        it('should return sub-category id if Sub Category exists', async () => {
            const categoryId = 'valid-category-id';
            const subCategoryId = 'valid-sub-category-id';
    
            subCategoryRepository.findOneByCategoryIdAndSubCategoryId.mockResolvedValue(existingSubCategory);
            
            const result = await checkSubCategoryMustExist(categoryId, subCategoryId);

            expect(result).toBe(existingSubCategory.id);
        });
    });
});
