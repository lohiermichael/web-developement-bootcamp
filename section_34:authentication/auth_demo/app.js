// Import Express
const express = require('express'),
mongoose = require('mongoose');

const app = express();

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


app.set('view engine', 'ejs');

app.get("/", (req,res) => {
    res.render("home");
});

app.get("/secret", (req,res) => {
    res.render("secret");
});

// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => console.log(`Server Running On Port ${PORT}`));