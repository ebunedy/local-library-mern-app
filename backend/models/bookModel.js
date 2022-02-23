const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  },
  { timestamps: true }
);

bookSchema.virtual("url").get(function () {
  return `/catalog/book/${this._id}`;
});

const Book = model("Book", bookSchema);
module.exports = Book;
