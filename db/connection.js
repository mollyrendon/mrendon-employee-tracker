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
    database: "employee"
});


/*Connection:
A new connection object is created with the connect() method which takes in a callback function that will be called when the connection has been established.  The callback function then calls runSearch().
*/
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadID + "\n");
    runSearch();
});


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
        choices: ["View all departments.", "View all employees.", "View all employees by department.", "View all employees by manager.", "Add employee.", "Remove employee.", "Update employee role.", "End session."]
    })
    .then(function(answer) {
        switch (answer.userChoices) {
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
    connection.query("SELECT id, dept_name, budget FROM department", function (err, res){
        if (err) throw err;
        console.table('Departments', res);
        runSearch()
    })
}

/*View Employees Function:
The function queries the database for all employees and all related information, id, first_name, last_name, dept_name, salary, roles_title and mrg_name. 
*/
function viewEmployees() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.dept_name, employee.salary, roles.title, mgr_name ";
    query += "FROM employee ";
    query += "INNER JOIN department ON employee.emp_dept = department.dept_name ";
    query += "INNER JOIN roles ON department.id = roles.department_id ";
    query += "LEFT JOIN manager ON employee.manager_id = manager.id ";

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Employees', res);
        runSearch()
    })
}

/*View Employees by Department Function:
This function queries the database for all of the employees in a given department.  The code first creates a query that will 
return the employee's ID, first_name, last_name, and salary. It then finds the department by using a join statement, INNER JOIN, with another table called "employee"
and then orders them, ORDER BY statement, by their department number.  

*/
function viewEmpsByDept() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.dept_name ";
    query += "FROM department ";
    query += "INNER JOIN employee ON employee.emp_dept = department.dept_name ";
    query += "ORDER BY department.dept_name ";

    connection.query(query, function (err, res){
        if (err) throw err;
        console.table('Employees by Department', res);
        runSearch()
    })
}


/*View Employees by Manager Function:
This function queries the database for all of the employees who are managed by a given manager.  The two tables, employee info and manager info, are joined together using INNER JOIN so that each row has both
colums filled out with data from both tables, the id column is shared between then.  It then orders these row alphabetically based on their mgr_name field using ORDER BY class at the end of the statement.  This will
print out a table of employees by their manager.  
*/
function viewEmpsByMgr() {
    let query = "SELECT manager.id, manager.mgr_name, employee.first_name, employee.last_name ";
    query += "FROM manager ";
    query += "INNER JOIN employee ON manager.id = employee.manager_id ";
    query += "ORDER BY manager.mgr_name ";
    connection.query(query, function (err, res){
        if (err) throw err;
        console.table('Employees By Manager', res);
        runSearch()
    })
}


/*Add Employee Function:
This function will use the inquirer prompt to ask the user several questions to add a new employee.  It asks for the first name, last name, department, salary, and manager.  The department and manager prompts give the user
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
            choices: ['John Sheridan', 'Delenn', 'Michael Garibaldi', "No one"]
        },
        {
            name: "newEmpRole",
            type: "list",
            message: "What will the role of the new employee be? (Required)",
            choices: ['Diplomat', 'Security Officer', 'Doctor', 'Diplomat Assistants', 'Ranger']
        }
    ])

    .then(function(answer) {
        var newEmpsMgr = " "

        if (answer.newEmpManager === "John Sheridan") {
            newEmpsMgr = 1;
        }

        if (answer.newEmpManager === "Ambassador Delenn") {
            newEmpsMgr = 2;
        }

        if (answer.newEmpManager === "Michael Garibaldi") {
            newEmpsMgr = 3;
        }

        if(answer.newEmpManager === "No one") {
            newEmpsMgr = null;
        }

        var newEmpsRole = " ";

        if (answer.newEmpRole === "Diplomat") {
            newEmpsRole = 2;
        }

        if (answer.newEmpRole === "Security Officer") {
            newEmpsRole = 3;
        }

        if (answer.newEmpRole === "Doctor") {
            newEmpsRole = 4;
        }

        if (answer.newEmpRole === "Diplomat Assistants") {
            newEmpsRole = 5;
        }

        if (answer.newEmpRole === "Ranger") {
            newEmpsRole = 6;
        }

        var query = connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.newEmpFirstName,
                last_name: answer.newEmpLastName,
                emp_dept: answer.newEmpDept,
                salary: answer.newEmpSalary,
                roles_id: newEmpsRole,
                manager_id: newEmpsMgr 
            },

            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee added!\n");
                runSearch()
            }
        )
    })
}


/*Update Employee Role Function:
This function queries the database to find all employees in a department and their respective roles.  It uses the INNER JOIN statement to join the employee table with the department table.  
The query then uses an OUTER JOIN statement to join the roles table with the department and employee tables.  
*/
function updateEmpRole() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.dept_name, employee.roles_id, roles.title ";
    query += "FROM employee ";
    query += "INNER JOIN department ON employee.emp_dept = department.dept_name ";
    query += "INNER JOIN roles ON department.id = roles.department_id ";

    connection.query(query, function(err, results) {
        if (err) throw err;


/*Employee Update prompt and Function:
This function and prompt asks the user for their choice of employee's role.  It updates the employee's role based off of the user's answer.  The choices part of the prompt is different because instead of having 
pre selected choices, instead an array called "results" is declared, with one element insde it (which is an empty string).  Meaning, there are no results yet because no questions have been asked yet.
Next, another called called "empUpdateArray" is called, this array will hold all of the employees who have been updated so far.  A new variable called "empUpdateArray" is created and will push each employee into it 
using JavaScript's Array method push().  After that another function called "roleUpdate" is declared and it takes one argument, a list, and returns whatever list was passed in as its message property.    
*/
        inquirer
        .prompt([
            {
                name: "choice",
                type: "rawlist",
                message: "Which employee's role do you want to update?",
                choices: function() {
                    let choiceArray = [];
                        for (let i=1; i < results.length; i++) {
                            let emp = " ";
                            emp = `${results[i].id} ${results[i].first_name} ${results[i].last_name} ${results[i].dept_name} ${results[i].roles_id} ${results[i].title}`
                            choiceArray.push(emp)
                        }
                        return choiceArray;
                }
            },
            {
                name: "roleUpdate",
                type: "list",
                message: "What role do you want to update this employee's role to?",
                choices: ['Security Officer', 'Doctor', 'Diplomat Assistants', 'Ranger']
            }
        ])

        .then(function(answer){
            updateToChosenRole(answer);
            return answer;
        })
    })
}

function updateToChosenRole(answer) {
    let newRoleId = 0;
    let newDept = "";
    let newMgr = "";

    if (answer.roleUpdate === "Diplomat") {
        newRoleId = 2;
        newDept = "Diplomatic Relations";
        newMgr = 2;
    }
    if (answer.roleUpdate === "Security Officer") {
        newRoleId = 3;
        newDept = "Ship Security";
        newMgr = 3;
    }
    if (answer.roleUpdate === "Doctor") {
        newRoleId = 4;
        newDept = "Medical Personel";
        newMgr = 1;
    }
    if (answer.roleUpdate === "Diplomat Assistants") {
        newRoleId = 5;
        newDept = "Assistants";
        newMgr = 2;
    }
    if (answer.roleUpdate === "Ranger") {
        newRoleId = 6;
        newDept = "Anlashok";
        newMgr = 2;
    }

    let choiceStr = answer.choice.split(" ")
    console.log(answer);
    console.log(choiceStr[0]);

    connection.query(
        "UPDATE employee SET ? WHERE ? ",
        [
            {
                roles_id: newRoleId,
                emp_dept: newDept, 
                manager_id: newMgr
            },
            {
                id: parseInt(choiceStr[0])
            }
        ],
        function(error, res) {
            if (error) throw error;
            console.log(res.affectedRows + " You have UPDATED the role of the employee!");
            runSearch();
        }
    )
}

/*Remove Employee Function:
This function asks the user, through an inquirer prompt, what employee they want to remove.  Then it queries for all employees from our database using connection.query().  As long as there isn't an error
the information about every employee in the database, their id, first_name, and last_name gets returned.  This information is used to create an array called choiceArray that contains all possible combinations
of the employee id, first_name, and last_name.  Now having access to these combinations it makes it easier and quicker to find the employee the user wants to remove.  After choosing from the list of employees
the user is then able to remove the employee of their choice.
*/
function removeEmployee() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name ";
    query += "FROM employee ";
    connection.query(query, function(err, results) {
        if (err) throw err;

        inquirer
        .prompt([
            {
                name: "choice",
                type: "rawlist",
                message: "What employee do you want to remove?",
                choices: function() {
                    let choiceArray = [];
                        for (let i=1; i < results.length; i++) {
                            let emp = " ";
                            emp = `${results[i].id} ${results[i].first_name} ${results[i].last_name}`
                            choiceArray.push(emp)
                        }
                        return choiceArray;
                }
            }
        ])
            .then(function(answer){
                deleteRemovedEmp(answer);
                return answer;
            })
    })
}

/*Delete Removed Employee:
This starts by declaring a variable called answer, the value of the answer is set to employee 1.  The code then declares a function called deleteRemovedEmp, which takes one argument, an employee's ID
number.  This function will be used later in the program to delete that specific employee from the database.  The next part splits up the string into individual characters and assigns them to
variables named choiceStr and connection.  Next, it uses connection's query method with two arguments, "DELETE FROM employee WHERE?"" and [{id: paseInt(choiceStr[0])}].  The first argument is where we 
specify what table we want to query (employee) while the second argument is an array of values for each row in that table (the id).  If there are no erros this function returns true it returns the data, 
the employee is deleted and the console.log message informing the user appears.  If false then it throws an error message on the screen.
*/

function deleteRemovedEmp(answer) {
    let choiceStr = answer.choice.split(" ");
    connection.query(
        "DELETE FROM employee WHERE ?",
        [
            {
                id: parseInt(choiceStr[0])
            }
        ],

        function(error, res) {
            if (error) throw error;
            console.log(res.affectedRows + "You have DELETED the Employee!");
        runSearch();
        }
    )
}

function endSession() {
    console.log("End of session.  Thank you and goodbye!");
    connection.end();
}