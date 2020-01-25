# Deploying on Heroku

## Steps

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
