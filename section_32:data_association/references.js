const mongoose = require('mongoose');

// Mongoose configuration
mongoose.connect(
    "mongodb://localhost/blog_demo_2",
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
    // This is how we reference to posts
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});
var User = mongoose.model("User", userSchema);

// User.create({
//     email: "bob.dickson@gmail.com",
//     name: " Bob Dickson"
// })

// Create a new post and add it to a specific user
// Post.create({
//     title: "How to cook like a pro part 3",
//     content: "Maybe you can learn online or not"
// }, (err, post) => {
//     if (err) console.log("Err", err);
//     else {
//         User.findOne({email: "bob.dickson@gmail.com"}, (err, foundUser) => {
//             if (err) console.log("Err", err);
//             else {
//                 foundUser.posts.push(post);
//                 foundUser.save((err, data) => {
//                     if (err) console.log("Err", err);
//                     else {
//                         console.log(data);
//                     }
//                 })
//             }
//         });
//     }
// });

// Find all posts for that user and display them instead of only their ids
User.findOne({email: "bob.dickson@gmail.com"}).populate("posts").exec((err, user) => {
    if (err) console.log("Err: ", err);
    else console.log(user);
});