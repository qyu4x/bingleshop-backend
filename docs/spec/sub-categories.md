# Sub Categories API Spec

## Create Sub Categories API

Endpoint : POST /api/v1/categories/{categoryId}/sub-categories

Headers:
- Authorization : token

Request Body :

```json
{
  "name": "Sega Action Figure",
  "description": "Sega Japanase Action Figure"
}
```

Response Body Success :

```json
{
  "data": {
    "id": "uuidv4",
    "category_id" : "uuidv4",
    "name" : "Sega Action Figure",
    "description" : "Sega Japanase Action Figure",
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

## List Sub Categories API

Endpoint : GET /api/v1/categories/{categoryId}/sub-categories

Response Body Success :

```json

{
  "data": [
    {
      "id": "uuidv4",
      "category_id": "uuidv4",
      "name": "Action Figure",
      "description": "Japanase Action Figure",
      "is_active" : true,
      "created_at": 914829382,
      "updated_at": 147281372
    },
    {
      "id": "uuidv4",
      "category_id": "uuidv4",
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

Endpoint : DELETE /api/v1/sub-categories/{subCategoryId}

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
  "errors" : "Sub Category is not found"
}
```
