DROP DATABASE IF EXISTS glosdb;
CREATE DATABASE glosdb;

\c glosdb;

CREATE TABLE IF NOT EXISTS glos_users (
    id SERIAL UNIQUE PRIMARY KEY,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    email VARCHAR(30),
    zipcode CHAR(5)
);


INSERT INTO glos_users (firstname, lastname, email, zipcode)
VALUES 
();