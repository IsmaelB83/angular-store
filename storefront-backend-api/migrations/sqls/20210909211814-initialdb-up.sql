CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    password VARCHAR(200)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(15),
    photo VARCHAR(250)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userid INTEGER,
    status VARCHAR(8),
    FOREIGN KEY(userid) REFERENCES users(id)
);

CREATE TABLE orderproducts (
    id SERIAL PRIMARY KEY,
    orderid INTEGER,
    productid INTEGER,
    quantity INTEGER,
    FOREIGN KEY(orderid) REFERENCES orders(id),
    FOREIGN KEY(productid) REFERENCES products(id)
);