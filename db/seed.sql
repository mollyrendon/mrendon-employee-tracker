--Insert/Values:
--This file is for all of the section values: dept_name, budget, title, etc.  This keeps all of the values separate
--to make it easier to view the values and modify them.
--"The SELECT * FROM employees" means that that it will take all of the values from the employees table.  

INSERT INTO department (dept_name, budget)
VALUES ('Command Staff', 2000000),
        ('Diplomatic Relations', 900000),
        ('Ship Security', 40000),
        ('Medical Personel', 600000),
        ('Assistants', 200000),
        ('AnlaShok', 250000);


INSERT INTO roles (title, salary, department_id)
VALUES ('Captain/First Officer', 1000000, 100),
        ('Diplomat', 250000, 90),
        ('Security Officer' 200000, 80),
        ('Doctor', 300000, 70),
        ('Diplomat Assistants', 100000, 60),
        ('Ranger', 125000, 50);

INSERT INTO employee (first_name, last_name, emp_dept, salary, manager_id, roles_id)
VALUES ('John', 'Sheridan', 'Command Staff' '1000000', null, 100),
        ('Susan', 'Ivanova', 'Command Staff', '1000000', 100, 100),
        ('Ambassador', 'Delenn', 'Diplomatic Relations', 300000, null, 90),
        ('Ambassador', 'GKar', 'Diplomatic Relations', 300000, 90, 90),
        ('Londo', 'Mollari', 'Diplomatic Relations', 300000, 90, 90),
        ('Michael', 'Garibaldi', 'Ship Security', 200000, null, 80),
        ('Zack', 'Allan', 'Ship Security', 200000, 80, 80),
        ('Stephen', 'Franklin', 'Medical Personel', 3000000, 100, 70),
        ('Vir', 'Cotto', 'Assistants', 100000, 90, 60),
        ('Chudomo', 'Lennier', 'Assistants', 100000, 90, 60),
        ('Marcus', 'Cole', 'AnlaShok', 125000, 90, 50);


INSERT INTO manager (id, mgr_name)
VALUES (100, 'John Sheridan'),
        (90, ' Ambassador Delenn'),
        (80, 'Michael Garibaldi');

SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;
SELECT * FROM manager;

