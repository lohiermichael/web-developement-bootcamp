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

