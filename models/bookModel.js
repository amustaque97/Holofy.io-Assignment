const mongoose = require("mongoose");

// Schema for book model as mentioned in the assignment
const bookSchema = new mongoose.Schema({
    uuid: String,
    name: String,
    releaseDate: Number, 
    authorName: String
});

module.exports =  mongoose.model("Book", bookSchema);