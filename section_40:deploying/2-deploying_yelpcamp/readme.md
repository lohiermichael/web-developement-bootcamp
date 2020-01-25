# Deploying Yelpcamp

## 1. Basics

1. Same steps as before:
    - git init
    - git add .
    - git commit -m "Commit before deployment"

2. Push the code to Github in a private repository before Heroku to be push that there is no issue, fore instance with possibly visible environment variables

3. `git push heroku master`

**IMPORTANT: Something is wrong **

4. `heroku logs`: there is a problem with the database: mongoDB

*Note:* We can run commands on Heroku server in the directory with the pre-words `heroku run`. *ex:* heroku run ls

5. `heroku run ls node_modules`: check the installed packages

## 2. Mongo Atlas

One of the options to tackle the issue of the connection to the database is to set up a remote database on **Mongo Atlas**. Another solution would be to set up a database local to Heroku but it seems to be more difficult.

1. Create an account on Mongo Atlas
2. Make a cluster
3. Create a new user
4. Set up the network access
5. Connect to the cluster
6. Get the URL back to app.js, change the current localhost URL to this one.

## 3. Environment variables

We have two issues that we wanna solve:
1. We want to have a database for **development** locally as well as a database for **production** on MongoAtlas
2. We don't want to display in our code the database URL

There is a solution for these two issues which is **to create and environment variable**

### Steps

1. Save the Mongo Atlas database URL in the .env file under *DATABASEURL*
2. Use `process.env.DATABASEURL`
3. Add local Database URL in the .env file. However, .env file being the .ignore file, if we push code to Heroku, it is not going to recognize this `process.env.DATABASEURL`
4. Add the *DATABASEURL* in Heroku as a local variable under Settings -> Config Variables
5. Connect to a backup database in case of issue
6. git push heroku master


