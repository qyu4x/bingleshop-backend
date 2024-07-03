const orderDetailRepository = require('../src/repository/order-detail.repository');
const addressService = require('../src/service/address.service');
const productService = require('../src/service/product.service');
const orderDetailService = require('../src/service/order-detail.service');

const uuid = require('uuid');
const orderStatus = require("../src/helper/order-status.helper");
const {ResponseError} = require("../src/error/response-error");
const {CurrencyResponse} = require("../src/payload/response/currency.response");
const {OrderDetailResponse} = require("../src/payload/response/order-detail.response");

jest.mock('../src/repository/order-detail.repository');
jest.mock('../src/service/address.service');
jest.mock('../src/service/product.service');
jest.mock('uuid');

describe('create', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create order detail and update product stock', async () => {
        const userId = 'unique-user-id';
        const orderId = 'unique-order-id';
        const mockUuid = 'unique-order-detail-id';

        const orderDetailsRequest = [
            {
                "product_id": "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                "logistic_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                "address_id": "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                "quantity": 1,
                "unit_price": 500000
            },
            {
                "product_id": "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                "logistic_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                "address_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                "quantity": 1,
                "unit_price": 500000
            }
        ]

        const mockOrderDetails = [
            {
                id: mockUuid,
                order_id: orderId,
                order_status: orderStatus.awaiting_payment,
                is_received: false,
                product_id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                logistic_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                address_id: "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                quantity: 1,
                unit_price: 500000
            },
            {
                id: mockUuid,
                order_id: orderId,
                order_status: orderStatus.awaiting_payment,
                is_received: false,
                product_id: "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                logistic_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                address_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                quantity: 1,
                unit_price: 500000
            }
        ];

        const mockAddressData = [
            {
                id: 'fd8985b4-1e7e-42b4-b7e3-0827616beefc',
                is_main_address: true
            },
            {
                id: 'e4f1499b-a54b-482e-9809-c9c81972f3d9',
                is_main_address: false
            }
        ]

        uuid.v4.mockReturnValue(mockUuid);
        addressService.get.mockResolvedValue(mockAddressData);
        productService.updateStock.mockResolvedValue(true);
        orderDetailRepository.bulkCreate.mockResolvedValue(mockOrderDetails);

        await expect(orderDetailService.create(userId, orderId, orderDetailsRequest)).resolves.not.toThrow();

        expect(addressService.get).toHaveBeenCalledTimes(2);
        expect(productService.updateStock).toHaveBeenCalledTimes(2);
        expect(orderDetailRepository.bulkCreate).toHaveBeenCalledTimes(1);
    });

    it('should not create order detail and update product stock', async () => {
        const userId = 'unique-user-id';
        const orderId = 'unique-order-id';
        const mockUuid = 'unique-order-detail-id';

        const orderDetailsRequest = [
            {
                "product_id": "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                "logistic_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                "address_id": "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                "quantity": 1,
                "unit_price": 500000
            },
            {
                "product_id": "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                "logistic_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                "address_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                "quantity": 1,
                "unit_price": 500000
            }
        ]

        const mockOrderDetails = [
            {
                id: mockUuid,
                order_id: orderId,
                order_status: orderStatus.awaiting_payment,
                is_received: false,
                product_id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                logistic_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                address_id: "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                quantity: 1,
                unit_price: 500000
            },
            {
                id: mockUuid,
                order_id: orderId,
                order_status: orderStatus.awaiting_payment,
                is_received: false,
                product_id: "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                logistic_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                address_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                quantity: 1,
                unit_price: 500000
            }
        ];

        const mockAddressData = [
            {
                id: 'fd8985b4-1e7e-42b4-b7e3-0827616beefc',
                is_main_address: true
            },
            {
                id: 'e4f1499b-a54b-482e-9809-c9c81972f3d9',
                is_main_address: false
            }
        ]

        uuid.v4.mockReturnValue(mockUuid);
        addressService.get.mockResolvedValue(mockAddressData);
        productService.updateStock.mockResolvedValue(true);
        orderDetailRepository.bulkCreate.mockRejectedValue(mockOrderDetails);

        await expect(orderDetailService.create(userId, orderId, orderDetailsRequest)).rejects.toThrow(ResponseError);

        expect(addressService.get).toHaveBeenCalledTimes(2);
        expect(productService.updateStock).toHaveBeenCalledTimes(2);
        expect(orderDetailRepository.bulkCreate).toHaveBeenCalledTimes(1);
    });
})

describe('get', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get list order detail by user id and order id', async () => {
        const orderDetailId = 'unique-order-detail-id'
        const orderId = 'unique-order-id';
        const userId = 'unique-user-id';

        const mockOrderDetails = [
            {
                id: orderDetailId,
                order_id: orderId,
                order_status: orderStatus.awaiting_payment,
                is_received: false,
                product_id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                logistic_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                address_id: "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                quantity: 1,
                unit_price: 500000
            },
            {
                id: orderDetailId,
                order_id: orderId,
                order_status: orderStatus.awaiting_payment,
                is_received: false,
                product_id: "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                logistic_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                address_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                quantity: 1,
                unit_price: 500000
            }
        ];

        const expectedResults = [{
            "address_id": "e4f1499b-a54b-482e-9809-c9c81972f3d9",
            "created_at": undefined,
            "id": "unique-order-detail-id",
            "is_received": false,
            "logistic_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            "order_id": "unique-order-id",
            "order_status": "awaiting_payment",
            "product_id": "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            "quantity": 1,
            "received_at": undefined,
            "unit_price": {"amount": 500000, "currency": "IDR 500.000,00", "display": "Rp 500.000,00"},
            "updated_at": undefined
        }, {
            "address_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            "created_at": undefined,
            "id": "unique-order-detail-id",
            "is_received": false,
            "logistic_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            "order_id": "unique-order-id",
            "order_status": "awaiting_payment",
            "product_id": "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
            "quantity": 1,
            "received_at": undefined,
            "unit_price": {"amount": 500000, "currency": "IDR 500.000,00", "display": "Rp 500.000,00"},
            "updated_at": undefined
        }];

        orderDetailRepository.findAllWithOrderByOrderIdAndUserId.mockResolvedValue(mockOrderDetails);

        const getOrderDetailResults = await orderDetailService.get(userId, orderId);

        expect(getOrderDetailResults).toEqual(expectedResults);
        expect(orderDetailRepository.findAllWithOrderByOrderIdAndUserId).toHaveBeenCalledTimes(1);
    });
})

describe('list', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return list order detail by user id', async () => {
        const orderDetailId = 'unique-order-detail-id'
        const orderId = 'unique-order-id';
        const userId = 'unique-user-id';

        const mockOrderDetails = [
            {
                id: orderDetailId,
                order_id: orderId,
                order_status: orderStatus.awaiting_payment,
                is_received: false,
                product_id: "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
                logistic_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                address_id: "e4f1499b-a54b-482e-9809-c9c81972f3d9",
                quantity: 1,
                unit_price: 500000
            },
            {
                id: orderDetailId,
                order_id: orderId,
                order_status: orderStatus.awaiting_payment,
                is_received: false,
                product_id: "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
                logistic_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                address_id: "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
                quantity: 1,
                unit_price: 500000
            }
        ];

        const expectedResults = [{
            "address_id": "e4f1499b-a54b-482e-9809-c9c81972f3d9",
            "created_at": undefined,
            "id": "unique-order-detail-id",
            "is_received": false,
            "logistic_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            "order_id": "unique-order-id",
            "order_status": "awaiting_payment",
            "product_id": "4ba73446-3bc7-452c-8a82-bc2d3fc8b90b",
            "quantity": 1,
            "received_at": undefined,
            "unit_price": {"amount": 500000, "currency": "IDR 500.000,00", "display": "Rp 500.000,00"},
            "updated_at": undefined
        }, {
            "address_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            "created_at": undefined,
            "id": "unique-order-detail-id",
            "is_received": false,
            "logistic_id": "fd8985b4-1e7e-42b4-b7e3-0827616beefc",
            "order_id": "unique-order-id",
            "order_status": "awaiting_payment",
            "product_id": "17c4cfae-9fd0-4298-8246-e8b3670c3c14",
            "quantity": 1,
            "received_at": undefined,
            "unit_price": {"amount": 500000, "currency": "IDR 500.000,00", "display": "Rp 500.000,00"},
            "updated_at": undefined
        }];

        orderDetailRepository.findAllWithOrderByUserId.mockResolvedValue(mockOrderDetails);

        const getOrderDetailResults = await orderDetailService.list(userId);

        expect(getOrderDetailResults).toEqual(expectedResults);
        expect(orderDetailRepository.findAllWithOrderByUserId).toHaveBeenCalledTimes(1);
    });
})