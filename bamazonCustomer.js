// Requiring in the node modules needed to run this app
var inquirer = require("inquirer");
var connection = require("./connection");
var inventory = require("./inventory");
var colors = require('colors');

// Connecting to the database and then running the outputTable function
connection.connect(function (err) {
    if (err) throw err;
    // Welcomes customer to Bamazon
    console.log("Hello and Welcome to Bamazon.\nHere is a list of the items we have for sale:\n".rainbow);

    // Function that will output Bamazon's wares then will prompt user to choose item then starts promptUser function
    inventory("Customer", promptUser);

});

// Function that will prompt the user to choose an item and the number of that item they want
var promptUser = function () {

    // Inquirer being used to prompt user
    inquirer.prompt([
        {
            name: "itemId",
            message: "What is the ID of the product you want to buy?"
        }, {
            name: "units",
            message: "How many would you like to buy?",
            // Validating that the user is actually entering a valid number
            validate: function (value) {
                if (isNaN(value) === false && parseInt(value) > 0) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answers) {
        // Once the user answers both of the above question, query bamazonBD for the item ID chosen
        var query = connection.query("SELECT stock_quantity, product_name, product_sales, price FROM products WHERE ?",
            {
                item_id: answers.itemId
            }, function (err, res) {
                if (err) throw err;

                // Output to customer total price for the number of units they ordered of the product they selected
                var cost = parseFloat(res[0].price) * parseInt(answers.units);

                // Save additional results of the query
                var unitsRemaining = parseInt(res[0].stock_quantity) - parseInt(answers.units);
                var itemName = res[0].product_name;
                var productSales = parseFloat(res[0].product_sales);
                var totalProductSales = productSales + cost;



                // If there is enough stock to fulfill request, process this code
                if (unitsRemaining >= 0) {

                    // Query database to update the stock of the item being ordered
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: unitsRemaining,
                                product_sales: totalProductSales
                            },
                            {
                                item_id: answers.itemId
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(String("\nYou have purchased " + answers.units + " of " + itemName + "s for " + cost.toFixed(2) + "\n").america);
                            connection.end();
                        }
                    );
                }

                // If there isn't enough stock to fulfill the user's request, evaluate this code
                else {
                    console.log("Your order exceeds what we can currently fulfill. Please adjust the units you are asking for and try agian.".red);
                    connection.end();
                }
            });
    })
}