# Address API Spec

## Create Address API

Endpoint : POST /api/v1/addresses

Headers:
- Authorization : token

Request Body :

```json
{
  "name": "Shiina Mahiru",
  "phone_number" : "082351252125",
  "street" : "shibuya no 12",
  "province" : "Tokyo",
  "district" : "Shibuya",
  "postal_code" : "S7238",
  "is_main_address" : true
}
```

Response Body Success :

```json
{
  "data": {
    "id" : "uuidv4",
    "user_id" : "uuidv4",
    "name": "Shiina Mahiru",
    "phone_number" : "082351252125",
    "street" : "shibuya no 12",
    "province" : "Tokyo",
    "district" : "Shibuya",
    "postal_code" : "S7238",
    "is_main_address" : true,
    "is_active" : true,
    "created_at" : 283718371832,
    "updated_at" : 283718371832
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## List Address API

Endpoint : GET /api/v1/addresses

Headers:
- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id" : "uuidv4",
      "user_id" : "uuidv4",
      "name": "Shiina Mahiru",
      "phone_number" : "082351252125",
      "street" : "shibuya no 12",
      "province" : "Tokyo",
      "district" : "Shibuya",
      "postal_code" : "S7238",
      "is_main_address" : true,
      "is_active" : true,
      "created_at" : 283718371832,
      "updated_at" : 283718371832
    },
    {
      "id" : "uuidv4",
      "user_id" : "uuidv4",
      "name": "Shiina Mahiru 2",
      "phone_number" : "082351252125",
      "street" : "shibuya no 12",
      "province" : "Tokyo",
      "district" : "Shibuya",
      "postal_code" : "S7238",
      "is_main_address" : true,
      "is_active" : false,
      "created_at" : 283718371832,
      "updated_at" : 283718371832
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Delete Address API

Endpoint : DELETE /api/v1/addresses/{id}

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
