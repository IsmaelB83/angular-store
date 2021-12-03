# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page.
You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## CONTENTS

- [API Endpoints](#API-Endpoints)
  - [Users](#Users)
  - [Products](#Products)
  - [Orders](#Orders)
  - [Services](#Services)
- [DB Schema](#DB-Schema)

## API Endpoints

#### Users

- Index [token required] --- http//127.0.0.1:3000/users (get)
- Show [token required] --- http//127.0.0.1:3000/users/1 (get)
- Create --- http//127.0.0.1:3000/users (post)
- Authenticate --- http//127.0.0.1:3000/auth (post)
- Delete --- http//127.0.0.1:3000/users/1 (delete)

#### Products

- Index --- http//127.0.0.1:3000/products (get)
- Show --- http//127.0.0.1:3000/products/1 (get)
- Create [token required] --- http//127.0.0.1:3000/products (post)
- Update [token required] --- http//127.0.0.1:3000/products/1 (put)
- Delete [token required] --- http//127.0.0.1:3000/products/1 (delete)

#### Orders

- Index orders of auser [token required] --- http//127.0.0.1:3000/users/1/orders (get)
- Active orders of a user [token required] --- http//127.0.0.1:3000/users/1/orders?status=active (post)
- Completed orders of a user [token required] --- http//127.0.0.1:3000/users/1/orders?status=completed (post)
- Show order of a user [token required] --- http//127.0.0.1:3000/users/1/orders/1 (post)
- Update order of a user [token required] --- http//127.0.0.1:3000/users/1/orders/1 (put)
- Add/Update product quantity in order[token required] --- http//127.0.0.1:3000/users/1/orders/1/products/1 (post)
- Create new order in user [token required] --- http//127.0.0.1:3000/users/1/orders (post)
- Delete order from a user [token required] --- http//127.0.0.1:3000/users/1/orders/1 (delete)

#### Services

- 5 most popular products --- http//127.0.0.1:3000/services/top-products?top=5 (get)
- Products by category --- http//127.0.0.1:3000/services/products?category=xyz (get)

## DB Schema

### User

- Users (id SERIAL PRIMARY KEY, email VARCHAR(100) NOT NULL UNIQUE, firstname VARCHAR(20), lastname VARCHAR(20), password VARCHAR(200)

### Product

- Products (id SERIAL PRIMARY KEY, name VARCHAR(20) NOT NULL, price INTEGER NOT NULL, category VARCHAR(15)

### Orders

- Orders (id SERIAL PRIMARY KEY, userid INTEGER, status VARCHAR(8), FOREIGN KEY(userid) REFERENCES users(id))

### Orders-Products

This entity derives from the N:N relation between orders and products

- OrderProducts (id SERIAL PRIMARY KEY, orderid INTEGER, productid INTEGER, quantity INTEGER, FOREIGN KEY(orderid) REFERENCES orders(id), FOREIGN KEY(productid) REFERENCES products(id)
