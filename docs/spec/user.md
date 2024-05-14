# User API Spec

## Register User API

Endpoint : POST /api/v1/users

Request Body : 

```json
{
  "username" : "nekochan",
  "full_name" : "Shina Mahiru",
  "email" : "shinapyon@gmail.com",
  "password" : "shinachan",
  "birth_date" : "2002-08-08"
}
```

Response Body Success :

```json
{
  "data": {
    "id" : "uuidv4",
    "username" : "nekochan",
    "full_name" : "Shina Mahiru",
    "email" : "shinapyon@gmail.com",
    "birth_date" : "2002-08-08",
    "role" : "USER",
    "is_active" : true,
    "created_at" : 2736723162173,
    "updated_at" : 2736723162173
  }
}
```

Response Body Error :

```json
{
  "errors": "Email already registered"
}
```


## Login User API

Endpoint : POST /api/v1/users/login

Request Body :

```json
{
  "email": "nekochan@gmail.com", 
  "password" : "neko"
}
```

Response Body Success :

```json
{
  "data": {
    "token" : "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/v1/users/logout

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
  "errors" : "Unauthorized"
}
```

## Get Current User API

Endpoint : POST /api/v1/users/current

Headers: 
- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id" : "uuidv4",
    "username" : "nekochan",
    "full_name" : "Shina Mahiru",
    "email" : "shinapyon@gmail.com",
    "birth_date" : "2002-08-08",
    "role" : "USER",
    "is_active" : true,
    "created_at" : 2736723162173,
    "updated_at" : 2736723162173
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```


