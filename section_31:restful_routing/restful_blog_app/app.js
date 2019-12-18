// Import libraries
const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express();

// Format ejs setting
app.set('view engine', 'ejs');
// To use CSS files
app.use(express.static("public"));
// Body parser setting
app.use(bodyParser.urlencoded({ extended: true }));

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
    created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

// Restful routes

// Redirect the route page to the index
app.get("/", (req,res) => {
    res.redirect("/blogs");
});

// 1. INDEX
app.get("/blogs", (req,res) => {
    Blog.find({}, function(err, blogs){
        if (err){
            console.log("Err:", err);
        } else {
            console.log(blogs);
            res.render("index", {blogs: blogs});
        }
    });    
});

// 2. NEW
app.get("/blogs/new", (req,res) => {
    res.render("new");
});

// 3. CREATE
app.post("/blogs", (req,res) => {
    Blog.create(req.body.blog, function(err, newlyCreated){
        if (err){
            console.log("Error: ", err);
            res.render('new');
        } else {
            res.redirect("/blogs");
        }
    })
});

// 4. SHOW
app.get("/blogs/:id", (req,res) => {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err){
            console.log("Error", err);
            res.redirect("/blogs")
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

  
// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`Server Running On Port ${PORT}`));