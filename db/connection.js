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

/*Connection:
This creates a new connection object, the fonnection is then connected to the function that will run when it's created.
The connection is then connected to the function that will run when it's created.  It will log "connected as id" and runs the search function.  
*/
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadID + "\n");
    runSearch();
})

/*Run Search:
This inquirer prompt gives the user a list of choices for what they would like to do.  After the user gives an answer it will

*/



/*Add Employees Function:
This function will use the inquirer prompt to ask the user several questions to add a new employee.
It asks for the first name, last name, department, salary, and manager.  The department and manager prompts give the user
a list to choose options from and the rest of the prompts are input prompts for the user to type their answers.
*/
function addEmployees() {
    inquirer
    .prompt([
        {
            name: "newEmpFirstName",
            type: "input",
            message: "What is the first name of the employee? (Required.)"
        },
        {
            name: "newEmpLastName",
            type: "input",
            message: "What is the last name of the employee? (Required.)" 
        },
        {
            name: "newEmpDept",
            type: "list",
            message: "What is the department of the employee? (Required)",
            choices: ['Diplomatic Relations', 'Ship Security', 'Medical Personel', 'Assistants', 'AnlaShok']
        },
        {
            name: "newEmpSalary",
            type: "input",
            message: "What is the salary of the employee? (Required)"
        },
        {
            name: "newEmpManager",
            type: "list",
            message: "Who will be the manager of the employee? (Required)",
            choices: ['John Sheridan', 'Delenn', 'Michael Garibaldi']
        }
    ])
}

