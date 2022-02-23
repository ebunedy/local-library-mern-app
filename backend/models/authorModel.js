const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const moment = require("moment");

const authorSchema = new Schema(
  {
    firstName: { type: String, required: true, max: 100 },
    lastName: { type: String, required: true, max: 100 },
    dateOfBirth: { type: Date, required: true },
    dateOfDeath: { type: Date, required: false },
  },
  { timestamps: true }
);

authorSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

authorSchema.virtual("lifespan").get(function () {
  let present;
  if (!this.dateOfDeath) {
    present = "Present";
  }
  if (this.dateOfDeath) {
    present = moment(this.dateOfDeath).format("MMMM Do, YYYY");
  }
  return `${moment(this.dateOfBirth).format("MMMM Do, YYYY")} - ${present}`;
});

authorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

const Author = model("Author", authorSchema);
module.exports = Author;
