# 1. YelpCamp initial routes

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image

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

* Create our header and footer partials
* Add in Bootstrap

## Steps

1. mkdir views/partials
2. touch views/partials/header.ejs
3. touch views/partials/footer.ejs
4. Complete these files and include them to the ejs files
5. Include Bootstrap with a CDN link

# 3. Creating new campgrounds

* Setup new campgrounds POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

## Steps

1. Make a post route to campgrounds
2. npm install body-parser --save
3. Render a new page for the form to add a new campground
4. Complete the redirection to the campground page as soon as we add a new object
5. Add an anchor tag to add a new campground on the campground page
6. Add an anchor tag on the campground/new to redirect to the campground page

# 4. Style the campgrounds page

* Add a better header/title
* Make campgrounds display in a grid

## Steps

1. Add a jumbotron and style its elements
2. Put the loop of the campgrounds inside a row, each campground being a col
3. For each campground, create a thumbnail and a caption for the title
4. Adapt the size of each campground with a flex display
5. Center the texts

# 5. Style the Navbar and Form

* Add a navbar to all templates
* Style the new campground form

## Steps
 
 1. Make the Navbar: brand and collapsed button on the right
 2. Add the nav bar HTML to the header template in the partials folder
 3. Style the form
    * Use grid to center it
    * form-group to space the elements

# 6. Add Mongoose

* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes

## Steps

1. npm install mongoose --save
2. Import it in the app.js file and make a database yelp_camp
3. Make a model and an instance of campground
4. First try to create a campground in the collection campgrounds in the database yelpcamp
5. Render campgrounds from the database
6. Implement the creation of campground in the database

 # 7. Show Page
 * Review the RESTFUL routes we've seen so far

We have made 3 RESTFUL routes so far:
   1. `app.get("/campgrounds")`
   2. `app.post("/campgrounds")`
   3. `app.get("/campgrounds/new")`

There are 7 kinds of RESTFUL routes but we are going to cover only 4 of them here:

name | ex URL | verb | desc. of ex
--- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |---
INDEX |  /dogs |          GET |     Display a list of all dogs
NEW |    /dogs/new  |     GET |     Displays a form to make a new dog
CREATE | /dogs |          POST |    Add new dog to database and redirect
SHOW  |  /dogs/:id |      GET |     Displays info about one dog



 * Add description to our campground model
 * show db.collection.drop()
 * Add a show route.template

 ## Steps

 1. Add description on the different routes already created:
   * INDEX
   * NEW
   * CREATE
2. Create the SHOW route of campgrounds as a template
3. Add in description to the model of a campground
4. Drop our previous collection to follow the new pattern with description. You do it when you have a major change in your database structure. The command is `db.campgrounds.drop()`
5. Create a new campground with a description for the example 
6. Create a new show.ejs file to display the campground
7. Rename campgrounds.ejs to index.ejs 
8. Add a new button to the show page
9. Add a description input in the form

##  8. Refactor Mongoose Code

* Create a models directory
* Use module.exports
* Require everything correctly!

## Steps

1. mkdir models
2. touch models/campground.js
3. Move the content in app.js relative to campground to this file
4. require mongoose in campground.js
5. Export the model out of campground.js
6. Require the Campground model in app.js

# 9. Add a seed file

* Add a seed.js file
* Run the seeds file every time the server starts

## Steps

1. Inside seed.js file, write code to remove all campgrounds from the database 
2. Recreate the seeds: 3 campgrounds.
3. Add the same comment for the three campgrounds

# 10. Add the comment model

* Make our errors go away!
* Display comments on campground show page

## Steps

1. touch models/comment.js
2. In this file, make the schema of "comment":
   * author
   * text
3. Refactor the code with async functions
4. Change remove by deleteMany (Node new syntax)
5. Add the comments to the show route by populating the campground with its own comments



