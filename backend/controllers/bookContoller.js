const Book = require("../models/bookModel");
const Author = require("../models/authorModel");
const BookInstance = require("../models/bookInstanceModel");
const Genre = require("../models/genreModel");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.home_page = (req, res) => {
  async.parallel(
    {
      books: (cb) => {
        Book.countDocuments({}, cb);
      },
      authors: (cb) => {
        Author.countDocuments({}, cb);
      },
      bookinstances: (cb) => {
        BookInstance.countDocuments({}, cb);
      },
      genres: (cb) => {
        Genre.countDocuments({}, cb);
      },
    },
    (err, results) => {
      if (err) {
        res.json({ sucess: false, err });
      }
      res.json({
        success: true,
        books: results.books,
        authors: results.authors,
        bookinstances: results.bookinstances,
        genres: results.genres,
      });
    }
  );
};

exports.list_of_books = (req, res) => {
  Book.find({}, "title author")
    .populate("author")
    .populate("genre")
    .exec((err, result) => {
      if (err) {
        res.json({ success: false, err });
      }
      res.json({ success: true, result });
    });
};

exports.book_details = (req, res) => {
  async.parallel(
    {
      book: (cb) => {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(cb);
      },
      bookinstance: (cb) => {
        BookInstance.find({ book: req.params.id }).exec(cb);
      },
    },
    (err, results) => {
      if (err) {
        res.status(400).json({ err });
      }
      if (results.bookinstance == null) {
        res.status(200).json({ bookinstance: "No Matched Item" });
      }
      res.status(200).json({
        success: true,
        book: results.book,
        bookinstance: results.bookinstance,
      });
    }
  );
};

exports.create_book_form = (req, res) => {
  async.parallel(
    {
      authors: (cb) => {
        Author.find({}, "firstName lastName").exec(cb);
      },
      genres: (cb) => {
        Genre.find(cb);
      },
    },
    (err, results) => {
      if (err) {
        res.json({ success: false, message: "Error fetching Data" });
      }
      res.json({
        success: true,
        authors: results.authors,
        genres: results.genres,
      });
    }
  );
};

exports.create_book_post = [
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("genre", "Genre must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res) => {
    const errorFormatter = ({ location, param, msg }) => {
      return `${location}[${param}]: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);

    if (!result.isEmpty()) {
      return res.json({
        success: false,
        book: req.body,
        errors: result.array(),
      });
    } else {
      const book = new Book({
        author: req.body.author,
        title: req.body.title,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: req.body.genre,
      });
      book.save((err, result) => {
        if (err) {
          return console.error("Error saving book");
        }
        res.json({
          success: true,
          message: "book added successfully",
          book: result,
        });
      });
    }
  },
];

exports.update_book_form = (req, res) => {
  res.send("form to update a book");
};

exports.update_book_post = (req, res) => {
  res.send("post updated book to the database");
};

exports.delete_book_form = (req, res) => {
  res.send("delete a book form");
};

exports.delete_book_post = (req, res) => {
  res.send("delete a book from the database");
};
