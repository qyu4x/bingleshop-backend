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

Endpoint : GET /api/v1/products/search

Query Params :  
- keyword: The part of the product word that is searched [optional]
- category_id: id of product category [optional]
- sub_category_id: id of product sub category [optional]
- page : Number of page, default 1 [optional]
- size : Size per page, default 10 [optional]

Response Body Success :

```json

{
  "data": [
    {
      "id": "8a0ae8dd-bd59-450d-a634-9d6253dd6074",
      "title": "Manga Kaguya Sama Love is War volume 2",
      "stock": 10,
      "price": {
        "amount": "500000",
        "currency": "IDR 500.000,00",
        "display": "Rp 500.000,00"
      },
      "category": {
        "id": "4e8c78ea-bb8c-4e6c-93dd-be04536e5f91",
        "name": "Manga",
        "description": "Japanese Manga"
      },
      "sub_category": {
        "id": "a665ffb9-3045-4cf3-a4f5-78b3db5b4bfd",
        "name": "Kaguya Sama Love Is War",
        "description": "Manga Kaguya Sama Love is War"
      },
      "is_preorder": false,
      "description": "Manga kaguya sama love is war volume 2 is about kaguya shinomiya and ...",
      "is_active": true,
      "created_at": 1715912757541,
      "updated_at": null
    },
    {
      "id": "82b8074f-1385-4228-abc4-5f9578b135a5",
      "title": "Manga Kaguya Sama Love is War volume 2",
      "stock": 10,
      "price": {
        "amount": "500000",
        "currency": "IDR 500.000,00",
        "display": "Rp 500.000,00"
      },
      "category": {
        "id": "4e8c78ea-bb8c-4e6c-93dd-be04536e5f91",
        "name": "Manga",
        "description": "Japanese Manga"
      },
      "sub_category": {
        "id": "a665ffb9-3045-4cf3-a4f5-78b3db5b4bfd",
        "name": "Kaguya Sama Love Is War",
        "description": "Manga Kaguya Sama Love is War"
      },
      "is_preorder": false,
      "description": "Manga kaguya sama love is war volume 2 is about kaguya shinomiya and ...",
      "is_active": true,
      "created_at": 1715912757541,
      "updated_at": null
    },
    {
      "id": "e4bcf842-ed17-44a4-afc9-32bf214833ba",
      "title": "Manga Kaguya Sama Love is War volume 2",
      "stock": 10,
      "price": {
        "amount": "500000",
        "currency": "IDR 500.000,00",
        "display": "Rp 500.000,00"
      },
      "category": {
        "id": "4e8c78ea-bb8c-4e6c-93dd-be04536e5f91",
        "name": "Manga",
        "description": "Japanese Manga"
      },
      "sub_category": {
        "id": "a665ffb9-3045-4cf3-a4f5-78b3db5b4bfd",
        "name": "Kaguya Sama Love Is War",
        "description": "Manga Kaguya Sama Love is War"
      },
      "is_preorder": false,
      "description": "Manga kaguya sama love is war volume 2 is about kaguya shinomiya and ...",
      "is_active": true,
      "created_at": 1715912757541,
      "updated_at": null
    },
    {
      "id": "fc26d3c3-60a1-4fc0-924c-3e397fe38aee",
      "title": "Manga Kaguya Sama Love is War volume 2",
      "stock": 10,
      "price": {
        "amount": "500000",
        "currency": "IDR 500.000,00",
        "display": "Rp 500.000,00"
      },
      "category": {
        "id": "4e8c78ea-bb8c-4e6c-93dd-be04536e5f91",
        "name": "Manga",
        "description": "Japanese Manga"
      },
      "sub_category": {
        "id": "a665ffb9-3045-4cf3-a4f5-78b3db5b4bfd",
        "name": "Kaguya Sama Love Is War",
        "description": "Manga Kaguya Sama Love is War"
      },
      "is_preorder": false,
      "description": "Manga kaguya sama love is war volume 2 is about kaguya shinomiya and ...",
      "is_active": true,
      "created_at": 1715912757541,
      "updated_at": null
    },
    {
      "id": "3b04094b-47d0-4df4-8295-dfa0e5a3fe24",
      "title": "Manga Kaguya Sama Love is War volume 2",
      "stock": 10,
      "price": {
        "amount": "500000",
        "currency": "IDR 500.000,00",
        "display": "Rp 500.000,00"
      },
      "category": {
        "id": "4e8c78ea-bb8c-4e6c-93dd-be04536e5f91",
        "name": "Manga",
        "description": "Japanese Manga"
      },
      "sub_category": {
        "id": "a665ffb9-3045-4cf3-a4f5-78b3db5b4bfd",
        "name": "Kaguya Sama Love Is War",
        "description": "Manga Kaguya Sama Love is War"
      },
      "is_preorder": false,
      "description": "Manga kaguya sama love is war volume 2 is about kaguya shinomiya and ...",
      "is_active": true,
      "created_at": 1715912757541,
      "updated_at": null
    }
  ],
  "pagination": {
    "current_page": 2,
    "total_item": 24,
    "total_page": 4
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

