// 1. Import Mongoose
var mongoose = require("mongoose");

// 2. Connect to a database
// Here we interact with a database that is called cat_app. As it can't find it at first it will make it
mongoose.connect(
  "mongodb://localhost/cat_app",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  err => {
    if (err) console.error(err);
    else console.log("Connected to the mongodb");
  }
);
// 3. Make an object structure: schema
// It is not a fixed structure as we are handling noSQL database but it is a good structure to have
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// 4. Make a collection with the schema on which we will call methods
// The first argument of the the "model" method will be pluralized to make the name of the collection
var Cat = mongoose.model("Cat", catSchema);

// 5. Add a new cat to the database
// var george = new Cat({
//   name: "Mrs. Norris",
//   age: 7,
//   temperament: "Evil"
// });

// We always add a callback function to check the state of the request to the database
// because it takes time
// george.save(function(err, cat) {
//   if (err) {
//     console.log("SOMETHING WENT WRONG");
//   } else {
//     console.log("WE JUST SAVED A CAT TO THE DB");
//     console.log(cat);
//   }
// });

// Instead of making a new object and save it we can use the "create" method on Cat
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat) {
    if (err){
        console.log("Error: ", err);
    }
    else{
        console.log("New cat");
        console.log(cat);
    }
});

// 5. Retrieve all cats from the database and console.log each one
Cat.find({}, function(err, cats){
    if (err){
        console.log("Error", err);
    }
    else {
        console.log("All the cats");
        console.log(cats);
    }
});