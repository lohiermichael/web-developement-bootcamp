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

## 3. Deploy on Heroku

1. Go on [Heroku](https://www.heroku.com/) and sign up
2. Confirm by mail and get to the dashboard
3. For Mac usage, go to set up and install Heroku locally
4. heroku login
5. Create a git inside the folder in which the application is. In the case of the simple application, it is at the same level as the app.js file
    - git init
    - git add .
    - git commit -m "Initial commit"
6. heroku create: make a route on the server
7. git remote -v: Link the app to a remote git repo
8. git push heroku master
9. heroku logs: to debug the errors

*Note:* Important to have a start script in the package.json file, in our case node app.js
