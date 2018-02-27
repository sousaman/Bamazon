// Requiring in the node modules needed to run this app
var inquirer = require("inquirer");
var connection = require("./connection");
var inventory = require("./inventory");

// Connecting to the database and then running the outputTable function
connection.connect(function (err) {
    if (err) throw err;
    // Start to output the options for the managers to act one
    promptManagers();
});

// Function to prompt the managers for the action they want to take
var promptManagers = function () {
    inquirer.prompt([
        {
            name: "action",
            message: "What action would you like to take?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            type: "rawlist"
        }
    ]).then(function (answers) {

        // Switch-case statement to take the action the manager chooses to take
        switch (answers.action) {

            case "View Products for Sale":
                inventory("Manager");
                connection.end();
                break;

            case "View Low Inventory":
                inventory("Low");
                connection.end();
                break;

            case "Add to Inventory":
                addToInventory();
                break;

            case "Add New Product":
                addProduct();
                break;
        }
    })
}

// Function to add items to the inventory of an item that already exist in bamazonDB
var addToInventory = function () {

    // Initializing arrays to store values returned from query of bamazonDB
    var currentInventory = [];
    var currentQuantity = [];

    // Query to pull all products from bamazonDB
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // Loop to store all the products returned from query
        for (i = 0; i < res.length; i++) {
            currentInventory.push(res[i].product_name + "-" + res[i].item_id);
            currentQuantity.push(res[i].stock_quantity);
        }

        // Prompts manager to select the item they want to add inventory to and the number they want to add
        inquirer.prompt([
            {
                name: "items",
                message: "For which item would you like to add inventory?",
                choices: currentInventory,
                type: "rawlist",
                pageSize: 100
            }, {
                name: "units",
                message: "How much inventory will you be adding?",
                validate: function (value) {
                    if (isNaN(value) === false && parseInt(value) > 0) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answers) {
            // Raw list doesn't allow number to lead so fixed that by concatenating the product name and item id
            var splitInventory = String(answers.items).split("-");
            var inventoryName = splitInventory[0];
            var inventoryId = splitInventory[1];
            var currentStock = currentQuantity[currentInventory.indexOf(answers.items)];

            // Query to update bamazonDB with products
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: parseInt(answers.units) + parseInt(currentStock)
                    },
                    {
                        item_id: parseInt(inventoryId)
                    }
                ],
                function (err, res) {
                    if (err) throw err;

                    // Output to manager
                    console.log(answers.units + " units of " + inventoryName + " successfully added to inventory");
                    connection.end();
                }
            );
        })
    })
}

var addProduct = function () {

    // Prompts manager for the necessary information to add a product
    inquirer.prompt([
        {
            name: "name",
            message: "What is this products name?",
            validate: function (value) {
                if (value != '' && value != null && value != undefined) {
                    return true;
                }
                return false;
            }
        }, {
            name: "department",
            message: "What department does this product fall under?"
        }, {
            name: "price",
            message: "What should the price be for this product?",
        }, {
            name: "quantity",
            message: "How much of this product will we have in stock?",
        }
    ]).then(function (answer) {

        // Query to add product to bamazonDB
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.name,
                department_name: answer.department,
                price: parseFloat(answer.price),
                stock_quantity: parseFloat(answer.quantity)
            },
            function (err, res) {

                // Output to manager
                console.log(res.affectedRows + " product inserted!\n");
                connection.end();
            }
        );
    })
}