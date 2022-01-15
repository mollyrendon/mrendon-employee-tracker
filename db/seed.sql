/* Insert/Values:
This file is for all of the section values: dept_name, budget, title, etc.  This keeps all of the values separateb to make it easier to view the values and modify them.  */

USE employee;
INSERT INTO department (dept_name, budget)
VALUES ('Command Staff', 2000000),
        ('Diplomatic Relations', 900000),
        ('Ship Security', 400000),
        ('Medical Personel', 600000),
        ('Assistants', 200000),
        ('AnlaShok', 250000);


INSERT INTO roles (title, salary, department_id)
VALUES ('Captain/First Officer', 1000000, 1),
        ('Diplomat', 250000, 2),
        ('Security Officer', 200000, 3),
        ('Doctor', 300000, 4),
        ('Diplomat Assistants', 100000, 5),
        ('Ranger', 125000, 6);

INSERT INTO employee (first_name, last_name, emp_dept, salary, manager_id, roles_id)
VALUES ('John', 'Sheridan', 'Command Staff', '1000000', null, 1),
        ('Susan', 'Ivanova', 'Command Staff', '1000000', 1, 1),
        ('Ambassador', 'Delenn', 'Diplomatic Relations', 300000, null, 2),
        ('Ambassador', 'GKar', 'Diplomatic Relations', 300000, 2, 2),
        ('Londo', 'Mollari', 'Diplomatic Relations', 300000, 2, 2),
        ('Michael', 'Garibaldi', 'Ship Security', 200000, null, 3),
        ('Zack', 'Allan', 'Ship Security', 200000, 3, 3),
        ('Stephen', 'Franklin', 'Medical Personel', 3000000, 1, 4),
        ('Vir', 'Cotto', 'Assistants', 100000, 2, 5),
        ('Chudomo', 'Lennier', 'Assistants', 100000, 2, 5),
        ('Marcus', 'Cole', 'AnlaShok', 125000, 2, 6);


INSERT INTO manager (id, mgr_name)
VALUES (1, 'John Sheridan'),
        (2, 'Ambassador Delenn'),
        (3, 'Michael Garibaldi');

SELECT * FROM employee;
SELECT * FROM roles;
SELECT * FROM department;
SELECT * FROM manager;

