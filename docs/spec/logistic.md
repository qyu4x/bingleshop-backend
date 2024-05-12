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
  "data": {
    "id": "uuidv4",
    "name": "JNE",
    "payment_fees_permile": 200,
    "logo_url" : "https://uwu.png",
    "description" : "JNE Logistic",
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

## List Logistics API

Endpoint : GET /api/v1/logistics

Response Body Success :

```json

{
  "data": [
    {
      "id": "uuidv4",
      "name": "JNE",
      "payment_fees_permile": 200,
      "logo_url": "https://uwu.png",
      "description": "JNE Logistic",
      "is_active": true,
      "created_at": 914829382,
      "updated_at": 147281372
    },
    {
      "id": "uuidv4",
      "name": "SICEPET",
      "payment_fees_permile": 200,
      "logo_url": "https://uwu.png",
      "description": "SICEPAT Logistic",
      "is_active": true,
      "created_at": 914829382,
      "updated_at": 147281372
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

