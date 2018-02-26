# Bamazon

## Description
Bamazon is a 3 phase app. There are applications for customers, managers, and supervisors. (To successfully run this, you will need to create a MySQL server running locally, and then you will need to run the script in the bamazonDB.sql file to create the database. Also, the user and password will need to be fed in by creating a Credentials constructor that holds both values which is then fed into connection.js so all 3 phases of the app will work)

### Bamazon Customers
Bamazon customers can buy items from our store. They must run bamazonCustomer.js. This will welcome them and output Bamazon's current wares. It will then prompt the customer to choose the item id of the products listed.

![Alt text](/images/customer/Welcome.gif?raw=true "Welcome to Bamazon")

After the ID has been chosen, it prompts the user to enter how many they would like to buy.
If there is enough stock to fulfill the order, the user will have their price output.

![Alt text](/images/customer/Working.gif?raw=true "Working Example")

Otherwise, the user will be told there isn't enough stock to fulfill their order

![Alt text](/images/customer/TooMany.gif?raw=true "Ordered Too Much")

### Bamazon Managers

Our Bamazon Manager have the ability to do one of four actions. The app will prompt them for which one they want to do:
* View Products for Sale - This will print out all of the products that Bamazon has for sale, including the quantity we have in stock

![Alt text](/images/manager/Products.gif?raw=true "View Products")


* View Low Inventory - This will show the manager all of the products in Bamazon that only has 4 or fewer items in stock.

![Alt text](/images/manager/LowCount.gif?raw=true "View Low Inventory")


* Add to Inventory - This is self explanitory. The manager will be able to add inventory to any item already in Bamazon

![Alt text](/images/manager/AddCount.gif?raw=true "Add to Inventory")
![Alt text](/images/manager/AddCount2.gif?raw=true "Add to Inventory 2")
![Alt text](/images/manager/AddCount3.gif?raw=true "Add to Inventory 3")


* Add New Product - Also self explanitory. This will let our manager add a new item to Bamazon

![Alt text](/images/manager/NewProduct.gif?raw=true "Add New Product")
![Alt text](/images/manager/NewProduct2.gif?raw=true "Add New Product 2")


### Bamazon Supervisors

Work in progress.
