# Association

## 1. Introduction to data association

* Define association

Collection of data/Several pieces of data that are related to one another

* Discuss: one:one, one:many, many:many relationships

1. one:one : one entity of a collection (or table) that is related to one entity of another collection.
***ex: one book has one publisher***

2. one:many : one entity of a collection (or table) that is related to many entities of another collection.
The most of what we are going to use
***ex: on Facebook, one user can  have multiple posted photos***

3. many:many : many entities of a collection (or table) that is related to many entities of another collection.
***ex: In a collection the relation between classes and students***

## 2. Embedding data

* `touch embed.js`
* `np install mongoose`
* Import and create a new database `blog_demo` and connect ot it
* Create two collections:
    1. User with email and name
    2. Post with title and content
* Make the one:many relationship between user and post by adding the attribute posts to user and pass it `[postSchema]`
* Push a new post to the user
* Find an existing user by attribute and push a new post to it


