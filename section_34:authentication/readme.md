# Authentication

## 1. Introduction to authentication

* What tools are we using?
    * **Passport**: Passport is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.
    * **Passport Local**: For user names and passwords
    * **Passport Local Mongoose**: It is a Mongoose plugin that simplifies building username and password login with Passport
* Walk to the auth flow:
    * Home page with three buttons:
        1. Login
        2. Register
        3. Logout
    * Secret page accessible only if logged in if not redirect to Login page
    * If we register, we are automatically logged in and we directed to the Secret page
    * If we logout, we cannot access the Secret page anymore
    * If we login in with the same user and password with which we registered we can access the Secret page

* Discuss sessions
    All this works with what we call **Sessions**.
    HTTP is not stateless, which means that nothing persists from page to page. This persistence is needed for authentication because we wanna keep track of a specific user.
    For session handling, we will use **Express-Session**

## 2. Auth Code Along Part 1

* Set up folder structure
* Install needed packages
* Add root and template
* Add secret route and template

### Steps

1. mkdir auth_demo
2. cd auth_demo
3. npm init ...
4. touch app.js
5. npm install express mongoose passport passport-local passport-local-mongoose body-parser express-session ejs --save
6. Require all packages in app.js
7. Make the home route and page in views
8. Make the secret route and page in views
9. Require Mongoose and create database

## 3. Auth Code Along Part 2

* Create User model
* Configure passport

### Steps

1. Require all the installed packages
2. Work on the user model. Make a new files models/user.js
3. Create the User schema
4. Use passportLocalMongoose which adds addition methods to the user
5. Use Passport and add a secret sentence for authentication
6. Serialize and deserialize the user: it helps to encode and decode the data

## 4. Auth CodeAlong Part 3

* Add Register routes
* Add Register form

### Steps

1. Make the Sign up route. 
2. Create the view register.ejs and add:
    * one input for the user name
    * one input for the password
    * a submit button
3. Make a post route with passport
4. Add a link to sign up on the home page

**Warnings:** 
    * `username` works not `userName`
    * Not inverse `req` and `res`

## 5. Auth CodeAlong Part 4
* Add Login routes
* Add Login form


