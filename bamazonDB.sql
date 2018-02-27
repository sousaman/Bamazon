DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL DEFAULT '',
  department_name VARCHAR(45) NOT NULL DEFAULT 'General',
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock_quantity INT(11) NOT NULL DEFAULT 0,
  product_sales DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT(11) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL DEFAULT '',
  over_head_costs DECIMAL(11,2) NOT NULL DEFAULT 0.00,
  product_sales DECIMAL(11,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, price ,stock_quantity, department_name, product_sales)
VALUES ("barbell", 49.99, 10, "Health & Fitness", 10000), ("dumbbell pair", 39.99, 10, "Health & Fitness", 6500), ("45lbs plate", 19.99, 6, "Health & Fitness", 25000);
INSERT INTO products (product_name, price ,stock_quantity, department_name, product_sales)
VALUES ("food scale", 29.99, 15, "Kitchen", 40000), ("Top Chef Knife Set", 249.99, 1, "Kitchen", 249.99), ("Tupperware 5ct", 9.99, 10, "Kitchen", 63259.45);
INSERT INTO products (product_name, price ,stock_quantity, department_name, product_sales)
VALUES ("Horizon Zero Dawn", 59.99, 5, "Movies & Games", 5000), ("Madden 2018", 59.99, 5, "Movies & Games", 7800), ("One Punch Man Season 1 Box Set", 39.99, 2, "Movies & Games", 90000);
INSERT INTO products (product_name, price ,stock_quantity, department_name, product_sales)
VALUES ("Pony", 49999.99, 1, "Livestock", 100000.49);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Health & Fitness", 20000), ("Kitchen", 10000), ("Movies & Games", 1000), ("Livestock", 40000), ("General", 10000);