// Requiring in the node modules needed to run this app
var inquirer = require("inquirer");
var connection = require("./connection");
var Table = require('cli-table');
var colors = require('colors');

// Setting a few color themes
colors.setTheme({
    gain: 'green',
    profit: 'blue',
    loss: 'red'
});

// Connecting to the database and then running the promptSupervisors function
connection.connect(function (err) {
    if (err) throw err;
    // Start to output the options for the supervisors to act one
    promptSupervisors();
});

// Function to prompt supervisor for the action they want to take
var promptSupervisors = function () {
    inquirer.prompt([
        {
            name: "action",
            message: "What action would you like to take?",
            choices: ["View Product Sales by Department", "Create New Department"],
            type: "rawlist"
        }
    ]).then(function (answers) {

        // Switch-case statement to take the action the supervisor chooses
        switch (answers.action) {

            case "View Product Sales by Department":
                productSales();
                break;

            case "Create New Department":
                createDepartment();
                break;
        }
    })
}

// Function to output the current product sales in the profit loss database
var productSales = function () {
    
    // Initializing table constructor pulled from cli-table npm library
    var table = new Table({
        head: ['Department ID'.rainbow, 'Department Name'.america, "Overhead Costs".loss, "Product Sales".gain, "Total Profit".profit]
        , colWidths: [20, 20, 20, 20, 20]
    });

    // Query to pull a join of the department table and then product table
    var query = connection.query(
        "SELECT products.department_name, departments.department_id, departments.over_head_costs, SUM(products.product_sales) AS total_product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profits FROM departments INNER JOIN products ON products.department_name = departments.department_name GROUP BY departments.department_id",
        function (err, res) {

            // Loop to iterate through the result of the JOIN query which will have all of the product sales summed by department while also calculating total profits
            for (i = 0; i < res.length; i++) {

                // Push each result to the table
                table.push([String(res[i].department_id).rainbow, String(res[i].department_name).america, String(res[i].over_head_costs).loss, String(res[i].total_product_sales).gain, String(res[i].total_profits).profit]);

                // Query to update departments table with product sales for each department
                connection.query("UPDATE departments SET ? WHERE ?",
                    [
                        {
                            product_sales: res[i].total_product_sales
                        },
                        {
                            department_id: res[i].department_id
                        }
                    ],

                    // Catches an error if there is one
                    function (err, res) {
                        if (err) throw err;
                    }
                );
            }

            // Outputs the table to the command line and ends connection
            console.log(table.toString());
            connection.end();
        }
    );

}

// Fucnction to prompt the supervisor for the information necessary to create a new department
var createDepartment = function () {
    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the department being added?",
            validate: function (value) {
                if (value != '' && value != null && value != undefined) {
                    return true;
                }
                return false;
            }
        }, {
            name: "overhead",
            message: "What will the overhead cost be for this department?",
            validate: function (value) {
                if (isNaN(value) === false && parseInt(value) >= 0) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {

        // Query to insert a new department in the departments table
        var query = connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.name,
                over_head_costs: answer.overhead
            },
            function (err, res) {
                if (err) {throw err}
                console.log(String(answer.name + " department inserted!\n").rainbow);
                console.log("We're a fun company. We have fun here".america);
                connection.end();
            }
        );
    })
}