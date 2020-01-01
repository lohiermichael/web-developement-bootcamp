// Import Express
const express = require("express"),
mongoose = require("mongoose"),
passport = require("passport"),
bodyParser = require("body-parser"),
User = require("./models/user"),
LocalStrategy = require("passport-local").Strategy,
// passportLocalMongoose = require("passport-local-mongoose"),
expressSession = require("express-session");

const app = express();

// Connect to the database
mongoose.connect(
  "mongodb://localhost/auth_demo_app",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  err => {
    if (err) console.error(err);
    else console.log("Connected to the mongodb");
  }
);
mongoose.set("useCreateIndex", true);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "This is the auth app",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Add th authentication to the local strategy to log in
passport.use(new LocalStrategy(User.authenticate()));
// Take data from the session and encode it
passport.serializeUser(User.serializeUser());
// Take data from the session and decode it
passport.deserializeUser(User.deserializeUser());

// ==========
// ROUTES
// ==========

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/secret", (req, res) => {
  res.render("secret");
});

// ==========
// AUTH ROUTES
// ==========

// Sign up to the form
app.get("/register", (req, res) => {
  res.render("register");
});

// Handling user sign up
app.post("/register", function(req, res){
  console.log(req.body.username);
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render('register');
      }
      passport.authenticate("local")(req, res, function(){
         res.redirect("/secret");
      });
  });
});

// LOGIN

// Render login form
app.get("/login", (req, res) => {
  res.render("login");
});

// Login logic
// Middleware: is run before it callback function
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
  })
);

// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
