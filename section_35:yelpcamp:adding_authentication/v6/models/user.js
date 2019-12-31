var mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');
mongoose.set('useCreateIndex', true);

// User schema
var UserSchema = new mongoose.Schema({
    name: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);