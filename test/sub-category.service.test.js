const subCategoryService = require('../src/service/sub-category.service');
const subCategoryRepository = require('../src/repository/sub-category.repository');
const { validate } = require('../src/helper/validation.helper');
const { ResponseError } = require('../src/error/response-error');
const { capitalizeEachFirstWord } = require('../src/helper/capitalize.helper');
const { v4: uuidv4 } = require('uuid');
const { checkCategoryMustExist } = require('../src/service/category.service');

jest.mock('../src/repository/sub-category.repository');
jest.mock('../src/helper/validation.helper');
jest.mock('../src/helper/capitalize.helper');
jest.mock('uuid');
jest.mock('../src/service/category.service');

describe('SubCategory Service', () => {
    
    describe('create', () => {
        it('should create a sub-category successfully', async () => {
            const request = { name: 'new sub category' };
            const categoryId = 'category1';
            const validatedCategoryId = 'category1';
            const validatedRequest = { name: 'New Sub Category' };
            const uuid = 'unique-id';
            const subCategory = {
                id: uuid,
                name: 'New Sub Category',
                category_id: validatedCategoryId,
                is_active: true,
                created_at: expect.any(Number)
            };

            validate.mockImplementation((schema, value) => value);
            capitalizeEachFirstWord.mockReturnValue('New Sub Category');
            uuidv4.mockReturnValue(uuid);
            checkCategoryMustExist.mockResolvedValue(validatedCategoryId);
            subCategoryRepository.findOneByNameAndCategoryId.mockResolvedValue(null);
            subCategoryRepository.create.mockResolvedValue(subCategory);

            const result = await subCategoryService.create(request, categoryId);

            expect(validate).toHaveBeenCalledWith(expect.anything(), categoryId);
            expect(validate).toHaveBeenCalledWith(expect.anything(), request);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validatedCategoryId);
            expect(uuidv4).toHaveBeenCalled();
            expect(subCategoryRepository.findOneByNameAndCategoryId).toHaveBeenCalledWith('New Sub Category', validatedCategoryId);
            expect(subCategoryRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                id: uuid,
                name: 'New Sub Category',
                category_id: validatedCategoryId,
                is_active: true,
                created_at: expect.any(Number)
            }));
            expect(result).toEqual(subCategory);
        });

        it('should throw an error if sub-category already exists', async () => {
            const request = { name: 'existing sub category' };
            const categoryId = 'category1';
            const validatedCategoryId = 'category1';
            const validatedRequest = { name: 'Existing Sub Category' };

            validate.mockImplementation((schema, value) => value);
            capitalizeEachFirstWord.mockReturnValue('Existing Sub Category');
            checkCategoryMustExist.mockResolvedValue(validatedCategoryId);
            subCategoryRepository.findOneByNameAndCategoryId.mockResolvedValue(validatedRequest);

            await expect(subCategoryService.create(request, categoryId)).rejects.toThrow(ResponseError);

            expect(validate).toHaveBeenCalledWith(expect.anything(), categoryId);
            expect(validate).toHaveBeenCalledWith(expect.anything(), request);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validatedCategoryId);
            expect(subCategoryRepository.findOneByNameAndCategoryId).toHaveBeenCalledWith('Existing Sub Category', validatedCategoryId);
        });
    });

    describe('list', () => {
        it('should return a list of sub-categories', async () => {
            const categoryId = 'category1';
            const validatedCategoryId = 'category1';
            const subCategories = [{ id: '1', name: 'Sub Category 1' }];

            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockResolvedValue(validatedCategoryId);
            subCategoryRepository.findAllByCategoryId.mockResolvedValue(subCategories);

            const result = await subCategoryService.list(categoryId);

            expect(validate).toHaveBeenCalledWith(expect.anything(), categoryId);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validatedCategoryId);
            expect(subCategoryRepository.findAllByCategoryId).toHaveBeenCalledWith(validatedCategoryId);
            expect(result).toEqual(subCategories);
        });
    });

    describe('remove', () => {
        it('should remove a sub-category successfully', async () => {
            const categoryId = 'category1';
            const subCategoryId = 'subcategory1';
            const validatedCategoryId = 'category1';
            const validatedSubCategoryId = 'subcategory1';
            const subCategory = { id: '1', name: 'Sub Category 1', is_active: true, save: jest.fn() };

            validate.mockImplementation((schema, value) => value);
            subCategoryRepository.findOneByCategoryIdAndSubCategoryId.mockResolvedValue(subCategory);

            await subCategoryService.remove(categoryId, subCategoryId);

            expect(validate).toHaveBeenCalledWith(expect.anything(), categoryId);
            expect(validate).toHaveBeenCalledWith(expect.anything(), subCategoryId);
            expect(subCategoryRepository.findOneByCategoryIdAndSubCategoryId).toHaveBeenCalledWith(validatedCategoryId, validatedSubCategoryId);
            expect(subCategory.is_active).toBe(false);
            expect(subCategory.updated_at).toBeDefined();
            expect(subCategory.save).toHaveBeenCalled();
        });

        it('should throw an error if sub-category not found', async () => {
            const categoryId = 'category1';
            const subCategoryId = 'subcategory1';

            validate.mockImplementation((schema, value) => value);
            subCategoryRepository.findOneByCategoryIdAndSubCategoryId.mockResolvedValue(null);

            await expect(subCategoryService.remove(categoryId, subCategoryId)).rejects.toThrow(ResponseError);

            expect(validate).toHaveBeenCalledWith(expect.anything(), categoryId);
            expect(validate).toHaveBeenCalledWith(expect.anything(), subCategoryId);
            expect(subCategoryRepository.findOneByCategoryIdAndSubCategoryId).toHaveBeenCalledWith(categoryId, subCategoryId);
        });
    });

    describe('checkSubCategoryMustExist', () => {
        it('should return the sub-category ID if sub-category exists', async () => {
            const categoryId = 'category1';
            const subCategoryId = 'subcategory1';
            const subCategory = { id: '1' };

            subCategoryRepository.findOneByCategoryIdAndSubCategoryId.mockResolvedValue(subCategory);

            const result = await subCategoryService.checkSubCategoryMustExist(categoryId, subCategoryId);

            expect(subCategoryRepository.findOneByCategoryIdAndSubCategoryId).toHaveBeenCalledWith(categoryId, subCategoryId);
            expect(result).toBe('1');
        });

        it('should throw an error if sub-category not found', async () => {
            const categoryId = 'category1';
            const subCategoryId = 'subcategory1';

            subCategoryRepository.findOneByCategoryIdAndSubCategoryId.mockResolvedValue(null);

            await expect(subCategoryService.checkSubCategoryMustExist(categoryId, subCategoryId)).rejects.toThrow(ResponseError);

            expect(subCategoryRepository.findOneByCategoryIdAndSubCategoryId).toHaveBeenCalledWith(categoryId, subCategoryId);
        });
    });
});