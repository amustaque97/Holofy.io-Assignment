const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    path = require("path"),
    fs = require("fs"),
    bookRoutes = require("./routes/books");

const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// db config 
const url = process.env.db_url || "mongodb://localhost/holofy";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useFindAndModify', false);


// Routes
app.use(bookRoutes);

// server
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
})