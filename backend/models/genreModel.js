const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const genreSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
  },
  { timestamps: true }
);

genreSchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});

const Genre = model("Genre", genreSchema);
module.exports = Genre;
