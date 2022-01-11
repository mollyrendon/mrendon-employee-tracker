/*Require Section:
This creates a connection to the database "employees" and assigns it to the variable "connection".
The host is "localhost", the port is "3306", the user is "root" and the password is "dog-fan-45-twenty!".  
*/

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

let connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "dog-fan-45-twenty!",
    database: "employees"
})

