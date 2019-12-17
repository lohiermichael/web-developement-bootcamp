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

// Blog.create({
//     title: "Test Blog",
//     image: "https://t4.ftcdn.net/jpg/02/96/35/63/240_F_296356355_0YlFGZllBt6G7J7MbQUK9XTJTmU351ev.jpg",
//     body: "HELLO THIS IS A BLOG POST"
// });

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

// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`Server Running On Port ${PORT}`));