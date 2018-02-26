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

var promptManagers = function () {
    inquirer.prompt([
        {
            name: "action",
            message: "What action would you like to take?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            type: "rawlist"
        }
    ]).then(function (answers) {
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

var addToInventory = function () {
    var currentInventory = [];
    var currentQuantity = [];
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            currentInventory.push(res[i].product_name + "-" + res[i].item_id);
            currentQuantity.push(res[i].stock_quantity);
        }
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
                    console.log(answers.units + " units of " + inventoryName + " successfully added to inventory");
                    connection.end();
                }
            );
        })
    })
}

var addProduct = function () {
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
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.name,
                department_name: answer.department,
                price: parseFloat(answer.price),
                stock_quantity: parseFloat(answer.quantity)
            },
            function (err, res) {
                console.log(res.affectedRows + " product inserted!\n");
                connection.end();
            }
        );
    })
}