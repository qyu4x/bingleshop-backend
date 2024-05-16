# Logistic API Spec

## Create Logistic API

Endpoint : POST /api/v1/logistics

Headers:
- Authorization : token

Request Body :

```json
{
  "name": "JNE",
  "payment_fees_permile": 200,
  "logo_url" : "https://uwu.png",
  "description" : "JNE Logistic"
}
```

Response Body Success :

```json
{
  "data":  {
    "id": "f3116a66-f415-4689-9f46-e0b33f36b320",
    "name": "JNE",
    "payment_fees": {
      "amount": "200",
      "currency": "IDR 200,00",
      "display": "Rp 200,00"
    },
    "logo_url": "https://uwu.png",
    "is_active": true,
    "description": "JNE Logistic",
    "created_at": "1715788569490",
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

## List Logistics API

Endpoint : GET /api/v1/logistics

Response Body Success :

```json

{
  "data": [
    {
      "id": "f3116a66-f415-4689-9f46-e0b33f36b320",
      "name": "JNE",
      "payment_fees": {
        "amount": "200",
        "currency": "IDR 200,00",
        "display": "Rp 200,00"
      },
      "logo_url": "https://uwu.png",
      "is_active": true,
      "description": "JNE Logistic",
      "created_at": "1715788569490",
      "updated_at": null
    },
    {
      "id": "f3116a66-f415-4689-9f46-e0b33f36b320",
      "name": "JNE",
      "payment_fees": {
        "amount": "200",
        "currency": "IDR 200,00",
        "display": "Rp 200,00"
      },
      "logo_url": "https://uwu.png",
      "is_active": true,
      "description": "JNE Logistic",
      "created_at": "1715788569490",
      "updated_at": null
    }
  ]
}

```


## Delete Logistics API

Endpoint : DELETE /api/v1/logistics/{logisticId}

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
  "errors" : "Address is not found"
}
```

