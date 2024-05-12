# Categories API Spec

## Create Categories API

Endpoint : POST /api/v1/categories

Headers:
- Authorization : token

Request Body :

```json
{
  "name": "Action Figure",
  "description": "Japanase Action Figure"
}
```

Response Body Success :

```json
{
  "data": {
    "id": "uuidv4",
    "name" : "Action Figure",
    "description" : "Japanase Action Figure",
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

## List Categories API

Endpoint : GET /api/v1/categories

Response Body Success :

```json

{
  "data": [
    {
      "id": "uuidv4",
      "name": "Action Figure",
      "description": "Japanase Action Figure",
      "is_active" : true,
      "created_at": 914829382,
      "updated_at": 147281372
    },
    {
      "id": "uuidv4",
      "name": "Manga",
      "description": "Japanase Manga",
      "is_active" : true,
      "created_at": 914829382,
      "updated_at": 147281372
    }
  ]
}

```


## Delete Categories API

Endpoint : DELETE /api/v1/categories/{categoryId}

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

