const express = require("express"),
        router = express.Router();

const bookController = require("../controllers/books");

// API endpoints

// fetch all books
router.get("/books", bookController.getBooks);

// fetch single book details
router.get("/book/:bookId", bookController.getBookDetails);

// add new book
router.post("/book/add", bookController.addBook);

// update book details
router.patch("/book/:bookId/update", bookController.updateBookDetails);

// delete book 
router.delete("/book/:bookId/delete", bookController.deleteBook);

module.exports = router;