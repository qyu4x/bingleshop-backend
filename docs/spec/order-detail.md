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
    "id": "uuidv4",
    "order_id": "order_id",
    "product": {
      "id": "uuidv4",
      "name": "Dakimura Shiina Mahiru"
    },
    "logistic": {
      "id": "uuidv4",
      "name" : "JNE",
      "payment_fees_permile" : 100
    },
    "address": {
      "id" : "uuidv4",
      "name": "Shiina Mahiru",
      "phone_number" : "082351252125",
      "street" : "shibuya no 12",
      "province" : "Tokyo",
      "district" : "Shibuya",
      "postal_code" : "S7238"
    },
    "quantity": 1,
    "order_status": "awaiting_payment",
    "unit_price": {
      "amount": 100000,
      "currency": "IDR",
      "display": "Rp100.000"
    },
    "received_at": null,
    "is_received": false,
    "created_at": 29183912,
    "updated_at": 92389209
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


