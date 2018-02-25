// Requiring in the node modules needed to run this app
var mysql = require("mysql");
var inquirer = require("inquirer");

// Establishing the connection to the bamazonDB database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "",

    // Your password
    password: "",
    database: "bamazonDB"
});

// Connecting to the database and then running the outputTable function
connection.connect(function (err) {
    if (err) throw err;
    console.log("Hello and Welcome to Bamazon.\nHere is a list of the items we have for sale:\n");
    outputTable();
});

var outputTable = function () {
    var itemIds = [];
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nPrice: " + res[i].price +"\n\n");
        }
        promptUser();
    });
}

var promptUser = function () {
    inquirer.prompt([
        {
            name: "itemId",
            message: "What is the ID of the product you want to buy?"
        }, {
            name: "units",
            message: "How many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false && parseInt(value) > 0) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answers) {
        var query = connection.query("SELECT stock_quantity, product_name FROM products WHERE ?",
            {
                item_id: answers.itemId
            }, function (err, res) {
                if (err) throw err;
                var itemName = res[0].product_name;
                if (parseInt(res[0].stock_quantity) - parseInt(answers.units) > 0) {
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (parseInt(res[0].stock_quantity) - parseInt(answers.units)).toFixed(2)
                            },
                            {
                                item_id: answers.itemId
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            var query = connection.query("SELECT price FROM products WHERE ?",
                                {
                                    item_id: answers.itemId
                                }, function (err, res) {
                                    if (err) throw err;
                                    var cost = parseFloat(res[0].price) * parseInt(answers.units);
                                    console.log("\nYou have purchased " + answers.units + " of " + itemName + "s for " + cost.toFixed(2) + "\n");
                                    connection.end();
                                });
                        }
                    );
                }
                else {
                    console.log("Your order exceeds what we can currently fulfill. Please adjust the units you are asking for and try agian.");
                    connection.end();
                }
            });
    })
}