# Authentication

# 1. Introduction to authentication

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