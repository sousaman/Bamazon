DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45),
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock_quantity INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, price ,stock_quantity, department_name)
VALUES ("barbell", 49.99, 10, "Health & Fitness"), ("dumbbell pair", 39.99, 10, "Health & Fitness"), ("45lbs plate", 19.99, 6, "Health & Fitness");

INSERT INTO products (product_name, price ,stock_quantity, department_name)
VALUES ("food scale", 29.99, 15, "Kitchen"), ("Top Chef Knife Set", 249.99, 1, "Kitchen"), ("Tupperware 5ct", 9.99, 10, "Kitchen");

INSERT INTO products (product_name, price ,stock_quantity, department_name)
VALUES ("Horizon Zero Dawn", 59.99, 5, "Movies & Games"), ("Madden 2018", 59.99, 5, "Movies & Games"), ("One Punch Man Season 1 Box Set", 39.99, 2, "Movies & Games");

INSERT INTO products (product_name, price ,stock_quantity, department_name)
VALUES ("Pony", 49999.99, 1, "Livestock");