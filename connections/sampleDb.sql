CREATE DATABASE IF NOT EXISTS todos;

USE todos;

CREATE TABLE myTodo(
    id INT NOT NULL AUTO_INCREMENT,
    todoname VARCHAR(10000) NOT NULL,
    dateOfCreation DATETIME DEFAULT NOW(),
    todoStatus VARCHAR(20) NOT NULL DEFAULT 'pending',
    PRIMARY KEY (id)  
);

-- ======================== sample data ==============
INSERT INTO myTodo (todoname) VALUES
('Wakeup, take breakfast and goto the gym'),
('Visit my grandma'),
('Washing the dishes and going to fetch water'),
('Learn more on material UI'),
('Create a todolist web app that employs CRUDE operation'),
('Go to a walk with my gf'),
('Bycycle ridding with friends in the field'),
('Watch a movie'),
('Eat'),
('REading at night'),
('Go play at the PS'),
('Do my home assignment'),
('Codding at late night'),
('Take my grandma to clinic for a check up'),
('Shamba with uncle'),
('Visit the market'),
('Go out with darling'),
('Morning run')


-- ================== craeting users table =============
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(1000) NOT NULL,
    phone CHAR(10) NOT NULL,
    userPassword VARCHAR(1000) NOT NULL,
    dateCreated DATETIME DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

ALTER TABLE users ADD profile_pic VARCHAR(1000) NOT NULL DEFAULT 'NO PIC';

 ALTER TABLE myTodo ADD usersID INT NOT NULL DEFAULT 1;

 ALTER TABLE myTodo ADD FOREIGN KEY(usersID) REFERENCES users(user_id);

  ALTER TABLE users MODIFY userName VARCHAR(1000) BINARY;
