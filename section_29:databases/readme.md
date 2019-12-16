# Databases

## 1. Intro to Databases

* What is a database?

It is a a collection of information/data
It has a interface, i.e. a language to interact with it.

* SQL (relational) VS. noSQL (non-relational)

There are two types of databases:
    1. **SQL (relational)**: they are ol. They are tabular and flat namely each instance of a table follows the same patten, has the same attributes. I implies the use of **Join tables**.
    It is not really flexible in the context of Web Development. For instance, if we wan to add a new attribute for only one element of the table, we have to set it to ***null*** for all the other elements of the table.
    2. **NoSQL (no-relational)**: we don't have to define patterns. They are more flexible. Other good points: data can be nested. Ex: a person can have an address which can have a street. It looks similar to JSON structure.

## 2. Intro to MongoDB

* What is MongoDB?

It is a noSQL database

* Why are we using it?

We could have used PostgreSQL or mySQL but the most popular non-relational database is MongoDB now.

* Install it

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

## 3. Our first Mongo Commands

* mongo: Mongo shell, every other command is run inside the environment that this command opens
* help: documentation on how to use other commands
* show dbs: list the databases
* use: make a new database if not existent and start using it. ex: use demo (demo is the name of the new database)
* insert: insert an element in a collection  (similar to the concept of **table** in SQL) of a database 
ex: `db.dogs.insert({name: "Rusty", breed: "Mutt"})`
    * db: database we are in (here demo)
    * dogs: collection inside the database
* show collections: display all the collections inside your database
* find: list elements inside your collection
ex: `db.dogs.find()` or `db.dogs.find({name:"Rusty"})`
* update: finds element with the property as the first argument and rel=place it with the new element passed as the second argument.
ex: `db.dogs.update({"name": "Rusty"}, {"name": newName})`
If we don't want to overwrite all the properties, here is the syntax:
db.dogs.update({"name": "Lucy"}, {$set: {"name": "Tater", "isCute": "true"}})
* remove: remove an element from a collection
ex: db.dogs.remove({"breed": "Labrador"})
By default it removes every instance, but if we want to remove a limited number of elements we add in the method limit
ex: db.dogs.remove({"breed": "Mutt"}).limit(1)

FYI: CRUD stands for Create Read Update Delete

