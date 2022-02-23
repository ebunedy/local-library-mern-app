const BookInstance = require("../models/bookInstanceModel");
const { body, validationResult } = require("express-validator");
const Book = require("../models/bookModel");

exports.list_of_bookInstances = (req, res) => {
  BookInstance.find({})
    .populate("book")
    .exec((err, results) => {
      if (err) {
        res.json({ err: "Error Fetching Data" });
      }
      res.json({ success: true, result: results });
    });
};

exports.bookInstance_details = function (req, res) {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec((err, bookinstance) => {
      if (err) {
        res.json({ err: "Error Fetching Data" });
      }
      if (bookinstance === null) {
        res.json({ error: "No matched item" });
      }
      Book.findById(bookinstance.book._id, "author genre")
        .populate("author", "firstName lastName")
        .populate("genre")
        .exec((err, book) => {
          if (err) {
            res.json({ err: "Error Fetching Data" });
          }
          res.json({ success: true, bookinstance: bookinstance, book: book });
        });
    });
};

exports.create_bookInstance_form = function (req, res) {
  Book.find({}, "title").exec((err, result) => {
    if (err) {
      res.json({ success: false, message: "Error fetching Data" });
    }
    res.json({ success: true, books: result });
  });
};

exports.create_bookInstance_post = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("dateDueBack", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  function (req, res) {
    const errorFormatter = ({ location, msg, param }) => {
      return `${location}[${param}]: ${msg}`;
    };
    const errors = validationResult(req).formatWith(errorFormatter);

    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      dateDueBack: req.body.dateDueBack,
    });

    if (!errors.isEmpty()) {
      return res.json({
        success: false,
        book: req.body,
        errors: errors.array(),
      });
    }
    bookinstance.save((err, bookinstance) => {
      if (err) {
        return console.error("Error saving instance");
      }
      res.json({
        success: true,
        message: "bookinstance added successfully",
        bookinstance: bookinstance,
      });
    });
  },
];

exports.update_bookInstance_form = function (req, res) {
  res.send("form to update a book instance");
};

exports.update_bookInstance_post = function (req, res) {
  res.send("post updated book instance to the database");
};

exports.delete_bookInstance_form = function (req, res) {
  res.send("delete a book instance form");
};

exports.delete_bookInstance_post = function (req, res) {
  res.send("delete a book instance from the database");
};
