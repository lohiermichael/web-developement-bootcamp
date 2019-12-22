// Import Express
const   express               = require('express'),
        mongoose              = require('mongoose'),
        passport              = require('passport'),
        bodyParser            = require('body-parser'),
        User                  = require("./models/user"),  
        LocalStrategy         = require('passport-local'),
        passportLocalMongoose = require('passport-local-mongoose'),
        expressSession        = require("express-session"),
        app                   = express();


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

app.use(expressSession({
    secret: "This is the auth app",
    resave: false,
    saveUninitialized: false
}));
mongoose.set('useCreateIndex', true);
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

// Take data from the session and encode it
passport.serializeUser(User.serializeUser());
// Take data from the session and decode it
passport.deserializeUser(User.deserializeUser());

app.get("/", (req,res) => {
    res.render("home");
});

app.get("/secret", (req,res) => {
    res.render("secret");
});

// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`Server Running On Port ${PORT}`));