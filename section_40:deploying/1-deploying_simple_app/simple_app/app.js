const express = require('express'),
    app = express();

app.set('view engine', 'ejs');

//  Home page
app.get("/", (req, res) => {
    res.render('home');
});

// About page
app.get("/about", (req, res) => {
    res.render('about');
});


// Listen on a PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));