// Import Express
const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  methodOverride = require('method-override'),
  expressSession = require('express-session'),
  User = require('./models/user'),
  seedDB = require('./seeds');

const app = express();

const commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  indexRoutes = require('./routes/index');

// Connect to the database
mongoose.connect(
  'mongodb://localhost/yelp_camp',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  err => {
    if (err) console.error(err);
    else console.log('Connected to the mongodb');
  }
);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
// We mention __dirname in case it changes
app.use(express.static(__dirname + '/public'));
// Execute the module to test the database
// seedDB();

// Passport configuration
app.use(
  expressSession({
    secret: 'This is a good app',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds/:campground_id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`YelpCamp server running on Port ${PORT}`));
