# 1. YelpCamp initial routes

- Add Landing Page
- Add Campgrounds Page that lists all campgrounds

Each Campground has:

- Name
- Image

## Steps

1. npm init
2. Add "start": "node app.js" to launch the application with nodemon
3. npm install express ejs --save
4. Create app.js and set up the server on port 3000
5. Create the landing page
6. Create the campground page
7. Make an anchor tag from the landing page to the campgrounds page
8. Create a sample of 3 campgrounds and display them in the campgrounds page

# 2. YelpCamp Layout

- Create our header and footer partials
- Add in Bootstrap

## Steps

1. mkdir views/partials
2. touch views/partials/header.ejs
3. touch views/partials/footer.ejs
4. Complete these files and include them to the ejs files
5. Include Bootstrap with a CDN link

# 3. Creating new campgrounds

- Setup new campgrounds POST route
- Add in body-parser
- Setup route to show form
- Add basic unstyled form

## Steps

1. Make a post route to campgrounds
2. npm install body-parser --save
3. Render a new page for the form to add a new campground
4. Complete the redirection to the campground page as soon as we add a new object
5. Add an anchor tag to add a new campground on the campground page
6. Add an anchor tag on the campground/new to redirect to the campground page

# 4. Style the campgrounds page

- Add a better header/title
- Make campgrounds display in a grid

## Steps

1. Add a jumbotron and style its elements
2. Put the loop of the campgrounds inside a row, each campground being a col
3. For each campground, create a thumbnail and a caption for the title
4. Adapt the size of each campground with a flex display
5. Center the texts

# 5. Style the Navbar and Form

- Add a navbar to all templates
- Style the new campground form

## Steps

1.  Make the Navbar: brand and collapsed button on the right
2.  Add the nav bar HTML to the header template in the partials folder
3.  Style the form
    - Use grid to center it
    - form-group to space the elements

# 6. Add Mongoose

- Install and configure mongoose
- Setup campground model
- Use campground model inside of our routes

## Steps

1. npm install mongoose --save
2. Import it in the app.js file and make a database yelp_camp
3. Make a model and an instance of campground
4. First try to create a campground in the collection campgrounds in the database yelpcamp
5. Render campgrounds from the database
6. Implement the creation of campground in the database

# 7. Show Page

- Review the RESTFUL routes we've seen so far

We have made 3 RESTFUL routes so far:

1.  `app.get("/campgrounds")`
2.  `app.post("/campgrounds")`
3.  `app.get("/campgrounds/new")`

There are 7 kinds of RESTFUL routes but we are going to cover only 4 of them here:

| name   | ex URL    | verb | desc. of ex                          |
| ------ | --------- | ---- | ------------------------------------ |
| INDEX  | /dogs     | GET  | Display a list of all dogs           |
| NEW    | /dogs/new | GET  | Displays a form to make a new dog    |
| CREATE | /dogs     | POST | Add new dog to database and redirect |
| SHOW   | /dogs/:id | GET  | Displays info about one dog          |

- Add description to our campground model
- show db.collection.drop()
- Add a show route.template

## Steps

1.  Add description on the different routes already created:

- INDEX
- NEW
- CREATE

2. Create the SHOW route of campgrounds as a template
3. Add in description to the model of a campground
4. Drop our previous collection to follow the new pattern with description. You do it when you have a major change in your database structure. The command is `db.campgrounds.drop()`
5. Create a new campground with a description for the example
6. Create a new show.ejs file to display the campground
7. Rename campgrounds.ejs to index.ejs
8. Add a new button to the show page
9. Add a description input in the form

## 8. Refactor Mongoose Code

- Create a models directory
- Use module.exports
- Require everything correctly!

## Steps

1. mkdir models
2. touch models/campground.js
3. Move the content in app.js relative to campground to this file
4. require mongoose in campground.js
5. Export the model out of campground.js
6. Require the Campground model in app.js

# 9. Add a seed file

- Add a seed.js file
- Run the seeds file every time the server starts

## Steps

1. Inside seed.js file, write code to remove all campgrounds from the database
2. Recreate the seeds: 3 campgrounds.
3. Add the same comment for the three campgrounds

# 10. Add the comment model

- Make our errors go away!
- Display comments on campground show page

## Steps

1. touch models/comment.js
2. In this file, make the schema of "comment":
   - author
   - text
3. Refactor the code with async functions
4. Change remove by deleteMany (Node new syntax)
5. Add the comments to the show route by populating the campground with its own comments

# 11. Comment New/Create

- Discuss nested routes

When adding a new comment, we need the campground id to be in the URL. So what we will do is nesting the comment routes on top of the SHOW route of campground

| name   | ex URL                        | verb | desc. of ex                                                        |
| ------ | ----------------------------- | ---- | ------------------------------------------------------------------ |
| NEW    | /campgrounds/:id/comments/new | GET  | Displays a form to make a new comment                              |
| CREATE | /campgrounds/:id/comments     | POST | Add new comment to database link it to its campground and redirect |

- Add the comment new and create routes
- Add the new comment form

## Steps

1. Refactor the structure of our files: create two folders inside of views: comments and campgrounds
2. Make a "new.ejs" file inside the comments folder
3. Change the location of the include for the header and footer
4. Copy the new.ejs file of campground and adapt it for comments. The id of the campground should be kept in the NEW route
5. Make the POST route for comment, if should add the comment to the associated campground
   Add an anchor tag to add a new comment

# 12. Style show page

- Add sidebar to show page
- Display comments nicely

## Steps

1. Put everything on the show page in a container
2. Add in a side bar
3. Use of grid to split the page between the sidebar and the main content
4. Put the main content in a thumbnail
5. Design the comment part
6. For additional styling, add a public directory and a stylesheets and a CSS file in it.

# 13. Auth Pt. 1: Add User Model

- Install all packages for authentication
- Define User model

## Steps

1. npm install passport passport-local passport-local-mongoose express-session --save
2. Import packages in app.js
3. Make the User model

# 14. Auth Pt. 2: Register

- Configure passport
- Add register
- Add register template

## Steps

1. Create an expresss session
2. Initialize it
3. Use the local strategy of the user model
4. Serialize and deserialize
5. Add in the get route for the register
6. Make the view
7. Add in the post route for the register

# 15. Auth Pt. 3: Register

- Add login routes
- Add login template

## Steps

1. Add in the get route for the register
2. Make the view
3. Add in the post route for the register

# 16. Auth Pt. 4: Logout/Navbar

- Add logout route
- Prevent user from adding a comment if not signed in
- Add links to navbar
- Show/hide auth links correctly

## Steps

1. Add in log out route with a get request
2. Redirect to login
3. Add links to respectively login logout and sign in in the header
4. Add header and footer to register and login views
5. Only allows logged-in users to add a comment

# 17. Auth Pt. 5: Show /Hide Links

- Show/hide auth links in navbar correctly

## Steps

1. Add logic in the header partial view
2. Add the currentUser variable that is `undefined` if the user is not logged in as a variable accessible from any view with `app.use` as a middleware
3. Add the name of the current logged in user

_Note:_: It could be a link to a profile page...

# 18. Refactor the routes

- Use Express router to reorganize all routes

## Steps

There are three main groups of routes:

1.  Campgrounds
2.  Comments
3.  Authentication
4.  mkdir routes
5.  touch routes/campgrounds.js
6.  touch routes/comments.js
7.  touch routes/index.js (for authentication)
    _Note:_ we could have created `auth.js` but `index.js` is more common)
8.  Copy paste the code for each part
9.  Change `app` for `router`
10. Manage the dependencies by requiring the adequate package for every route
11. Shorten trick of the code with by prefixing the route of each group of routes. _ex:_ `app.use("/campground)", campgroundRoutes);`

# 19. Users + Comments

- Associate users and comments
- Save author's name to a comment automatically

## Steps

1. Change the schema of the comment: author is no longer a simple string, We keep its id and its username
2. Inside the route, before pushing the comment to the list of comments of the campground, add the username and the id to the comment
3. Remove the **_author_** field from the new comment form
4. Modify the show template of the campground to display only the username in front of the comment

# 20. Users + Campgrounds

- Prevent an unauthenticated user from creating a campground
- Save user+id to a newly created campground

## Steps

1. Use the middleware isLoggedIn on Create and New routes, otherwise, technically someone could make a post request from Postman.
2. Similar to a comments add an author to campground model
3. Add the logic in the root to add the name of the author to each new campground
4. Show the name of the author on the show page

# 21. Editing campgrounds

- Add Method-Override
- Add Edit Route for Campgrounds
- Add Link to Edit Page
- Add Update Route
- Fix \$set problem

## Steps

1. We need to create a PUT request to update a campground and to do that we need method-override
   npm install method-override --save
2. Require method-override in app.js
3. Make a campgrounds/edit.ejs in the views
4. Copy paste the new.ejs form and add in slight modifications: - the redirection
   - the type of request
   - the title of the form
   - the placeholders by the existing values of the campground
5. Add in update route
6. Add a button to edit the campground on the show page
