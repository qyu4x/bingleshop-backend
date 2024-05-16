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
    "id": "0493988a-7105-4dfe-87d2-83d2b71904e1",
    "name": "Indomart",
    "payment_fees": {
      "amount": "2000",
      "currency": "IDR 2.000,00",
      "display": "Rp 2.000,00"
    },
    "logo_url": "https://uwupedia.com/indomart.png",
    "is_active": true,
    "description": "Payment with indomart",
    "created_at": "1715788398220",
    "updated_at": null
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
      "id": "0493988a-7105-4dfe-87d2-83d2b71904e1",
      "name": "Indomart",
      "payment_fees": {
        "amount": "2000",
        "currency": "IDR 2.000,00",
        "display": "Rp 2.000,00"
      },
      "logo_url": "https://uwupedia.com/indomart.png",
      "is_active": true,
      "description": "Payment with indomart",
      "created_at": "1715788398220",
      "updated_at": null
    },
    {
      "id": "971c7680-3939-47d0-ba48-ebcd5a0e710d",
      "name": "Alfamart",
      "payment_fees": {
        "amount": "2000",
        "currency": "IDR 2.000,00",
        "display": "Rp 2.000,00"
      },
      "logo_url": "https://uwupedia.com/alfa.png",
      "is_active": true,
      "description": "Payment with Alfamart",
      "created_at": "1715827110097",
      "updated_at": null
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

