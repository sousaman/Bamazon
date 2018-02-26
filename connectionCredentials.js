// Requiring in the node modules needed to run this app
var mysql = require("mysql");

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

module.exports = connection;