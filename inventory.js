// Requiring in the node modules needed to run this app
var inquirer = require("inquirer");
var connection = require("./connection");

var outputInventory = function (user, func) {

    // Query to pull all the products listed in bamazonDB
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // Loop to output all the items
        if (user === 'Customer') {
            for (i = 0; i < res.length; i++) {
                console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nPrice: " + res[i].price +"\n\n");
            }
            func();
        }
        else if (user === 'Low') {
            console.log("The following items have a low inventory:\n")
            for (i = 0; i < res.length; i++) {
                if (res[i].stock_quantity < 5) {
                    console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nPrice: " + res[i].price +"\n\n");
                } 
            }
        }
        else {
            for (i = 0; i < res.length; i++) {
                console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nPrice: " + res[i].price + "\nQuantity In Stock: " + res[i].stock_quantity + "\n\n");
            }
        }
    });
}

module.exports = outputInventory;