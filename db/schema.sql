DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

--Department Table:
--This creates a table called department.  It creates a primary key for the
--table which is id.  The department name (dept_name) column is not nullable and has
--a maximum length of 30 characters.  The utilized_budget column is decimal and has an
--auto-incrementing integer value that starts at 1.

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    budget DECIMAL,
    PRIMARY KEY (id)
;)

--Roles Table:
--This creates a table called roles.  The pirmary key is the id column.  It also has a title column that can have up to 30 characters
--in it as well as a salary column that has number values.  There is also an optional department_id
--column which references the department ID of each employee's record in the database.  This code creates two foreign keys,
--one for employees who work at departments with IDs 1 through 10 and another for employees who work at departments with IDs 11 through 20.

CREATE TABLE roles (
    id INIT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department (id),
    PRIMARY KEY (id)
);

--Employees Table:
--This creates a table called employees.  It has the following columns: id, first_name, last_name, emp_dept, salary, and roles_id.
--The Foreign Key (manager_id) References employee (id), the Foreign Key (roles_id) References roles (id).

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    emp_dept VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    roles_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees (id),
    FOREIGN KEY (roles_id) REFERENCES roles (id),
    PRIMARY KEY (id)
);

--Manager Table:
--This creates a table called manager.  It has an id column and mgr_name column.

CREATE TABLE manager (
    id INT NOT NULL,
    mgr_name VARCHAR(30) NOT NULL
);