# RESTful Routing

## 1. Introduction

* Define REST and explain WHY it matters

REST stands for Representational State Transfer.
It is a pattern on how we define our routes.
It is a way to map HTTP routes and  CRUD (Create Reed Update Destroy)

* List all 7 RESTful routing in practice


name | ex URL | verb | desc. of ex
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |---
INDEX |  /dogs |          GET |     Display a list of all dogs
NEW |    /dogs/new  |     GET |     Displays a form to make a new dog
CREATE | /dogs |          POST |    Add new dog to database and redirect
SHOW  |  /dogs/:id |      GET |     Displays info about one dog
EDIT |   /dogs/:id/edit | GET |     Display edit form for one dog
UPDATE | /dogs/:id  |     PUT |     Update one dog and redirect
DESTROY |/dogs/:id  |     DELETE |  Delete one dog and redirect

* Show example of RESTful routing in practice

## 2. Blog index

* Setup the Blog App
* Create the Blog model
* Add INDEX route and template
* Add Simple Nav Bar 

## 3. Blog create and new
* Handle the implementation of the form
* Add NEW and CREATE routes
* Add some styling to the form

