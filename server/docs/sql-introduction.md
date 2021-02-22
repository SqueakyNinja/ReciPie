---
title: "SQL Introduction"
tags: ""
---
# SQL Introduction

## Learning Objectives

-   Understand what a relational database is
-   Understand how to write basic queries using **SQL**
-   Understand different types of relations between data , e.g. many-to-one
-   Understand and know how to use different JOINS in **SQL**
-   Understand how to use a junction table when dealing with many-to-many relationships

## What is SQL

SQL stands for **Structured Query Language**

SQL is a query language for interacting with a **relational** database.

A database is an organized collection of data, stored and accessed electronically.

There are two main types of databases:

-   relational
-   non-relational

## Relational vs. Non-Relational

### _Relational:_

-   it is built from a set of unique tables (also called relations)
-   data stored in columns and rows (very structured)
-   a table contains data about just one entity
-   tables must have a **primary key** column
-   each row in a table has its own **unique primary key** value
-   tables are linked by primary and foreign keys

### _Non-relational:_

-   for less structured data
-   Everything is a document
-   throw it in the database, doesn't matter if it looks the same as other data
-   data usually structured like json - can even be nested
-   can usually retrieve instantly by an id or some other key

### _Pros of Relational:_

-   Pro: data is well organised and structured. Great for when you know what your data will look like and its integrity is important. E.g. finance, retail, transaction systems
-   Pro: no redundant (duplicate) data
-   Pro: SQL is quite easy to learn in order to interact with the database
-   Pro: Popular, has support expertise and tools.
-   Pro: security is good, it's a mature technology compared to NoSQL

### _Cons of Relational:_

-   Con: not good for fluid data or where we might not know what it looks like
-   Con: enterprise level SQL DBS can be very expensive
-   Con: With v. complex data can be hard to retrieve across many tables
-   Con: Doesn't scale well: 'scaling horizontally' means adding extra machines, but this is hard when you have 100mil customers on a table and you need to add more customer on another machine. Very inefficient to have tables split across multiple machines. Need to pay a lot of money to scale horizontally or scale vertically (buy better hardware). FB trapped in 'SQL fate worse than death' due to inability to scale but managed to make it work

## PostgreSQL

Although SQL does have a strict standard, there are different versions of the SQL language.

However, to be compliant with the ANSI standard, they all support at least the major commands (such as SELECT, UPDATE, DELETE, INSERT, WHERE) in a similar manner.

PostgreSQL (PSQL) is an _open source_ version of SQL which dates back to 1986 as part of the POSTGRES project at the University of California at Berkeley.

## psql

psql is a terminal based front-end to PostgreSQL, allowing a user to enter queries interactively and view the query results in the terminal. There are many useful commands for interacting with a particular database:

### `psql` CLI commands

-   `\l` - show databases
-   `\c` northcoders_test - connect to db
-   `\dt` - show tables
-   `\dt+` - show tables and more info
-   `\?` - show other commands
-   `\q` - exit CLI
-   `:q` = Return to `psql` cli from database/table/query view

## Creating a database

To drop a database (if it exists), deleting the directory containing the data, including all tables and records, the SQL statement is as follows:

```sql
DROP DATABASE IF EXISTS my_database_name;
```

The following SQL statement creates a database called "northcoders_test":

```sql
CREATE DATABASE northcoders_test;
```

Run `\c northcoders_test` to connect to the database in the psql CLI.

To create a table inside a database, the name of the table must be specified, as well as the table's **column names** and their **data types**

### PostgreSQL **data types**:

-   Boolean (`BOOL` or `BOOLEAN`)
-   Character
    -   `CHAR(n)` is the fixed-length character. If you insert a string that is shorter than the length of the column (n), PostgreSQL pads the spaces. If you insert a string that is longer than the length of the column, PostgreSQL will issue an error.
    -   `VARCHAR(n)` is the variable-length character string. With `VARCHAR(n)`, you can store up to `n` characters. PostgreSQL does not pad spaces when the stored string is shorter than the length of the column.
    -   `TEXT` is the variable-length character string. Theoretically, text data is a character string with unlimited length.
-   Integers
    -   `SMALLINT` is 2-byte signed integer that has a range from -32,768 to 32,767.
    -   `INT` is a 4-byte integer that has a range from -2,147,483,648 to 2,147,483,647.
    -   `SERIAL` is the same as integer except that PostgreSQL will automatically generate and populate values into the `SERIAL` column. This is similar to `AUTO_INCREMENT` column in MySQL or `AUTOINCREMENT` column in SQLite.
-   Floating-point numbers (`FLOAT(n)`, `REAL` /`FLOAT8` `NUMERIC` or `NUMERIC(p,s)`)
-   Temporal
    -   `DATE` stores the date values only
    -   `TIME` stores the time of day values
    -   `TIMESTAMP` stores both date and time values
    -   `INTERVAL` stores periods of time
-   And many others! **See [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)**

### Creating a table

The following statement will create a table of northcoders, that holds information on each northcoders name. Where the primary key of each row is an `id`.

```sql
CREATE TABLE northcoders (northcoder_id INT PRIMARY KEY, northcoder VARCHAR(40));
```

### Inserting data into a table

Data can be inserted into the table using the following statements, inserting specific values to the columns in the table:

```sql
INSERT INTO northcoders (northcoder_id, northcoder) VALUES (1, 'Tom');
```

Multiple records can be inserted in one statement by comma separating the entries:

```sql
INSERT INTO northcoders (northcoder_id, northcoder) VALUES (2, 'Izzi'), (3, 'Alex');
```

### Querying a table for data

The `northcoders` table can then be queried using a `SELECT` statement

```sql
SELECT * FROM northcoders;
```

_**Note:** `*` will return all of the columns, or column names can be specified by comma separating them_

## Syntax and Naming Conventions

### Syntax

Missing a semi-colon `;` from the end of a statement or query will result in it not being executed.

### Naming Conventions

> "There are only two hard problems in Computer Science: cache invalidation and naming things."

There are some important conventions to consider when naming tables and columns:

-   Lowercase identifiers. Identifiers should be written in lower case. (e.g.: `first_name`, not `"First_Name"`)
    -   This includes database names, tables and column names
    -   Mixed case identifier names mean that every usage of the identifier would need to be quoted in double quotes
-   Name primary keys using `[singularOfTableName]_id` format (e.g. `customer_id`).
    -   If your primary key is `id` it can later be more difficult to keep track of what the `id` relates to.
-   Foreign keys and fields representing the same kind of data on different tables should be named consistently.
    -   E.g `student_id` and `staff_id`; and `student_username` and `staff_username`, rather than `student_username` and `staff_user`.
-   Underscores to separate words, for readability (especially given the usage of lowercase identifiers)
-   Full words, not abbreviations. In general avoid abbreviations for clarity.
-   Table names: plural
-   Column names: singular
-   Avoid reserved/key words. Do not name columns with key words such as name, new, null etc. (See: [SQL key words](https://www.postgresql.org/docs/7.3/sql-keywords-appendix.html))

_**Note:** the above are only suggestions. (e.g. it is still possible to write identifiers in mixed case, but this would require the use a lot of "DoubleQuotes")_

## 6. Running a file with PSQL

SQL statements can also be written in a file and then run with `psql` to make the code reusable with the following commands:

-   `psql -f example.sql` to print output to the _**terminal**_
-   `psql -f example.sql > example.txt` to print output to an _**example.txt**_ file

_Note: this command **cannot** be run from within the `psql` CLI_

```sql
-- example.sql
DROP DATABASE IF EXISTS northcoders_test;
CREATE DATABASE northcoders_test;

\c northcoders_test

-- create tables

-- insert into tables

-- select from tables
```

## Foreign Keys

A `FOREIGN KEY` is a field in one table that refers to the `PRIMARY KEY` in another table to link two tables together.

The table containing the foreign key is the child table, and the table containing the primary key is the referenced or parent table.

In the below tables the `favourite_animal_id` column in the `northcoders` table is a `FOREIGN KEY` that references the `PRIMARY KEY` of the `favourite_animals` table (`favourite_animal_id`).

    northcoders table
    -----------------
     northcoder_id | northcoder | favourite_animal_id
    ---------------+------------+---------------------
                 1 | Ant        |                2
                 2 | Izzi       |                4
                 3 | Tom        |                1
                 4 | Alex       |                3

    favourite_animals table
    --------------------
     favourite_animal_id | favourite_animal | number_of_legs
    ---------------------+------------------+----------------
                       1 | Spider           |              8
                       2 | Butterfly        |              6
                       3 | Unicorn          |              4
                       4 | Koala            |              4

## Many-to-One Relationships

The above creates a **many-to-one** relationship between `northcoders` and `favourite_animals`;
Where many northcoders may have the same favourite animal.

To implement the above relationship between two tables, the `northcoders` table must be given the `favourite_animal_id` field in the `CREATE TABLE` statement. This will be of type `INT` to match the `favourite_animal_id` field in the `favourite_animals` table.

In order to have primary keys auto generated as incrementing integers, `SERIAL` can be used in place of `INT` when creating a table's primary key (e.g. `northcoder_id SERIAL PRIMARY KEY,`).

If using `SERIAL` the primary key does not need to be specified when inserting data into a table.

```sql
-- example.sql continued...

-- create tables
CREATE TABLE northcoders
(
  northcoder_id SERIAL PRIMARY KEY,
  northcoder VARCHAR(40),
  favourite_animal_id INT,
  FOREIGN KEY (favourite_animal_id) REFERENCES favourite_animals(favourite_animal_id)
);
```

OR

```sql
CREATE TABLE northcoders
(
  northcoder_id SERIAL PRIMARY KEY,
  northcoder VARCHAR(40),
  favourite_animal_id INT REFERENCES favourite_animals(favourite_animal_id)
);
```

## Ordering of SQL Statements

In order for the `northcoders` table to reference the `favourite_animal_id` from the `favourite_animals` table, the `favourite_animals` table must be created before the `northcoders` table, or it will throw an error from trying to reference a table, and column that does not exist.

```sql
-- example.sql
DROP DATABASE IF EXISTS northcoders_test;
CREATE DATABASE northcoders_test;

\c northcoders_test;

CREATE TABLE favourite_animals
(
  favourite_animal_id SERIAL PRIMARY KEY,
  favourite_animal VARCHAR(40),
  number_of_legs INT
);

CREATE TABLE northcoders
(
  northcoder_id SERIAL PRIMARY KEY,
  northcoder VARCHAR(40),
  favourite_animal_id INT,
  FOREIGN KEY (favourite_animal_id) REFERENCES favourite_animals(favourite_animal_id)
);
```

In order for the `northcoders` rows to be created with a reference to a specific `favourite_animal` from the `favourite_animals` table, the `favourite_animal` must exist in the `favourite_animals` table, or it will throw an error from trying to reference a `favourite_animal_id` that does not exist.

```sql
-- example.sql continued...

-- insert into tables
INSERT INTO favourite_animals
  (favourite_animal, number_of_legs)
VALUES
  ('Spider', 8),
  ('Butterfly', 6),
  ('Unicorn', 4),
  ('Koala', 4);

INSERT INTO northcoders
  (northcoder, favourite_animal_id)
VALUES
  ('Ant', 2),
  ('Izzi', 4),
  ('Tom', 1),
  ('Alex', 3);

-- select from tables
SELECT * FROM northcoders;
SELECT * from favourite_animals;
```

## Joins

`JOIN` clauses are used to combine records from two or more tables in a database.

There are many different Join Types in sql:

-   `INNER JOIN`
    -   Creates a new result table by combining column values of two tables (`table1` and `table2`) based upon the join condition.
    -   The query compares each row of `table1` with each row of `table2` to find all pairs of rows, which **satisfy** the join condition.
    -   When the join condition is satisfied, column values for each matched pair of rows of `table1` and `table2` are combined into a result row.
-   `LEFT OUTER JOIN`
    -   An inner join is performed and then, for each row in `table1` that does **not satisfy** the join condition with any row in `table2`, a joined row is added with `null` values in columns of `table2`. Thus, the joined table always has at least one row for each row in `table1`.
-   `RIGHT OUTER JOIN`
    -   An inner join is performed and then, for each row in `table2` that does **not satisfy** the join condition with any row in `table1`, a joined row is added with `null` values in columns of `table1`. This is the converse of a left join; the result table will always have a row for each row in `table2`.
-   `FULL OUTER JOIN`
    -   An inner join is performed and then, for each row in `table1` or `table2` that does **not satisfy** the join condition with any row in the other table, a joined row is added with null values in columns of the other table.
-   `CROSS JOIN`
    -   A CROSS JOIN matches every row of the first table with every row of the second table. If the input tables have x and y columns, respectively, the resulting table will have x+y columns. Because CROSS JOINs have the potential to generate extremely large tables, care must be taken to use them only when appropriate.

[SQL Joins Explained](https://www.sql-join.com/sql-join-types/)

An `INNER JOIN` is the most common type of join and is the default type of join.

```sql
SELECT table1.column1, table2.column2...
FROM table1
INNER JOIN table2
ON table1.common_filed = table2.common_field;
```

_**Note:** You can use the `INNER` keyword optionally._

```sql
--- example.sql continued...
SELECT *
FROM northcoders
JOIN favourite_animals
ON northcoders.favourite_animal_id = favourite_animals.favourite_animal_id;
```

The above would return the following result:

     northcoder_id | northcoder | favourite_animal_id | favourite_animal_id | favourite_animal | number_of_legs
    ---------------+------------+------------------+------------------+---------------+----------------
                 1 | Ant        |                2 |                2 | Butterfly     |              6
                 2 | Izzi       |                4 |                4 | Koala         |              4
                 3 | Tom        |                1 |                1 | Spider        |              8
                 4 | Alex       |                3 |                3 | Unicorn       |              4

## Specifying columns to return and aliasing with `AS`

To reduce the duplication of foreign keys, and return only information that is useful, the specific columns to be returned from the query can be specified after the `SELECT` key word.

The `AS` keyword can be used to give an alias to a column, or table name (temporarily for the current query) in order to improve readability.

```sql
--- example.sql continued...
SELECT northcoder, favourite_animal, number_of_legs AS favourite_animal_legs
FROM northcoders
JOIN favourite_animals
ON northcoders.favourite_animal_id = favourite_animals.favourite_animal_id;
```

The above would return the following result:

     northcoder | favourite_animal | favourite_animal_legs
    ------------+---------------+-------------------
     Ant        | Butterfly     |                 6
     Izzi       | Koala         |                 4
     Tom        | Spider        |                 8
     Alex       | Unicorn       |                 4

## `WHERE`, `AND`, `OR` and `NOT`

The `WHERE` clause is used to filter records to extract only those records that fulfill a specified condition.

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

The following operators can be used in the `WHERE` clause:

-   `=` Equal
-   `<>` Not equal. Note: In some versions of SQL this operator may be written as !=
-   `>` Greater than
-   `<` Less than
-   `>=` Greater than or equal
-   `<=` Less than or equal
-   `BETWEEN` Between a certain range
-   `LIKE` Search for a pattern
-   `IN` To specify multiple possible values for a column

To select all northcoders who have a favourite animal with more than 4 legs:

```sql
SELECT northcoder, favourite_animal, number_of_legs
FROM northcoders
JOIN favourite_animals
ON northcoders.favourite_animal_id = favourite_animals.favourite_animal_id
WHERE number_of_legs > 4;
```

A `WHERE` clause with `AND` requires that two conditions are true.

A `WHERE` clause with `OR` requires that one of two conditions is true.

A `WHERE` clause with `NOT` negates the specified condition.

## Many-to-Many Relationships

A **many-to-many** relationship may be formed when one resource will relate to one or many of another resource and those resources can relate to one or many of the other resource.

E.g. a northcoder can have many skills, and a skill can be had by many northcoders.

Using foreign keys could lead to a table structure something like the below. However, this would require the `northcoders` table to be constantly updated if a new column was required because a northcoder had exceeded the current maximum number of skills:

    !!! BAD !!!

    northcoders
    -----------
     northcoder_id | northcoder | favourite_animal_id | skill_id_1 | skill_id_2 | ...more columns!?
    ---------------+------------+------------------+------------+------------
                 1 | Ant        |                2 |        1   |     null
                 2 | Izzi       |                4 |        3   |        3
                 3 | Tom        |                1 |        5   |     null
                 4 | Alex       |                3 |        7   |        2

    skills
    ------
     skill_id |   skill    | difficulty
    ----------+------------+------------
            1 | Chess      |          7
            2 | Eating     |          3
            3 | Sitting    |          2
            4 | Sleeping   |          1
            5 | Javascript |          6
            6 | HTML       |          3
            7 | CSS        |         10

### Junction Tables

A **junction table** will allow us to create the **many-to-many** relationship, where each record in the table will refer to a relationship between a record from each of the tables being referenced.

    northcoders                                      |  skills
    -----------                                      |  ------
     northcoder_id | northcoder | favourite_animal_id   |  skill_id |   skill    | difficulty
    ---------------+------------+------------------  |  ----------+------------+------------
                 1 | Ant        |                2   |          1 | Chess      |          7
                 2 | Izzi       |                4   |          2 | Eating     |          3
                 3 | Tom        |                1   |          3 | Sitting    |          2
                 4 | Alex       |                3   |          4 | Sleeping   |          1
                                                     |          5 | Javascript |          6
                                                     |          6 | HTML       |          3
                                                     |          7 | CSS        |         10
    northcoders_skills
    ------------------
     northcoders_skills_id | northcoder_id | skill_id
    -----------------------+---------------+----------
                         1 |             1 |        1
                         2 |             1 |        4
                         3 |             1 |        7
                         4 |             1 |        6
                         5 |             2 |        5
                         6 |             2 |        2
                         7 |             2 |        1
                         8 |             3 |        3
                         9 |             3 |        1
                        10 |             3 |        4
                        11 |             4 |        5
                        12 |             4 |        4
                        13 |             4 |        7

The `northcoders_skills` table (named after the two tables that it forms a junction between) holds the information needed to store and maintain the **many-to-many** relationships between the two tables.

A junction table only needs to hold the references to the tables that it forms the **many-to-many** relationships between. Any additional information that is needed can be accessed from these tables through `JOIN` queries.

```sql
-- example.sql continued
CREATE TABLE skills
(
  skill_id SERIAL PRIMARY KEY,
  skill VARCHAR(40),
  difficulty INT
);

INSERT INTO skills
  (skill, difficulty)
VALUES
  ('Chess', 7),
  ('Eating', 3),
  ('Sitting', 2),
  ('Sleeping', 1),
  ('Javascript', 6),
  ('HTML', 3),
  ('CSS', 10);

CREATE TABLE northcoder_skills
(
   id SERIAL PRIMARY KEY,
  northcoder_id INTEGER REFERENCES northcoders(northcoder_id),
  skill_id INTEGER REFERENCES skills(skill_id)
);

INSERT INTO northcoder_skills
  (northcoder_id, skill_id)
VALUES
  (1,1), (1,4), (1,7), (1,6), (2,5), (2,2), (2,1), (3,3), (3,1), (3,4), (4,5), (4,4), (4,7);

  SELECT * FROM northcoders_skills
  JOIN northcoders ON northcoders_skills.northcoder_id = northcoders.northcoder_id
  JOIN skills ON northcoders_skills.skill_id = skills.skill_id;
```

## Resources

A nice overview of joins can be found [here](https://stackoverflow.com/questions/38549/what-is-the-difference-between-inner-join-and-outer-join)

Another good tutorial site that goes into more than just the basics is [here](https://www.pgexercises.com/questions/basic/)
