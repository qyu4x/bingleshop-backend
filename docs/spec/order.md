# Order API Spec

## Create Order API 

Endpoint : POST /api/v1/orders

Headers:
- Authorization : token

Request Body :

```json
{
  "payment_method_id": "uuidv4",
  "total_price": 80000,
  "note": "uuidv4",
  "order_details": [
    {
      "product_id": "uuidv4",
      "logistic_id" : "uuidv4",
      "address_id" : "uuidv4",
      "quantity" : 2,
      "unit_price" : 100000
    },
    {
      "product_id": "uuidv4",
      "logistic_id" : "uuidv4",
      "address_id" : "uuidv4",
      "quantity" : 3,
      "unit_price" : 100000
    }
  ]
}
```

Response Body Success :

```json
{
  "data": {
    "id": "unique-order-id",
    "user": {
      "id": "uuidv4",
      "name": "Shiina Mahiru"
    },
    "payment_method": {
      "id": "uuidv4",
      "name": "INDOMART"
    },
    "total_price": {
      "amount": 200000,
      "currency": "IDR",
      "display": "Rp."
    },
    "payment_status": false,
    "payment_date": null,
    "payment_code": "payment_code",
    "note": "this is note",
    "action": [
      {
        "name": "OrderDetails",
        "uri" : "http://my.id/api/v1/orders/{orderId}/order-details",
        "method" : "GET"
      }
    ],
    "created_at": 298391283,
    "updated_at": 823491823
  }
}

```

Response Body Error :

```json
{
  "errors" : "Unauthorized"
}
```

## Update Payment Status Order API
Endpoint : PATCH /api/v1/payments/{paymentCode}/orders/{orderId}

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
## Lists Order API
Endpoint : PATCH /api/v1/payments/{paymentCode}/orders/{orderId}

Headers:
- Authorization : token

Response Body Success:

```json
{
  "data": [
    {
      "id": "unique-order-id",
      "user": {
        "id": "uuidv4",
        "name": "Shiina Mahiru"
      },
      "payment_method": {
        "id": "uuidv4",
        "name": "INDOMART"
      },
      "total_price": {
        "amount": 200000,
        "currency": "IDR",
        "display": "Rp."
      },
      "payment_status": false,
      "payment_date": null,
      "payment_code": "payment_code",
      "note": "this is note",
      "action": [
        {
          "name": "OrderDetails",
          "uri" : "http://my.id/api/v1/orders/{orderId}/order-details",
          "method" : "GET"
        }
      ],
      "created_at": 298391283,
      "updated_at": 823491823
    },
    {
      "id": "unique-order-id",
      "user": {
        "id": "uuidv4",
        "name": "Shiina Mahiru"
      },
      "payment_method": {
        "id": "uuidv4",
        "name": "INDOMART"
      },
      "total_price": {
        "amount": 200000,
        "currency": "IDR",
        "display": "Rp."
      },
      "payment_status": false,
      "payment_date": null,
      "payment_code": "payment_code",
      "note": "this is note",
      "action": [
        {
          "name": "OrderDetails",
          "uri" : "http://my.id/api/v1/orders/{orderId}/order-details",
          "method" : "GET"
        }
      ],
      "created_at": 298391283,
      "updated_at": 823491823
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