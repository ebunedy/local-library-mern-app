const Author = require("../models/authorModel");
const { body, validationResult } = require("express-validator");
const async = require("async");
const Book = require("../models/bookModel");

exports.list_of_authors = (req, res) => {
  Author.find()
    .sort([["firstName", "ascending"]])
    .exec((err, results) => {
      if (err) {
        res.json({ sucess: false, err: "Error Fetching Data" });
      }
      res.json({ success: true, result: results });
    });
};

exports.author_details = (req, res) => {
  async.parallel(
    {
      author: (cb) => Author.findById(req.params.id).exec(cb),
      books: (cb) =>
        Book.find({ author: req.params.id }, "title summary").exec(cb),
    },
    (err, results) => {
      if (err) {
        res.json({ success: false, err: "Error fetching Author" });
      }
      if (results.books === null) {
        res.json({ books: "No matched item" });
      }
      res.json({ success: true, author: results.author, books: results.books });
    }
  );
};

exports.create_author_form = (req, res) => {
  res.json({ title: "Create Author" });
};

exports.create_author_post = [
  body("firstName", "First name can not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "last name can not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("dateOfBirth", "Invalid date of birth").isISO8601().toDate(),
  body("dateOfDeath", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res) => {
    // formart errors
    const errorFormatter = ({ location, msg, param }) => {
      return `${location}[${param}]: ${msg}`;
    };
    // errors from validation
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      res.json({ success: false, author: req.body, errors: result.array() });
    } else {
      const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        dateOfDeath: req.body.dateOfDeath,
      });
      author.save((err, author) => {
        if (err) {
          res.json({
            success: false,
            message: "Error occur while saving author",
          });
        }
        res.json({
          success: true,
          message: "Author added successfully",
          author: author,
        });
      });
    }
  },
];

exports.update_author_form = (req, res) => {
  res.send("form to update an author");
};

exports.update_author_post = (req, res) => {
  res.send("post updated author to the database");
};

exports.delete_author_form = (req, res) => {
  res.send("delete a author form");
};

exports.delete_author_post = (req, res) => {
  res.send("delete a author from the database");
};
