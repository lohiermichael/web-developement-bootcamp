const mongoose = require('mongoose');

// Import module
const Post = require("./models/post");
const User = require("./models/user");


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

// User.create({
//     email: "bob.dickson@gmail.com",
//     name: " Bob Dickson"
// })

// Create a new post and add it to a specific user
Post.create({
    title: "How to cook like a pro part How to travel?",
    content: "You just have to give it a try"
}, (err, post) => {
    if (err) console.log("Err", err);
    else {
        User.findOne({email: "bob.dickson@gmail.com"}, (err, foundUser) => {
            if (err) console.log("Err", err);
            else {
                foundUser.posts.push(post);
                foundUser.save((err, data) => {
                    if (err) console.log("Err", err);
                    else {
                        console.log(data);
                    }
                })
            }
        });
    }
});

// Find all posts for that user and display them instead of only their ids
// User.findOne({email: "bob.dickson@gmail.com"}).populate("posts").exec((err, user) => {
//     if (err) console.log("Err: ", err);
//     else console.log(user);
// });