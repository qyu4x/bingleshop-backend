const orderDetailRepository = require('../src/repository/order-detail.repository');
const logisticRepository = require('../src/repository/logistic.repository');
const productRepository = require('../src/repository/product.repository');
const orderRepository = require('../src/repository/order.repository');
const paymentMethodRepository = require('../src/repository/payment-method.repository');

const productService = require('../src/service/product.service');
const orderService = require('../src/service/order.service');
const orderDetailService = require('../src/service/order-detail.service');

const orderStatus = require("../src/helper/order-status.helper");
const orderHelper = require('../src/helper/order.helper');
const {ResponseError} = require("../src/error/response-error");

jest.mock('../src/repository/order-detail.repository');
jest.mock('../src/repository/order.repository');
jest.mock('../src/repository/logistic.repository');
jest.mock('../src/repository/product.repository');
jest.mock('../src/repository/order.repository');
jest.mock('../src/repository/payment-method.repository');

jest.mock('../src/service/product.service');
jest.mock('../src/service/order-detail.service');

jest.mock('../src/helper/order.helper');
jest.mock('uuid');

describe('create', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create new order', async () => {
        const orderRequest = {
            payment_method_id : "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            total_price : 1002400,
            note : "test nyaaawww",
            order_details : [
                {
                    product_id : "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                },
                {
                    product_id : "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                }
            ]
        };

        const mockPaymentResult = {
            id: "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            name: "BCA",
            payment_fees: 2000,
            logo_url: "https://uwupedia.com/dana.png",
            is_active: true,
        }

        const mockLogisticResult = {
            id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            name: "TIKI",
            payment_fees_permile: 200,
            logo_url: "https://uwu.png",
            is_active: true
        }

        const mockProductResult = {
            id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            stock: 99,
            price: 500000,
            title: 'Manga One Room Volume 2'
        }

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expiress_at: 29038193829,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            }
        }

        const expectedResult = {
            ...mockOrderResult,
            hateos: {
                name: 'OrderDetails',
                uri: `http://localhost:8080/api/v1/orders/${mockOrderResult.id}/order-details`,
                method: 'GET'
            }
        }

        paymentMethodRepository.findOneById.mockResolvedValue(mockPaymentResult);
        logisticRepository.findOneById.mockResolvedValue(mockLogisticResult);
        productRepository.findOneById.mockResolvedValue(mockProductResult);
        orderRepository.create.mockResolvedValue(mockOrderResult);

        orderHelper.generateOrderId.mockReturnValue('PYO-1715945334-98450');
        orderHelper.generatePaymentCode.mockReturnValue('97-21820-84');

        orderDetailService.create.mockResolvedValue('order detail created');
        orderRepository.findWithUserAndPaymentMethodById.mockResolvedValue(mockOrderResult);

        const orderResult = await orderService.create(orderRequest, {id: 'random-user-id'})
        expect(orderResult.id).toBe(expectedResult.id);
        expect(orderResult.payment_code).toBe(expectedResult.payment_code);
        expect(orderResult.user).toEqual(expectedResult.user);

        expect(logisticRepository.findOneById).toHaveReturnedTimes(2);
        expect(productRepository.findOneById).toHaveReturnedTimes(4);
        expect(paymentMethodRepository.findOneById).toHaveReturnedTimes(1);
        expect(productRepository.findOneById).toHaveReturnedTimes(4);
        expect(orderRepository.create).toHaveReturnedTimes(1);
        expect(orderDetailService.create).toHaveReturnedTimes(1);
        expect(orderRepository.findWithUserAndPaymentMethodById).toHaveReturnedTimes(1);
    }, 30000);

    it('should not create new order because failed create order details', async () => {
        const orderRequest = {
            payment_method_id : "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            total_price : 1002400,
            note : "test nyaaawww",
            order_details : [
                {
                    product_id : "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                },
                {
                    product_id : "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                }
            ]
        };

        const mockPaymentResult = {
            id: "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            name: "BCA",
            payment_fees: 2000,
            logo_url: "https://uwupedia.com/dana.png",
            is_active: true,
        }

        const mockLogisticResult = {
            id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            name: "TIKI",
            payment_fees_permile: 200,
            logo_url: "https://uwu.png",
            is_active: true
        }

        const mockProductResult = {
            id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            stock: 99,
            price: 500000,
            title: 'Manga One Room Volume 2'
        }

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expiress_at: 29038193829,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            }
        }

        paymentMethodRepository.findOneById.mockResolvedValue(mockPaymentResult);
        logisticRepository.findOneById.mockResolvedValue(mockLogisticResult);
        productRepository.findOneById.mockResolvedValue(mockProductResult);
        orderRepository.create.mockResolvedValue(mockOrderResult);

        orderHelper.generateOrderId.mockReturnValue('PYO-1715945334-98450');
        orderHelper.generatePaymentCode.mockReturnValue('97-21820-84');

        orderDetailService.create.mockRejectedValue('failed');
        orderRepository.findWithUserAndPaymentMethodById.mockResolvedValue(mockOrderResult);

        await expect(orderService.create(orderRequest, {id: 'random-user-id'})).rejects.toThrow(ResponseError);

        expect(logisticRepository.findOneById).toHaveReturnedTimes(2);
        expect(productRepository.findOneById).toHaveReturnedTimes(4);
        expect(paymentMethodRepository.findOneById).toHaveReturnedTimes(1);
        expect(productRepository.findOneById).toHaveReturnedTimes(4);
        expect(orderRepository.create).toHaveReturnedTimes(1);
        expect(orderDetailService.create).toHaveReturnedTimes(1);
        expect(orderRepository.findWithUserAndPaymentMethodById).toHaveReturnedTimes(0);
    }, 30000);

    it('should not create new order because total price calculation not same', async () => {
        const orderRequest = {
            payment_method_id : "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            total_price : 1004400,
            note : "test nyaaawww",
            order_details : [
                {
                    product_id : "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                },
                {
                    product_id : "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                }
            ]
        };

        const mockPaymentResult = {
            id: "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            name: "BCA",
            payment_fees: 2000,
            logo_url: "https://uwupedia.com/dana.png",
            is_active: true,
        }

        const mockLogisticResult = {
            id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            name: "TIKI",
            payment_fees_permile: 200,
            logo_url: "https://uwu.png",
            is_active: true
        }

        const mockProductResult = {
            id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            stock: 99,
            price: 500000,
            title: 'Manga One Room Volume 2'
        }

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expiress_at: 29038193829,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            }
        }

        paymentMethodRepository.findOneById.mockResolvedValue(mockPaymentResult);
        logisticRepository.findOneById.mockResolvedValue(mockLogisticResult);
        productRepository.findOneById.mockResolvedValue(mockProductResult);
        orderRepository.create.mockResolvedValue(mockOrderResult);

        orderHelper.generateOrderId.mockReturnValue('PYO-1715945334-98450');
        orderHelper.generatePaymentCode.mockReturnValue('97-21820-84');

        orderDetailService.create.mockResolvedValue('failed');
        orderRepository.findWithUserAndPaymentMethodById.mockResolvedValue(mockOrderResult);

        await expect(orderService.create(orderRequest, {id: 'random-user-id'})).rejects.toThrow('Total price calculation is not the same!');

        expect(logisticRepository.findOneById).toHaveReturnedTimes(2);
        expect(productRepository.findOneById).toHaveReturnedTimes(2);
        expect(paymentMethodRepository.findOneById).toHaveReturnedTimes(1);
        expect(orderRepository.create).toHaveReturnedTimes(0);
        expect(orderDetailService.create).toHaveReturnedTimes(0);
        expect(orderRepository.findWithUserAndPaymentMethodById).toHaveReturnedTimes(0);
    });

    it('should not create new order because payment method not found', async () => {
        const orderRequest = {
            payment_method_id : "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            total_price : 1004400,
            note : "test nyaaawww",
            order_details : [
                {
                    product_id : "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                },
                {
                    product_id : "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                }
            ]
        };

        const mockPaymentResult = {
            id: "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            name: "BCA",
            payment_fees: 2000,
            logo_url: "https://uwupedia.com/dana.png",
            is_active: true,
        }

        const mockLogisticResult = {
            id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            name: "TIKI",
            payment_fees_permile: 200,
            logo_url: "https://uwu.png",
            is_active: true
        }

        const mockProductResult = {
            id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            stock: 99,
            price: 500000,
            title: 'Manga One Room Volume 2'
        }

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expiress_at: 29038193829,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            }
        }

        paymentMethodRepository.findOneById.mockResolvedValue(null);
        logisticRepository.findOneById.mockResolvedValue(mockLogisticResult);
        productRepository.findOneById.mockResolvedValue(mockProductResult);
        orderRepository.create.mockResolvedValue(mockOrderResult);

        orderHelper.generateOrderId.mockReturnValue('PYO-1715945334-98450');
        orderHelper.generatePaymentCode.mockReturnValue('97-21820-84');

        orderDetailService.create.mockResolvedValue(orderRequest);
        orderRepository.findWithUserAndPaymentMethodById.mockResolvedValue(mockOrderResult);

        await expect(orderService.create(orderRequest, {id: 'random-user-id'})).rejects.toThrow('Payment not found');

        expect(logisticRepository.findOneById).toHaveReturnedTimes(0);
        expect(productRepository.findOneById).toHaveReturnedTimes(0);
        expect(paymentMethodRepository.findOneById).toHaveReturnedTimes(1);
        expect(orderRepository.create).toHaveReturnedTimes(0);
        expect(orderDetailService.create).toHaveReturnedTimes(0);
        expect(orderRepository.findWithUserAndPaymentMethodById).toHaveReturnedTimes(0);
    });

    it('should not create new order because logistic not found', async () => {
        const orderRequest = {
            payment_method_id : "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            total_price : 1004400,
            note : "test nyaaawww",
            order_details : [
                {
                    product_id : "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                },
                {
                    product_id : "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                }
            ]
        };

        const mockPaymentResult = {
            id: "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            name: "BCA",
            payment_fees: 2000,
            logo_url: "https://uwupedia.com/dana.png",
            is_active: true,
        }

        const mockLogisticResult = {
            id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            name: "TIKI",
            payment_fees_permile: 200,
            logo_url: "https://uwu.png",
            is_active: true
        }

        const mockProductResult = {
            id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            stock: 99,
            price: 500000,
            title: 'Manga One Room Volume 2'
        }

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expiress_at: 29038193829,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            }
        }

        paymentMethodRepository.findOneById.mockResolvedValue(mockPaymentResult);
        logisticRepository.findOneById.mockResolvedValue(null);
        productRepository.findOneById.mockResolvedValue(mockProductResult);
        orderRepository.create.mockResolvedValue(mockOrderResult);

        orderHelper.generateOrderId.mockReturnValue('PYO-1715945334-98450');
        orderHelper.generatePaymentCode.mockReturnValue('97-21820-84');

        orderDetailService.create.mockResolvedValue(orderRequest);
        orderRepository.findWithUserAndPaymentMethodById.mockResolvedValue(mockOrderResult);

        await expect(orderService.create(orderRequest, {id: 'random-user-id'})).rejects.toThrow('Logistic not found');

        expect(logisticRepository.findOneById).toHaveReturnedTimes(1);
        expect(productRepository.findOneById).toHaveReturnedTimes(0);
        expect(paymentMethodRepository.findOneById).toHaveReturnedTimes(1);
        expect(orderRepository.create).toHaveReturnedTimes(0);
        expect(orderDetailService.create).toHaveReturnedTimes(0);
        expect(orderRepository.findWithUserAndPaymentMethodById).toHaveReturnedTimes(0);
    });

    it('should not create new order because product not found', async () => {
        const orderRequest = {
            payment_method_id : "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            total_price : 1004400,
            note : "test nyaaawww",
            order_details : [
                {
                    product_id : "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                },
                {
                    product_id : "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                }
            ]
        };

        const mockPaymentResult = {
            id: "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            name: "BCA",
            payment_fees: 2000,
            logo_url: "https://uwupedia.com/dana.png",
            is_active: true,
        }

        const mockLogisticResult = {
            id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            name: "TIKI",
            payment_fees_permile: 200,
            logo_url: "https://uwu.png",
            is_active: true
        }

        const mockProductResult = {
            id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            stock: 99,
            price: 500000,
            title: 'Manga One Room Volume 2'
        }

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expiress_at: 29038193829,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            }
        }

        paymentMethodRepository.findOneById.mockResolvedValue(mockPaymentResult);
        logisticRepository.findOneById.mockResolvedValue(mockLogisticResult);
        productRepository.findOneById.mockResolvedValue(null);
        orderRepository.create.mockResolvedValue(mockOrderResult);

        orderHelper.generateOrderId.mockReturnValue('PYO-1715945334-98450');
        orderHelper.generatePaymentCode.mockReturnValue('97-21820-84');

        orderDetailService.create.mockResolvedValue('failed');
        orderRepository.findWithUserAndPaymentMethodById.mockResolvedValue(mockOrderResult);

        await expect(orderService.create(orderRequest, {id: 'random-user-id'})).rejects.toThrow('Product not found');

        expect(logisticRepository.findOneById).toHaveReturnedTimes(1);
        expect(productRepository.findOneById).toHaveReturnedTimes(1);
        expect(paymentMethodRepository.findOneById).toHaveReturnedTimes(1);
        expect(orderRepository.create).toHaveReturnedTimes(0);
        expect(orderDetailService.create).toHaveReturnedTimes(0);
        expect(orderRepository.findWithUserAndPaymentMethodById).toHaveReturnedTimes(0);
    });

    it('should not create new order because insufficient product stock', async () => {
        const orderRequest = {
            payment_method_id : "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            total_price : 1002400,
            note : "test nyaaawww",
            order_details : [
                {
                    product_id : "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                },
                {
                    product_id : "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                    logistic_id : "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                    address_id : "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                    quantity : 1,
                    unit_price : 500000
                }
            ]
        };

        const mockPaymentResult = {
            id: "8f58fad3-9ba7-474c-b183-39c82d1c4c07",
            name: "BCA",
            payment_fees: 2000,
            logo_url: "https://uwupedia.com/dana.png",
            is_active: true,
        }

        const mockLogisticResult = {
            id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            name: "TIKI",
            payment_fees_permile: 200,
            logo_url: "https://uwu.png",
            is_active: true
        }

        const mockProductResult = {
            id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            stock: 0,
            price: 500000,
            title: 'Manga One Room Volume 2'
        }

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expiress_at: 29038193829,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            }
        }

        paymentMethodRepository.findOneById.mockResolvedValue(mockPaymentResult);
        logisticRepository.findOneById.mockResolvedValue(mockLogisticResult);
        productRepository.findOneById.mockResolvedValue(mockProductResult);
        orderRepository.create.mockResolvedValue(mockOrderResult);

        orderHelper.generateOrderId.mockReturnValue('PYO-1715945334-98450');
        orderHelper.generatePaymentCode.mockReturnValue('97-21820-84');

        orderDetailService.create.mockResolvedValue('failed');
        orderRepository.findWithUserAndPaymentMethodById.mockResolvedValue(mockOrderResult);

        await expect(orderService.create(orderRequest, {id: 'random-user-id'})).rejects.toThrow('Insufficient product stock!');

        expect(logisticRepository.findOneById).toHaveReturnedTimes(2);
        expect(productRepository.findOneById).toHaveReturnedTimes(3);
        expect(paymentMethodRepository.findOneById).toHaveReturnedTimes(1);
        expect(orderRepository.create).toHaveReturnedTimes(0);
        expect(orderDetailService.create).toHaveReturnedTimes(0);
        expect(orderRepository.findWithUserAndPaymentMethodById).toHaveReturnedTimes(0);
    });
})

describe('update payment status', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update payment status to true', async () => {

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expiress_at: 29038193829,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            },
            save: jest.fn()
        }

        orderRepository.findOneByOrderIdAndPaymentCode.mockResolvedValue(mockOrderResult);
        orderDetailRepository.updateOrderStatusByOrderId.mockResolvedValue('updated order status');

        await expect(orderService.updatePaymentStatus(mockOrderResult.payment_code, mockOrderResult.id)).resolves.not.toThrow();

        expect(orderRepository.findOneByOrderIdAndPaymentCode).toHaveReturnedTimes(1);
        expect(orderDetailRepository.updateOrderStatusByOrderId).toHaveReturnedTimes(1);
        expect(mockOrderResult.save).toHaveReturnedTimes(1);
    });

    it('should not update because order not found', async () => {

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expiress_at: 29038193829,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            },
            save: jest.fn()
        }

        orderRepository.findOneByOrderIdAndPaymentCode.mockResolvedValue(null);
        orderDetailRepository.updateOrderStatusByOrderId.mockResolvedValue('updated order status');

        await expect(orderService.updatePaymentStatus(mockOrderResult.payment_code, mockOrderResult.id)).rejects.toThrow('Order not found');

        expect(orderRepository.findOneByOrderIdAndPaymentCode).toHaveReturnedTimes(1);
        expect(orderDetailRepository.updateOrderStatusByOrderId).toHaveReturnedTimes(0);
        expect(mockOrderResult.save).toHaveReturnedTimes(0);
    });

    it('should not update because payment time has exceeded the grace period', async () => {

        const mockOrderResult = {
            id: 'PYO-1715945334-98450',
            payment_code: '97-21820-84',
            payment_expires_at: 0,
            payment_status: false,
            payment_date: null,
            created_at: 2398193282,
            updated_at: 2938923219,
            total_price: 1002400,
            user: {
                id: 'random-user-id',
                username: 'nekochan',
                email: 'nekochan@gmail.com',
                full_name: 'neko pyon'
            },
            payment_method: {
                id: 'random-payment-method-id',
                name: 'BCA',
                payment_fees: 2000,
                logo_url: 'https://logo-bca.jpg',
                is_active: true,
                description: 'bca payment method',
                created_at: 93821938293,
                updated_at: 23182309283
            },
            save: jest.fn()
        }

        orderRepository.findOneByOrderIdAndPaymentCode.mockResolvedValue(mockOrderResult);
        orderDetailRepository.updateOrderStatusByOrderId.mockResolvedValue('updated order status');

        await expect(orderService.updatePaymentStatus(mockOrderResult.payment_code, mockOrderResult.id)).rejects.toThrow('Payment time has exceeded the grace period, please reorder!');

        expect(orderRepository.findOneByOrderIdAndPaymentCode).toHaveReturnedTimes(1);
        expect(orderDetailRepository.updateOrderStatusByOrderId).toHaveReturnedTimes(0);
        expect(mockOrderResult.save).toHaveReturnedTimes(0);
    });
})

describe('list', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return list of order by user id', async () => {
        const mockOrderResults = [
            {
                id: 'PYO-1715945334-98450',
                payment_code: '97-21820-84',
                payment_expires_at: 0,
                payment_status: false,
                payment_date: null,
                created_at: 2398193282,
                updated_at: 2938923219,
                total_price: 1002400,
                user: {
                    id: 'random-user-id',
                    username: 'nekochan',
                    email: 'nekochan@gmail.com',
                    full_name: 'neko pyon'
                },
                payment_method: {
                    id: 'random-payment-method-id',
                    name: 'BCA',
                    payment_fees: 2000,
                    logo_url: 'https://logo-bca.jpg',
                    is_active: true,
                    description: 'bca payment method',
                    created_at: 93821938293,
                    updated_at: 23182309283
                },
                hateos: {
                    name: 'OrderDetails',
                    uri: `http://localhost:8080/api/v1/orders/PYO-1715945334-98450/order-details`,
                    method: 'GET'
                }
            },
            {
                id: 'PYO-1715945334-98450',
                payment_code: '97-21820-84',
                payment_expires_at: 0,
                payment_status: false,
                payment_date: null,
                created_at: 2398193282,
                updated_at: 2938923219,
                total_price: 1002400,
                user: {
                    id: 'random-user-id',
                    username: 'nekochan',
                    email: 'nekochan@gmail.com',
                    full_name: 'neko pyon'
                },
                payment_method: {
                    id: 'random-payment-method-id',
                    name: 'BCA',
                    payment_fees: 2000,
                    logo_url: 'https://logo-bca.jpg',
                    is_active: true,
                    description: 'bca payment method',
                    created_at: 93821938293,
                    updated_at: 23182309283
                },
                hateos: {
                    name: 'OrderDetails',
                    uri: `http://localhost:8080/api/v1/orders/PYO-1715945334-98450/order-details`,
                    method: 'GET'
                }
            }
        ];

        orderRepository.findAllWithUserAndPaymentMethodByUserId.mockResolvedValue(mockOrderResults);

        const orderResults = await orderService.list('random-user-id');

        console.log(orderResults[0].id)

        expect(orderResults[0].id).toBe(orderResults[0].id);
        expect(orderResults[0].payment_code).toBe(orderResults[0].payment_code);

        expect(orderResults[1].id).toBe(orderResults[1].id);
        expect(orderResults[1].payment_code).toBe(orderResults[1].payment_code);

        expect(orderRepository.findAllWithUserAndPaymentMethodByUserId).toHaveReturnedTimes(1);
    });
})