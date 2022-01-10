--Department Table:
--This creates a table called department.  It creates a primary key for the
--table which is id.  The department name (dept_name) column is not nullable and has
--a maximum length of 30 characters.  The utilized_budget column is decimal and has an
--auto-incrementing integer value that starts at 1.

DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    utilized_budget DECIMAL,
    PRIMARY KEY (id)
;)

--Role Table:
--This creates a table called role.  The pirmary key is the id column.  It also has a title column that can have up to 30 characters
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