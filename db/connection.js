/*Require Section:
This creates a connection to the database "employees" and assigns it to the variable "connection".
The host is "localhost", the port is "3306", the user is "root" and the password is "dog-fan-45-twenty!".  
*/

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { CLIENT_SECURE_CONNECTION } = require("mysql/lib/protocol/constants/client");

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
This inquirer prompt gives the user a list of choices for what they would like to do.  After the user choices an answer it will execute that function.
For example the first case is when the user selects "View all departments".  The code calls viewDepartments() which displays all departments 
in an array on the screen.  Each choice has a break statement at the end to allow the user to break out of the function.
*/
function runSearch() {
    inquirer
    .prompt({
        name:"userChoices",
        type: "list",
        message: "What would you like to do?",
        choices: ["View all departments.", "View all employees.", "View all employees by department.", "View all employees by manager.", "Add employee.", "Remove employee.", "Update employee role.", "Update employee manager.", "End session."]
    })
    .then(function(answewr) {
        switch (answewr.userChoices) {
            case "View all departments.":
                viewDepartments();
                break;

            case "View all employees.":
                viewEmployees();
                break;

            case "View all employees by department.":
                viewEmpsByDept();
                break;

            case "View all employees by manager.":
                viewEmpsByMgr();
                break;

            case "Add employee.":
                addEmployees();
                break;

            case "Remove employee.":
                removeEmployee();
                break;

            case "Update employee role.":
                updateEmpRole();
                break;

                case "Update employee manager.":
                    updateEmpMgr();
                    break;

                case "End session.":
                    endSession();
                    break;
        }
    });
}

/*View Departments Function:
This is a function that queries the database for all departments and then prints them out into a table.  It starts by declaring a connection variable 
which is used to query the database.  It then calls the query method on this connection object with "Select id, dept_name, budget FROM department" as its argument.
It will return an array of objects from the database containing information about each department: their ID number, name of the department, budget for the
department and whether or not they are currently being used.  There is also an if statement to check if there were any errors while querying for departments.  If
there are no errors it continues executing the code, if there is an error it stops executing the function.  
*/

function viewDepartments() {
    connection.query("Select id, dept_name, budget FROM department", function (err, res){
        if (err) throw err;
        console.table('Departments', res);
        runSearch()
    })
}





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

