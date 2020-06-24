const Book = require("../models/bookModel");
const checkVariable = require("../utils");
const { v4: uuidv4 } = require("uuid");

/**
 * Get all the book records
 */
exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();

        res.status(200).send(books);
    } catch (error) {
        res.status(400).send("Server error please try again later");
    }
}

/**
 * Get details of a specific book
 */
exports.getBookDetails = async (req, res, next) => {

    if (req.params.hasOwnProperty('bookId')) {
        var bookId = req.params.bookId;
    }

    console.log(`Get details of bookId ${bookId}`);

    // check if book is not null or undefined
    if (checkVariable(bookId)) {
        try {
            const bookDetails = await Book.findOne({ uuid: bookId });
            res.status(200).send(bookDetails);
        } catch (error) {
            console.log(error);
            res.status(400).send("No record found!")
        }
    } else {
        res.sendStatus(400).send("Please send the correct bookId")
    }
}

/**
 * Save new book record into the db
 */
exports.addBook = async (req, res, next) => {
    const data = req.body;

    console.log(data);

    // name & authorName values are required in the post call
    if (data.hasOwnProperty('name') && data.hasOwnProperty('authorName')) {
        if (checkVariable(data)) {
            data['uuid'] = uuidv4();

            // If release date is not sent in the request then use default time
            if (!data.hasOwnProperty('releaseDate'))
                data['releaseDate'] = Date.now();

            console.log(`Adding new record to database ${data}`);
            const newBook = new Book(data);
            await newBook.save();
            console.log(`Data saved in db`);

            res.status(201).send(newBook.toString());

        } else {
            res.status(400).send("Please send correct data to add a new book");
        }
    } else {
        res.status(400).send("Please post correct data");
    }
}

/**
 * Update the book record
 */
exports.updateBookDetails = async (req, res, next) => {
    // check if bookId is passed as the parameter or not
    if (!req.params.hasOwnProperty('bookId')) {
        res.status(400).send("Please pass bookId as paramter");
        return;
    }

    // check data passed in the patch call
    if ((!req.body.hasOwnProperty('name')) && (!req.body.hasOwnProperty('authorName')) &&
        (!req.body.hasOwnProperty('releaseDate'))) {
        res.status(400).send("Please send valid data to update");
        return;
    }

    const bookId = req.params.bookId;
    const data = req.body;

    try {
        const updatedRecord = await Book.findOneAndUpdate({ uuid: bookId }, data, { new: true });
        // console.log(updatedRecord);
        if (checkVariable(updatedRecord)) {   // if updateRecord is null then, there is no record
            res.sendStatus(204);
        } else {
            res.status(400).send("No such record found!");
        }
    } catch (error) {
        res.status(400).send("Error while updating record");
    }


}

/**
 * Controller for deleting book record
 */
exports.deleteBook = async (req, res, next) => {
    if (!req.params.hasOwnProperty('bookId')) {
        res.status(400).send("Please pass bookId as paramter");
        return;
    }

    const bookId = req.params.bookId;

    try {
        await Book.findOneAndDelete({ uuid: bookId }, (data) => {
            res.sendStatus(204);
        });
    } catch (error) {
        res.status(400).send("Error in deleting book");
    }
}
