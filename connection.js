// Requiring in the node modules needed to run this app
var mysql = require("mysql");
var Credentials = require("./credentials");

// Creating credentials
var credentials = new Credentials();

// Establishing the connection to the bamazonDB database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: credentials.user,

    // Your password
    password: credentials.password,
    database: "bamazonDB"
});

module.exports = connection;