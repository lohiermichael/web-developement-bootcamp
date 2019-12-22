const mongoose              = require("mongoose"),
      passportLocalMongoose = require('passport-local-mongoose');

// Define the User schema
var UserSchema = new mongoose.Schema({
    userName: String,
    password: String
});

// Add some method to our schema that are part of the passport-local-mongoose package
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);