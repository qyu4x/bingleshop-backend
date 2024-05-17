# Order Detail API Spec

## Get Order Details API

Endpoint : GET api/v1/orders/{orderId}/order-details

Headers:
- Authorization : token

Response Body :

```json
{
  "data":  [
    {
      "id": "uuidv4",
      "order_id": "order_id",
      "product_id": "uuidv4",
      "logistic_id": "uuidv4",
      "address_id" : "address_id",
      "quantity" : 1,
      "order_status" : "awaiting_payment",
      "unit_price" : {
        "amount": 100000,
        "currency": "IDR",
        "display": "Rp100.000"
      },
      "received_at" : null,
      "is_received" : false,
      "created_at" : 29183912,
      "updated_at" : 92389209
    },
    {
      "id": "uuidv4",
      "order_id": "order_id",
      "product_id": "uuidv4",
      "logistic_id": "uuidv4",
      "address_id" : "address_id",
      "quantity" : 1,
      "order_status" : "awaiting_payment",
      "unit_price" : {
        "amount": 100000,
        "currency": "IDR",
        "display": "Rp100.000"
      },
      "received_at" : null,
      "is_received" : false,
      "created_at" : 29183912,
      "updated_at" : 92389209
    }
  ]
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```

## Lists Order Details API

Endpoint : GET api/v1/order-details

Headers:
- Authorization : token

Response Body :

```json
{
  "data":  [
    {
      "id": "uuidv4",
      "order_id": "order_id",
      "product_id": "uuidv4",
      "logistic_id": "uuidv4",
      "address_id" : "address_id",
      "quantity" : 1,
      "order_status" : "awaiting_payment",
      "unit_price" : {
        "amount": 100000,
        "currency": "IDR",
        "display": "Rp100.000"
      },
      "received_at" : null,
      "is_received" : false,
      "created_at" : 29183912,
      "updated_at" : 92389209
    },
    {
      "id": "uuidv4",
      "order_id": "order_id",
      "product_id": "uuidv4",
      "logistic_id": "uuidv4",
      "address_id" : "address_id",
      "quantity" : 1,
      "order_status" : "awaiting_payment",
      "unit_price" : {
        "amount": 100000,
        "currency": "IDR",
        "display": "Rp100.000"
      },
      "received_at" : null,
      "is_received" : false,
      "created_at" : 29183912,
      "updated_at" : 92389209
    }
  ]
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```

## Get Specific Order Details API

Endpoint : GET api/v1/orders/{orderId}/order-details/{orderDetailId}

Headers:
- Authorization : token

```json
{
  "data": {
    "id": "95d2b752-d73b-4f98-89c4-ce32ba8b0b5a",
    "order_id": "PYO-1715945334-98450",
    "product": {
      "id": "b6f66049-e4be-40b6-bb44-468a5f914893",
      "title": "Manga Kaguya Sama Love is War Volume 1",
      "price": {
        "amount": "500000",
        "currency": "IDR 500.000,00",
        "display": "Rp 500.000,00"
      }
    },
    "logistic": {
      "id": "934bb17b-cd1c-44f8-9e2b-12b5d9316bcc",
      "name": "TIKI",
      "payment_fees": {
        "amount": "200",
        "currency": "IDR 500.000,00",
        "display": "Rp 500.000,00"
      },
      "logo_url": "https://uwu.png",
      "is_active": true,
      "description": "TIKI Logistic",
      "created_at": "1715945093623",
      "updated_at": null
    },
    "address": {
      "id": "c8e9684b-5b8b-4f58-9e7d-cfbf69933373",
      "name": "Shiina Qirara",
      "phone_number": "082351252125",
      "street": "shibuya 09",
      "city": "Tokyo",
      "province": "Tokyo",
      "district": "Shibuya",
      "postal_code": 123910,
      "is_main_address": true,
      "is_active": true,
      "created_at": "1715945207890",
      "updated_at": null
    },
    "quantity": 1,
    "order_status": "awaiting_payment",
    "unit_price": {
      "amount": "500000",
      "currency": "IDR 500.000,00",
      "display": "Rp 500.000,00"
    },
    "received_at": null,
    "is_received": false,
    "created_at": "1715945334788",
    "updated_at": null
  }
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```

## Update Order Status Order Details API

Endpoint : PATCH api/v1/orders/{orderId}/order-details/{orderDetailId}

Headers:
- Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```

## Update Order Status Received Order Details API

Endpoint : PATCH api/v1/orders/{orderId}/order-details/{orderDetailId}/received

Headers:
- Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}


