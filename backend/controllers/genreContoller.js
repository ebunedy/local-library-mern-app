const Genre = require("../models/genreModel");
const Book = require("../models/bookModel");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.list_of_genres = (req, res) => {
  Genre.find()
    .sort([["name", "ascending"]])
    .exec((err, results) => {
      if (err) {
        res.json({ err: "Error Fetching Data" });
      }
      res.status(200).json({ success: true, result: results });
    });
};

exports.genre_details = (req, res) => {
  async.parallel(
    {
      genre: (cb) => {
        Genre.findById(req.params.id).exec(cb);
      },
      genre_books: (cb) => {
        Book.find({ genre: req.params.id }).exec(cb);
      },
    },
    (err, results) => {
      if (err) {
        res.status(400).json({ err: "Error Fetching Data" });
      }
      if (results.genre === null) {
        res.json({ err: "Genre Not Found" });
      }
      res.status(200).json({
        success: true,
        genre: results.genre,
        genreBooks: results.genre_books,
      });
    }
  );
};

exports.create_genre_form = (req, res) => {
  res.json({ success: true, title: "Create Genre" });
};

exports.create_genre_post = [
  body("name", "Genre Name Required").trim().isLength({ min: 1 }).escape(),
  (req, res) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      // resulting errors!
      return `${location}[${param}]: ${msg}`;
    };
    //errors from validation
    const result = validationResult(req).formatWith(errorFormatter);

    //create new genre
    let genre = new Genre({ name: req.body.name });

    if (!result.isEmpty()) {
      res.json({ success: false, genre: genre, errors: result.array() });
    } else {
      Genre.findOne({ name: req.body.name }).exec((err, found_genre, next) => {
        if (err) {
          return next(err);
        }
        if (!found_genre) {
          genre.save((err, genre) => {
            if (err) {
              res.json({
                success: false,
                message: "Error occur while saving genre",
              });
            }
            res.json({
              success: true,
              message: "Genre added successfully",
              genre: genre,
            });
          });
        }
      });
    }
  },
];

exports.update_genre_form = (req, res) => {
  res.send("form to update a genre");
};

exports.update_genre_post = (req, res) => {
  res.send("post updated genre to the database");
};

exports.delete_genre_form = (req, res) => {
  res.send("delete a genre form");
};

exports.delete_genre_post = (req, res) => {
  res.send("delete a genre from the database");
};
