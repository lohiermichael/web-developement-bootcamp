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
