# Bamazon

## Description
Bamazon is a 3 phase app. There are applications for customers, managers, and supervisors. (To successfully run this, you will need to create a MySQL server running locally, and then you will need to run the script in the bamazonDB.sql file to create the database. Also, the user and password will need to be fed in by creating a Credentials constructor that holds both values which is then fed into connection.js so all 3 phases of the app will work)

### Bamazon Customers
For customers to buy items, they must run bamazonCustomer.js. This will welcome them and output Bamazon's current wares. It will then prompt the customer to choose the item id of the products listed.

![Alt text](/images/customer/Welcome.gif?raw=true "Welcome to Bamazon")

After the ID has been chosen, it prompts the user to enter how many they would like to buy.
If there is enough stock to fulfill the order, the user will have their price output.

![Alt text](/images/customer/Working.gif?raw=true "Working Example")

Otherwise, the user will be told there isn't enough stock to fulfill their order

![Alt text](/images/customer/TooMany.gif?raw=true "Ordered Too Much")

### Bamazon Managers

Work in progress

### Bamazon Supervisors

Work in progress.
