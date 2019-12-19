const mongoose = require('mongoose');

// Mongoose configuration
mongoose.connect(
    "mongodb://localhost/blog_demo",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    err => {
      if (err) console.error(err);
      else console.log("Connected to the mongodb");
    }
  );

// POST - title, content
  var postSchema = new mongoose.Schema({
      title: String,
      content: String
  });
  var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);


// // Make a new instance of user in the database under rhe collection users
// var newUser = new User({
//   email: "paul.lover@gmail.com",
//   name: "Paul Lover"
// });

// // This is how we add a post to the `posts` array attribute of a user
// newUser.posts.push({
//   title: "How to find love",
//   content: "Finding love is not easy, hopefully with Paul Love, it becomes a game."
// })


// newUser.save(function(err, user){
//   if (err) console.log("Err:", err);
//   else console.log(user);
// });

// Find user if existent and add him a post
User.findOne({name: "Paul Lover"}, function(err, user){
  if (err) console.log("Err: ", err);
  else {
    user.posts.push({
      title: "What is love?",
      content: "Love is all about giving, all the rest is nothing!"
    });
    user.save(function(err, user){
      if (err) console.log("Error", err);
      else console.log(user);
    })
  }
});

// Make a new instance of post in the database under rhe collection posts
// var newPost = new Post({
//   title: "First post",
//   content: "This post is great"
// });
// newPost.save(function(err, post){
//   if (err) console.log("Error", err);
//   else console.log(post);
// });