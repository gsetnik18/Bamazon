var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var inventory = [];

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "BuildsADam52!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
    //createProduct();
});

var getProducts = function () {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: "input",
                message: "What would you like to purchase?",
                name: "id",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(answers => {
            //checks if item id exists
            for (var i = 0; i < inventory.length; i++) {
                if (answers.id == inventory[i].item_id) {
                    quantity(inventory[i]);
                }
                else {
                    console.log("We do not carry that. Soz.");
                    
                }
            }
        });
};

var quantity = function (item) {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: "input",
                message: "How much would you like to purchase?",
                name: "amount"
            }
        ])
        //responses for quantity
        .then(answers => {
            if (answers.amount <= item.stock_quantity) {
                console.log("Coming right up!")
            }
            else {
                console.log("We don't have enough in stock.");
                getProducts();
            }
        });
};

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        inventory = res;
        getProducts();
    });
};