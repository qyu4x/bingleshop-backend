# Payment Methods API Spec

## Create Payment Methods API

Endpoint : POST /api/v1/payments

Headers:
- Authorization : token

Request Body :

```json
{
  "name": "INDOMART",
  "payment_fees": 200,
  "logo_url" : "https://uwu.png",
  "description" : "Indomart Payment"
}
```

Response Body Success :

```json
{
  "data": {
    "id": "uuidv4",
    "name": "INDOMART",
    "payment_fees": 200,
    "logo_url" : "https://uwu.png",
    "description" : "Indomart Payment",
    "is_active" : true,
    "created_at" : 914829382,
    "updated_at" : 147281372
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## List Payment Methods API

Endpoint : GET /api/v1/payments

Response Body Success :

```json

{
  "data": [
    {
      "id": "uuidv4",
      "name": "INDOMART",
      "payment_fees": 200,
      "logo_url": "https://uwu.png",
      "description": "Indomart Payment",
      "is_active": true,
      "created_at": 914829382,
      "updated_at": 147281372
    },
    {
      "id": "uuidv4",
      "name": "ALFAMART",
      "payment_fees": 200,
      "logo_url": "https://uwu.png",
      "description": "Alfamart Payment",
      "is_active": true,
      "created_at": 914829382,
      "updated_at": 147281372
    }
  ]
}

```


## Delete Payment Methods API

Endpoint : DELETE /api/v1/payments/{paymentId}

Headers:
- Authorization : token

Response Body Success :
```json
{
  "data" : "OK"
}
```

Response Body Error :

```json
{
  "errors" : "Payment is not found"
}
```

