# STOREFRONT-BACKEND-API

This API is created for the second project of Udacity Full Stack JAvascript Nanodegree program.

This API can be used to interact with the backend of a storefront api

## CONTENTS

- [INSTRUCTIONS](#INSTRUCTIONS)
  - [Download](#Download)
  - [Install dependencies](#Install-dependencies)
  - [Configure application](#Configure-application)
  - [Create database](#Create-database)
    - [TEST environment](#Create-database-test)
    - [DEV environment](#Create-database-dev)
  - [Run Test Suites](#Run-test-suites)
  - [Start application](#Start-application)
- [EXAMPLES API CALLS](#EXAMPLES-API-CALLS)
  - [Users endpoints](#Users-endpoints)
  - [Products endpoints](#Products-endpoints)
  - [Orders endpoints](#Orders-endpoints)
  - [Services endpoints](#Services-endpoints)
- [DEPENDENCIES](#DEPENDENCIES)

## INSTRUCTIONS

### Download

To download the repository

```
\downloads\git clone https://github.com/IsmaelB83/storefront-backend-api.git
```

### Install dependencies

Install all the required npm packages both in backend and frontend folders

```
\downloads\storefront-backend-api\npm install
```

### Configure application

Application <b>requires an <u>.env</u> file in the root directory</b>. You can copy and paste the .env.example file and modify parameters according to your needs.
The parameters used by the application are:

```
# ENVIRONMENT
ENV=dev
# EXPRESS
TYPE=http
PORT=3000
PRIVATEKEY=/etc/letsencrypt/live/domain_example/privkey.pem
CERTIFICATE=/etc/letsencrypt/live/domain_example/cert.pem
CA=/etc/letsencrypt/live/domain_example/chain.pem
# DATABASE
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB_TEST=storefront_test
POSTGRES_DB=storefront
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres1234
# AUTHENTICATION
BCRYPT_PASSWORD=hyper-secure-secret
SALT_ROUNDS=10
TOKEN_SECRET=RdIxtqdnOd1tYbBEdI4Xp8w6Ron8w
```

<u>IMPORTANT NOTE</u>: POSTGRES_USER/POSTGRES_PASSWORD/POSTGRES_PORT should match with your local configuration of postgres. Otherwise the package.json scritps will not be able to create/connect to the database.

<u>Regarding EXPRESS configuration:</u> This new version of the API allows you to listen on http or https.

In order to work with HTTPS you need to fill following parameters in .env file:

```
TYPE=http
PORT=8443  (or whatever port you may want to use)
PRIVATEKEY=/etc/letsencrypt/live/domain_example/privkey.pem   (path to private key file in your server. This is just an example)
CERTIFICATE=/etc/letsencrypt/live/domain_example/cert.pem     (path to certificate file in your server. This is just an example)
CA=/etc/letsencrypt/live/domain_example/chain.pem             (path to ca file in your server. This is just an example)
```

### Create database

Once .env file is created, you need to create the databases first (you need to have postgres installed in your computer for this). In order to help you with this process, specific package.json scripts have been created for the purpose:

#### Create database TEST

To create the database and run migrations you need to run:

```
npm run createDB_TEST
```

Which will run the following command to create database. Please note that <b>database name is hardcoded, and should match with the one in .env file</b>. This is due to the fact that db:create requires you to specify the database name - see note below)

```
db-migrate --env test db:create --config database-create.json storefront_test    (CREATE DATABASE storefront_test)
```

<u> IMPORTANT NOTE</u>
I needed to follow the workaround of having an additional database-create.json file, due to the issue 468 reported in db-migrate (https://github.com/db-migrate/node-db-migrate/issues/468) which is still pending to be solved. As explained in that issue, db-migrate db:create tries to connect to the database indicated in database.json, even when you're trying to create the database for the first time (which doesn't make much sense trying to connect when you are creting database...). The proposed solution for this issue was to not required database name in db:create, so that the command uses the database name indicated in database.json to create it (fixing the connect try as well as avoiding hardcoding database name to be create in the db:create command). Due to this isuse has not been addressed yet, I needed to follow the workaround of using an additional database-create.json file (as proposed in the topic, where I have excluded the database name property. That way db-migrate db:create does not try to connect first. Even though, this not address the "problem" of hardcoding the database name to be created in the package.json script to create database.

---

You can drop database after testing if you want, by running script:

```
npm run dropDB_TEST
```

#### Create database DEV

To create the database and run migrations you need to run:

```
npm run createDB
```

This will run a similar scripts as seen in previous block, with the addition of running migrations in this case (see below TESTING block in order to understand, why in the case of TEST Database, I didn't include the run migrations in the createDB_TEST script)

```
db-migrate --env dev db:create --config database-create.json storefront         (CREATE DATABASE storefront_test)
db-migrate --env dev up && ENV=dev node dist/database/initDB.js                 (RUN MIGRATIONS TO CREATE SCHEMA)
```

After this, in case you need to fill with initial data this database. You need to run the following command. For this you need to first BUILD application. Therefore:

```
npm run build
npm run fillDB
```

### Run test suites

In case you want to run tests you can do it directly with the following script defined in package.json

```
\downloads\storefront-backend-api\npm run test
```

As you can see in package.json this will run sequentially three commands:

```
db-migrate --env test up
ENV=test npm run jasmine
db-migrate --env test down
```

That is, first runnning migrations (to start with an empty schema), then all test suites and finally drop the schemma while running migrations -down.

### Start application

Once everything is configured just need to run build and start

```
\downloads\storefront-backend-api\npm run build
\downloads\storefront-backend-api\npm start
```

## EXAMPLES API CALLS

Find below some examples of API calls per entity:

### Users endpoints

#### INDEX - get - authentication required

```
/users
JSON Response [
  {
    "id": 1,
    "email": "isma@gmail.com",
    "firstname": "Ismael",
    "lastname": "B."
  },
  {
    "id": 2,
    "email": "livi@gmail.com",
    "firstname": "Livi",
    "lastname": "M."
  },
  {
    "id": 3,
    "email": "john@gmail.com",
    "firstname": "John",
    "lastname": "D."
  }
]
```

#### SHOW - get - authentication required

```
/users/{userId}
  JSON Response {
    "id": 1,
    "email": "isma@gmail.com",
    "firstname": "Ismael",
    "lastname": "B.",
    "password": "$2b$10$PWk7Fjm1yIKUvMbGY4UX2e54vNC1qSoK.UvMdEcGPHr8359ayr8t6"
  }
```

#### CREATE - post

```
/users
  JSON Request Body {
      "email": "pepe@gmail.com",
      "firstname": "Pepe",
      "lastname": "Galindo",
      "password": "Otris1234"
  }
  JSON Response {
    "id": 4,
    "email": "pepe@gmail.com",
    "firstname": "Pepe",
    "lastname": "Galindo",
    "password": "$2b$10$snMnbUjSeA9eG5zXyV5Z4Oy5lEFEZx9CCD5vbG2./GMV32lk/pU/y"
  }
```

#### AUTH - post

```
/users/auth
  JSON Request Body {
      "email": "isma@gmail.com",
      "password": "ismaelb1819"
  }
  JSON Response {
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiSXNtYWVsIiwibGFzdG5hbWUiOiJCLiIsInBhc3N3b3JkIjoiJDJiJDEwJFBXazdGam0xeUlLVXZNYkdZNFVYMmU1NHZOQzFxU29LLlV2TWRFY0dQSHI4MzU5YXlyOHQ2IiwiaWF0IjoxNjMxOTU3NjE4fQ.hZL9qiLFr1lAGyj3kMNC7EUtqxJ1ABrExjg9QHXm8G4"
  }
```

#### DELETE - delete - authentication required

```
/users/{userId}

```

### Products endpoints

#### INDEX - get

```
/products
  JSON Response [
    {
      "id": 1,
      "name": "RTX 3050",
      "price": 300,
      "category": "gaming"
    },
    {
      "id": 2,
      "name": "RTX 3060",
      "price": 400,
      "category": "gaming"
    },
    ...
  ]
```

#### SHOW - get

```
/products/{productId}
  JSON Response {
    "id": 2,
    "name": "RTX 3060",
    "price": 400,
    "category": "gaming"
  }
```

#### CREATE - post - authentication required

```
/products
  JSON Request Body {
    "name": "HP REVERB G2",
    "price": "499",
    "category": "hardware"
  }
  JSON Response {
    "id": 12,
    "name": "HP REVERB G2",
    "price": 499,
    "category": "hardware"
  }
```

#### UDPDATE - put - authentication required

```
/products/{productId}
  JSON Request Body {
      "category": "vr"
  }
  JSON Response {
    "id": 12,
    "name": "HP REVERB G2",
    "price": 499,
    "category": "vr"
  }
```

#### DELETE - delete - authentication required

```
/products/{productId}
```

### Orders endpoints

#### INDEX - get - authentication required

```
/users/{userId}/orders
  JSON Response [
    {
      "id": 3,
      "userid": 1,
      "status": "active",
      "lines": []
    },
    {
      "id": 1,
      "userid": 1,
      "status": "complete",
      "lines": [
        {
          "id": 1,
          "orderid": 1,
          "productid": 1,
          "quantity": 1,
          "name": "RTX 3050",
          "price": 300,
          "category": "gaming",
          "photo": "https://img.megasur.es/img/MGS0000000180-0.jpg"
        },
        {
          "id": 2,
          "orderid": 1,
          "productid": 2,
          "quantity": 1,
          "name": "RTX 3060",
          "price": 400,
          "category": "gaming",
          "photo": "https://www.profesionalreview.com/wp-content/uploads/2020/10/Nvidia-RTX-3090-Review08-1280x720.jpg"
        }
      ]
    }
  ]
```

#### INDEX (filtered) - get - authentication required

```
/users/{userId}/orders?status=complete
  JSON Response [
    {
      "id": 3,
      "userid": 1,
      "status": "complete",
      "lines": [
        {
          "id": 1,
          "orderid": 1,
          "productid": 1,
          "quantity": 1,
          "name": "RTX 3050",
          "price": 300,
          "category": "gaming",
          "photo": "https://img.megasur.es/img/MGS0000000180-0.jpg"
        },
      ]
    }
  ]
```

#### ACTIVE - get - get active order

```
/users/{userId}/orders/active
  JSON Response {
    "id": 3,
    "userid": 1,
    "status": "active",
    "lines": [
      {
        "id": 1,
        "orderid": 1,
        "productid": 1,
        "quantity": 1,
        "name": "RTX 3050",
        "price": 300,
        "category": "gaming",
        "photo": "https://img.megasur.es/img/MGS0000000180-0.jpg"
      },
      {
        "id": 2,
        "orderid": 1,
        "productid": 2,
        "quantity": 1,
        "name": "RTX 3060",
        "price": 400,
        "category": "gaming",
        "photo": "https://www.profesionalreview.com/wp-content/uploads/2020/10/Nvidia-RTX-3090-Review08-1280x720.jpg"
      }
    ]
  }
```

#### SHOW - get - authentication required + only authorized to own orders

```
/users/{userId}/orders/{orderId}
  JSON Response{
    "id": 3,
    "userid": 1,
    "status": "active",
    "lines": []
  }
```

#### UPDATE - put - authentication required + only authorized to own orders

```
/users/{userId}/orders/{orderId}
  JSON Request Body {
      "status": "active"
  }
  JSON Response {
    "id": 1,
    "userid": 1,
    "status": "complete",
    "lines": []
  }
```

#### UPDATE (add/update product+quantities)- put - authentication required + only authorized to own orders

```
/users/{userId}/orders/{orderId}/products/{productId}
  JSON Request Body {
    "quantity": 10
  }
  JSON Response {
    "id": 3,
    "userid": 1,
    "status": "active",
    "lines": [
      {
        "id": 1,
        "orderid": 1,
        "productid": 1,
        "quantity": 10,
        "name": "RTX 3050",
        "price": 300,
        "category": "gaming",
        "photo": "https://img.megasur.es/img/MGS0000000180-0.jpg"
      }
    ]
  }
```

#### CREATE - post - authentication required + only authorized to own orders

```
/users/{userId}/orders/
  JSON Response  {
    "id": 3,
    "userid": 1,
    "status": "active",
    "lines": []
  }
```

#### DELETE - delete - authentication required + only authorized to own orders)

```
/users/{userId}/orders/{orderId}
```

### Services endpoints

#### GET - returns top N products per included in orders (N can be decided as a query param)

```
/services/top-products?top=5
  JSON Response [
    {
      "product": 1,
      "name": "RTX 3050",
      "sales": "11"
    },
    {
      "product": 2,
      "name": "RTX 3060",
      "sales": "6"
    },
    {
      "product": 5,
      "name": "RTX 3070ti",
      "sales": "4"
    },
    {
      "product": 10,
      "name": "RTX 3090",
      "sales": "3"
    },
    {
      "product": 3,
      "name": "RTX 3070",
      "sales": "3"
    }
  ]
```

#### GET - returns products based on the category provided as a query param

```
/services/products?category=sports
  JSON Reponse [
    {
      "id": 4,
      "name": "DUMBELLS",
      "price": 80,
      "category": "sports"
    },
    {
      "id": 6,
      "name": "BALL",
      "price": 50,
      "category": "sports"
    }
  ]
```

## DEPENDENCIES

This application makes use of the following packages

### Typescript

- "@types/express": "^4.17.13"
- "@types/jasmine": "^3.8.2"
- "@types/node": "^16.7.5"
- "@types/supertest": "^2.0.11"
- "@types/bcrypt": "^5.0.0",
- "@types/jsonwebtoken": "^8.5.5",
- "@types/pg": "^7.14.7",
- "@typescript-eslint/eslint-plugin": "^4.29.3"
- "@typescript-eslint/parser": "^4.29.3"
- "ts-node": "^10.2.1"
- "typescript": "^4.4.2"
- "jasmine-ts": "^0.3.0"

### Code formating and eslint

- "eslint-plugin-import": "^2.24.2"
- "eslint": "^7.32.0"
- "prettier": "^2.3.2"

### Core modules

- "express": "^4.17.1"
- "body-parser": "^1.19.0",
- "dotenv": "^10.0.0",

### Authentication

- "bcrypt": "^5.0.1",
- "jsonwebtoken": "^8.5.1"

### Database

- "pg": "^8.5.1",
- "db-migrate": "^0.11.12",
- "db-migrate-pg": "^1.2.2",

### Testing

- "jasmine": "^3.9.0",
- "jasmine-spec-reporter": "^7.0.0"
- "supertest": "^6.1.6
