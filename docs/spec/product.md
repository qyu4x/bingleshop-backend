# Products API Spec

## Create Products API

Endpoint : POST /api/v1/categories/{categoryId}/sub-categories/{subCategoryId}/products

Headers:
- Authorization : token

Request Body :

```json
{
  "title": "Dakimura Shiina Mahiru",
  "price": 200000,
  "stock" : "10",
  "is_preorder" : false,
  "description" : "Dakimura Shiina Mahiru"
}
```

Response Body Success :

```json
{
  "data": {
    "id": "uuidv4",
    "categories": {
      "id": "uuidv4",
      "name": "Dakimura",
      "description": "Japanese Dakimura",
      "created_at": 914829382,
      "updated_at": 147281372
    },
    "sub_categories": {
      "id": "uuidv4",
      "name": "Otonari Tensi Sama",
      "description": "Japanase Dakimura",
      "created_at": 914829382,
      "updated_at": 147281372
    },
    "title": "Dakimura Shiina Mahiru",
    "price": {
      "amount" : 200000,
      "currency" : "IDR",
      "display" : "Rp."
    },
    "stock": 10,
    "is_preorder": false,
    "description": "Dakimura Shiina Mahiru",
    "created_at": 914829382,
    "updated_at": 147281372
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
## Get Products API

Endpoint : GET /api/v1/products/{productId}

Response Body Success: 

```json
{
  "data": {
    "id": "uuidv4",
    "categories": {
      "id": "uuidv4",
      "name": "Dakimura",
      "description": "Japanese Dakimura",
      "created_at": 914829382,
      "updated_at": 147281372
    },
    "sub_categories": {
      "id": "uuidv4",
      "name": "Otonari Tensi Sama",
      "description": "Japanase Dakimura",
      "created_at": 914829382,
      "updated_at": 147281372
    },
    "title": "Dakimura Shiina Mahiru",
    "price": {
      "amount" : 200000,
      "currency" : "IDR",
      "display" : "Rp."
    },
    "stock": "10",
    "is_preorder": false,
    "description": "Dakimura Shiina Mahiru",
    "created_at": 914829382,
    "updated_at": 147281372
  }
}
```

Response Body Error :

```json
{
  "errors" : "Product is not found"
}
```

## List Products  API

Endpoint : GET /api/v1/products

Query Params :  
- page : Number of page, default 1
- size : Size per page, default 10

Response Body Success :

```json

{
  "data": [
    {
      "id": "uuidv4",
      "categories": {
        "id": "uuidv4",
        "name": "Dakimura",
        "description": "Japanese Dakimura",
        "created_at": 914829382,
        "updated_at": 147281372
      },
      "sub_categories": {
        "id": "uuidv4",
        "name": "Otonari Tensi Sama",
        "description": "Japanase Dakimura",
        "created_at": 914829382,
        "updated_at": 147281372
      },
      "title": "Dakimura Shiina Mahiru",
      "price": {
        "amount": 200000,
        "currency": "IDR",
        "display": "Rp."
      },
      "stock": 10,
      "is_preorder": false,
      "description": "Dakimura Shiina Mahiru",
      "created_at": 914829382,
      "updated_at": 147281372
    },
    {
      "id": "uuidv4",
      "categories": {
        "id": "uuidv4",
        "name": "Dakimura",
        "description": "Japanese Dakimura",
        "created_at": 914829382,
        "updated_at": 147281372
      },
      "sub_categories": {
        "id": "uuidv4",
        "name": "Otonari Tensi Sama",
        "description": "Japanase Dakimura",
        "created_at": 914829382,
        "updated_at": 147281372
      },
      "title": "Dakimura Shiina Mahiru",
      "price": {
        "amount": 200000,
        "currency": "IDR",
        "display": "Rp."
      },
      "stock": 10,
      "is_preorder": false,
      "description": "Dakimura Shiina Mahiru",
      "created_at": 914829382,
      "updated_at": 147281372
    }
  ],
  "paging": {
    "page": 1,
    "size": 10,
    "total_item": 100
  }
}

```


## Delete Products API

Endpoint : DELETE /api/v1/products/{productsId}

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
  "errors" : "Product is not found"
}
```

