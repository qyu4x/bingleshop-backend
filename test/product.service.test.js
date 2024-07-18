const { validate } = require('../src/helper/validation.helper');
const { ResponseError } = require('../src/error/response-error');
const {
    getProductValidation,
    createProductValidation,
    searchProductValidation,
    updateProductValidation,
    updateStockProductValidation,
} = require('../src/payload/request/product.request');
const {
    getCategoryValidation
} = require('../src/payload/request/category.request');
const {
    getSubCategoryValidation
} = require('../src/payload/request/sub-category.request');
const productService = require('../src/service/product.service')
const { checkCategoryMustExist } = require('../src/service/category.service');
const { checkSubCategoryMustExist } = require('../src/service/sub-category.service');
const { formatCurrency } = require('../src/helper/i18n-currency.helper');
const { v4: uuidv4 } = require('uuid');
const productRepository = require('../src/repository/product.repository');
const { Products } = require('../src/model');

jest.mock('../src/helper/validation.helper');
jest.mock('../src/error/response-error');
jest.mock('../src/service/category.service');
jest.mock('../src/service/sub-category.service');
jest.mock('../src/repository/product.repository');
jest.mock('uuid', () => ({ v4: jest.fn() }));

describe('Product Service', () => {
    const validCategoryId = 'valid-category-id';
    const validSubCategoryId = 'valid-sub-category-id';
    const validProductId = 'valid-product-id';
    const invalidProductId = 'invalid-product-id';
    const validRequest = {
        title: 'product-title',
        stock: 10,
        price: 10000,
        is_preorder: false,
        description: 'product-description',
    };
    const createdProduct = {
        id: 'product-id',
        ...validRequest,
        category_id: validCategoryId,
        sub_category_id: validSubCategoryId,
        is_active: true,
        created_at: Date.now(),
    };
    const mockProductImages = [
        { id: 'image-id-1', url: 'https://example.com/image1.jpg', sequence: 1 },
        { id: 'image-id-2', url: 'https://example.com/image2.jpg', sequence: 2 },
    ];
    const productResponse = {
        ...createdProduct,
        category: { id: validCategoryId, name: 'category-name', description: 'category-description' },
        sub_category: { id: validSubCategoryId, name: 'sub-category-name', description: 'sub-category-description' },
        product_images: mockProductImages,
    };
    const productListResponse = [productResponse];

    

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new product successfully', async () => {
            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockResolvedValue(validCategoryId);
            checkSubCategoryMustExist.mockResolvedValue(validSubCategoryId);
            uuidv4.mockReturnValue('product-id');
            productRepository.create.mockResolvedValue(createdProduct);
            productRepository.findByIdWithCategoryAndSubCategory.mockResolvedValue(productResponse);

            const result = await productService.create(validRequest, validCategoryId, validSubCategoryId);

            expect(validate).toHaveBeenCalledWith(getCategoryValidation, validCategoryId);
            expect(validate).toHaveBeenCalledWith(getSubCategoryValidation, validSubCategoryId);
            expect(validate).toHaveBeenCalledWith(createProductValidation, validRequest);
            expect(validate).toHaveBeenCalledTimes(3);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validCategoryId);
            expect(checkSubCategoryMustExist).toHaveBeenCalledWith(validCategoryId, validSubCategoryId);
            expect(uuidv4).toHaveBeenCalled();
            expect(productRepository.create).toHaveBeenCalledWith(expect.objectContaining({
                id: 'product-id',
                title: validRequest.title,
                category_id: validCategoryId,
                sub_category_id: validSubCategoryId,
                is_active: true,
                created_at: expect.any(Number),
            }));
        });

        it('should throw an error for invalid Category ID', async () => {
            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockRejectedValue(new ResponseError(404, 'Category not found'));
            
            try {
                await productService.create(validRequest, 'invalid-category-id', validSubCategoryId);
                // If no error is thrown, fail the test explicitly
                fail('Expected get() to throw an error');
            } catch (error) {
                expect(error).toBeInstanceOf(ResponseError);
            }
    
            expect(validate).toHaveBeenCalledWith(getCategoryValidation, 'invalid-category-id');
            expect(validate).toHaveBeenCalledWith(getSubCategoryValidation, validSubCategoryId);
            expect(validate).toHaveBeenCalledTimes(2);
            expect(checkCategoryMustExist).toHaveBeenCalledWith('invalid-category-id');
            expect(checkSubCategoryMustExist).not.toHaveBeenCalled();
            expect(uuidv4).not.toHaveBeenCalled();
            expect(productRepository.create).not.toHaveBeenCalled();
        });

        it('should throw an error for invalid Sub-Category ID', async () => {
            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockResolvedValue(validCategoryId);
            checkSubCategoryMustExist.mockRejectedValue(new ResponseError(404, 'Sub category not found'));
    
            try {
                await productService.create(validRequest, validCategoryId, 'invalid-sub-category-id');
                // If no error is thrown, fail the test explicitly
                fail('Expected create() to throw an error');
            } catch (error) {
                expect(error).toBeInstanceOf(ResponseError);
            }
    
            expect(validate).toHaveBeenCalledWith(getCategoryValidation, validCategoryId);
            expect(validate).toHaveBeenCalledWith(getSubCategoryValidation, 'invalid-sub-category-id');
            expect(validate).toHaveBeenCalledTimes(2);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validCategoryId);
            expect(checkSubCategoryMustExist).toHaveBeenCalledWith(validCategoryId, 'invalid-sub-category-id');
            expect(uuidv4).not.toHaveBeenCalled();
            expect(productRepository.create).not.toHaveBeenCalled();
        });
    
        // Edge case: Invalid Product Request
        it('should throw an error for invalid Product Request', async () => {
            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockResolvedValue(validCategoryId);
            checkSubCategoryMustExist.mockResolvedValue(validSubCategoryId);
            const invalidRequest = { ...validRequest, price: 'invalid-price' };
    
            try {
                await productService.create(invalidRequest, validCategoryId, validSubCategoryId);
                // If no error is thrown, fail the test explicitly
                fail('Expected create() to throw an error');
            } catch (error) {
                expect(error).toBeInstanceOf(Error); 
            }
    
            expect(validate).toHaveBeenCalledWith(getCategoryValidation, validCategoryId);
            expect(validate).toHaveBeenCalledWith(getSubCategoryValidation, validSubCategoryId);
            expect(validate).toHaveBeenCalledWith(createProductValidation, invalidRequest);
            expect(validate).toHaveBeenCalledTimes(3);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validCategoryId);
            expect(checkSubCategoryMustExist).toHaveBeenCalledWith(validCategoryId, validSubCategoryId);
        });
    });

    describe('get', () => {
        it('should get a product successfully', async () => {
            validate.mockImplementation((schema, value) => value);
            productRepository.findByIdWithCategoryAndSubCategory.mockResolvedValue(productResponse);

            const result = await productService.get(validProductId);

            expect(validate).toHaveBeenCalledWith(getProductValidation, validProductId);
            expect(productRepository.findByIdWithCategoryAndSubCategory).toHaveBeenCalledWith(validProductId);
            expect(result).toEqual({
                id: productResponse.id,
                title: productResponse.title,
                stock: productResponse.stock,
                price: {
                    amount: productResponse.price,
                    currency: formatCurrency(productResponse.price, 'id-ID', 'IDR', 'code'),
                    display: formatCurrency(productResponse.price, 'id-ID', 'IDR', 'symbol')
                },
                category: {
                    id: productResponse.category.id,
                    name: productResponse.category.name,
                    description: productResponse.category.description
                },
                sub_category: {
                    id: productResponse.sub_category.id,
                    name: productResponse.sub_category.name,
                    description: productResponse.sub_category.description
                },
                is_preorder: productResponse.is_preorder,
                description: productResponse.description,
                is_active: productResponse.is_active,
                images: productResponse.product_images,
                created_at: productResponse.created_at,
                updated_at: productResponse.updated_at
            });
        });

        it('should throw a ResponseError if product is not found', async () => {
            validate.mockImplementation((schema, value) => value);
            productRepository.findByIdWithCategoryAndSubCategory.mockResolvedValue(null);

            try {
                await productService.get(validProductId);
                // If no error is thrown, fail the test explicitly
                fail('Expected get() to throw an error');
            } catch (error) {
                expect(error).toBeInstanceOf(ResponseError);
            }

            expect(validate).toHaveBeenCalledWith(getProductValidation, validProductId);
            expect(productRepository.findByIdWithCategoryAndSubCategory).toHaveBeenCalledWith(validProductId);
        });
    });

    describe('search', () => {
        it('should search products successfully', async () => {
            const searchRequest = { title: 'product-title', categoryId: validCategoryId, subCategoryId: validSubCategoryId, page: 1, size: 10 };
            validate.mockImplementation((schema, value) => value);
            productRepository.searchByFiltersAndPagination.mockResolvedValue(productListResponse);
            productRepository.findTotalByFilters.mockResolvedValue(1);

            const result = await productService.search(searchRequest);

            expect(validate).toHaveBeenCalledWith(searchProductValidation, searchRequest);
            expect(productRepository.searchByFiltersAndPagination).toHaveBeenCalledWith(expect.any(Object), 0, searchRequest.size);
            expect(productRepository.findTotalByFilters).toHaveBeenCalledWith(expect.any(Object));
            expect(result).toEqual({
                data: [
                    {
                        id: productResponse.id,
                        title: productResponse.title,
                        stock: productResponse.stock,
                        price: {
                            amount: productResponse.price,
                            currency: formatCurrency(productResponse.price, 'id-ID', 'IDR', 'code'),
                            display: formatCurrency(productResponse.price, 'id-ID', 'IDR', 'symbol')
                        },
                        category: {
                            id: productResponse.category.id,
                            name: productResponse.category.name,
                            description: productResponse.category.description
                        },
                        sub_category: {
                            id: productResponse.sub_category.id,
                            name: productResponse.sub_category.name,
                            description: productResponse.sub_category.description
                        },
                        is_preorder: productResponse.is_preorder,
                        description: productResponse.description,
                        is_active: productResponse.is_active,
                        images: productResponse.product_images,
                        created_at: productResponse.created_at,
                        updated_at: productResponse.updated_at
                    }
                ],
                pagination: {
                    current_page: searchRequest.page,
                    total_item: 1,
                    total_page: 0 // Adjust as per actual calculation
                }
            });
        });

        it('should return empty data array if no products match search criteria', async () => {
            const searchRequest = { title: 'non-existent-product', categoryId: 'non-existent-category-id', subCategoryId: 'non-existent-sub-category-id', page: 1, size: 10 };
            validate.mockImplementation((schema, value) => value);
            productRepository.searchByFiltersAndPagination.mockResolvedValue([]);
            productRepository.findTotalByFilters.mockResolvedValue(0);
    
            const result = await productService.search(searchRequest);
    
            expect(validate).toHaveBeenCalledWith(searchProductValidation, searchRequest);
            expect(productRepository.searchByFiltersAndPagination).toHaveBeenCalledWith(expect.any(Object), 0, searchRequest.size);
            expect(productRepository.findTotalByFilters).toHaveBeenCalledWith(expect.any(Object));
            expect(result).toEqual({
                data: [],
                pagination: {
                    current_page: searchRequest.page,
                    total_item: 0,
                    total_page: 0,
                }
            });
        });
    

    });

    describe('update', () => {
        it('should update a product successfully', async () => {
            const updateRequest = { ...validRequest, category_id: validCategoryId, sub_category_id: validSubCategoryId };
            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockResolvedValue(validCategoryId);
            checkSubCategoryMustExist.mockResolvedValue(validSubCategoryId);
            const availableProduct = { ...createdProduct, save: jest.fn() };
            productRepository.findOneById.mockResolvedValue(availableProduct);

            await productService.update(updateRequest, validProductId);

            expect(validate).toHaveBeenCalledWith(updateProductValidation, updateRequest);
            expect(validate).toHaveBeenCalledWith(getProductValidation, validProductId);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validCategoryId);
            expect(checkSubCategoryMustExist).toHaveBeenCalledWith(validCategoryId, validSubCategoryId);
            expect(productRepository.findOneById).toHaveBeenCalledWith(validProductId);
            expect(availableProduct.save).toHaveBeenCalled();
            expect(availableProduct.title).toBe(updateRequest.title);
            expect(availableProduct.price).toBe(updateRequest.price);
            expect(availableProduct.stock).toBe(updateRequest.stock);
            expect(availableProduct.is_preorder).toBe(updateRequest.is_preorder);
            expect(availableProduct.description).toBe(updateRequest.description);
            expect(availableProduct.updated_at).toBeDefined();
        });

        it('should throw a ResponseError if product is not found', async () => {
            const updateRequest = { ...validRequest, category_id: validCategoryId, sub_category_id: validSubCategoryId };
            validate.mockImplementation((schema, value) => value);
            checkCategoryMustExist.mockResolvedValue(validCategoryId);
            checkSubCategoryMustExist.mockResolvedValue(validSubCategoryId);
            productRepository.findOneById.mockResolvedValue(null);

            try {
                await productService.update(updateRequest, validProductId);
                // If no error is thrown, fail the test explicitly
                fail('Expected get() to throw an error');
            } catch (error) {
                expect(error).toBeInstanceOf(ResponseError);
            }

            expect(validate).toHaveBeenCalledWith(updateProductValidation, updateRequest);
            expect(validate).toHaveBeenCalledWith(getProductValidation, validProductId);
            expect(checkCategoryMustExist).toHaveBeenCalledWith(validCategoryId);
            expect(checkSubCategoryMustExist).toHaveBeenCalledWith(validCategoryId, validSubCategoryId);
            expect(productRepository.findOneById).toHaveBeenCalledWith(validProductId);
        });
    });

    describe('remove', () => {
        it('should remove a product successfully', async () => {
            validate.mockImplementation((schema, value) => value);
            const availableProduct = { ...createdProduct, save: jest.fn() };
            productRepository.findOneById.mockResolvedValue(availableProduct);

            await productService.remove(validProductId);

            expect(validate).toHaveBeenCalledWith(getProductValidation, validProductId);
            expect(productRepository.findOneById).toHaveBeenCalledWith(validProductId);
            expect(availableProduct.is_active).toBe(false);
            expect(availableProduct.updated_at).toBeDefined();
            expect(availableProduct.save).toHaveBeenCalled();
        });

        it('should throw a ResponseError if product is not found', async () => {
            validate.mockImplementation((schema, value) => value);
            productRepository.findOneById.mockResolvedValue(null);

            try {
                await productService.remove(validProductId);
                // If no error is thrown, fail the test explicitly
                fail('Expected get() to throw an error');
            } catch (error) {
                expect(error).toBeInstanceOf(ResponseError);
            }

            expect(validate).toHaveBeenCalledWith(getProductValidation, validProductId);
            expect(productRepository.findOneById).toHaveBeenCalledWith(validProductId);
        });
    });

    describe('updateStock', () => {
        it('should update the stock of a product successfully', async () => {
            const sold = 2;
            validate.mockImplementation((schema, value) => value);
            const availableProduct = { ...createdProduct, save: jest.fn() };
            productRepository.findOneById.mockResolvedValue(availableProduct);

            await productService.updateStock(validProductId, sold);

            expect(validate).toHaveBeenCalledWith(updateStockProductValidation, sold);
            expect(productRepository.findOneById).toHaveBeenCalledWith(validProductId);
            expect(availableProduct.stock).toBe(createdProduct.stock - sold);
            expect(availableProduct.save).toHaveBeenCalled();
        });
    });
});
