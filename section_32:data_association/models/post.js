// Refer to mongoose in the module
const mongoose = require('mongoose');

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

//  Export the object we are interested in
module.exports = mongoose.model("Post", postSchema);