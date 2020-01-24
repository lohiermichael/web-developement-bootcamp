# Deploying a simple application

## 1. Introduction

We are going to deploy a simple a application on Heroku made of two routes. We start with this first step because deploying Yelpcamp application requires more setting that we will learn later on.

## 2. Make the simple app

1. mkdir simple_app
2. cd simple_app
3. npm init
4. npm install express ejs --save

*Note:* The `--save` becomes crucial here as Heroku is going to install the packages that we give in the package.json file.

5. touch app.js
6. mkdir views
7. touch views/home.ejs
8. touch views/about.ejs
9. On app.js:
    - Require the libraries
    - Make the routes
    - Listen on port
10. Add things in the views
