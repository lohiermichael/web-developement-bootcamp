// Import libraries
const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express(),
  methodOverride = require("method-override"),
  expresssSanitizer = require("express-sanitizer");

// Format ejs setting
app.set("view engine", "ejs");
// To use CSS files: looking for the file `public`
app.use(express.static("public"));
// Body parser setting
app.use(bodyParser.urlencoded({ extended: true }));
// Method override wetting: looking for the key word `_method`
app.use(methodOverride("_method"));
// Sanitize the inputs - has to come after the body parser
app.use(expresssSanitizer());

// Mongoose configuration
mongoose.connect(
  "mongodb://localhost/restful_blog_app",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  err => {
    if (err) console.error(err);
    else console.log("Connected to the mongodb");
  }
);

//   Make the Mongoose blog schema
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, defßault: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// Restful routes

// Redirect the route page to the index
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// 1. INDEX
app.get("/blogs", (req, res) => {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("Err:", err);
    } else {
      console.log(blogs);
      res.render("index", { blogs: blogs });
    }
  });
});

// 2. NEW
app.get("/blogs/new", (req, res) => {
  res.render("new");
});

// 3. CREATE
app.post("/blogs", (req, res) => {
  // Sanitize
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newlyCreated) {
    if (err) {
      console.log("Error: ", err);
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// 4. SHOW
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log("Error", err);
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

// 5. EDIT
// It is a mix of NEW and SHOW
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log("Error", err);
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

// 6. UPDATE
// When we click on submit in the edit page
app.put("/blogs/:id", (req, res) => {
  // Sanitize
  req.body.blog.body = req.sanitize(req.body.blog.body);
  // This method takes 2 arguments id and modified content
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(
    err,
    updatedBlog
  ) {
    if (err) {
      console.log("Error", err);
      res.redirect("/blogs");
    } else {
      // We can either redirect to the index or the show page
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// 7. DELETE
app.delete("/blogs/:id", (req, res) => {
  // Destroy
  Blog.findByIdAndRemove(req.params.id, function(err, updatedBlog) {
    if (err) {
      console.log("Error", err);
    }
    // redirect
    res.redirect("/blogs");
  });
});

// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
