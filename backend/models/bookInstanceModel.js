const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const moment = require("moment");

const bookInstanceSchema = Schema(
  {
    book: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
    imprint: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "Maintenance", "Loaned", "Reserved"],
      required: true,
    },
    dateDueBack: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

bookInstanceSchema.virtual("dueBackDate").get(function () {
  return moment(this.dateDueBack).format("MMMM Do, YYYY");
});

bookInstanceSchema.virtual("url").get(function () {
  return `/catalog/bookinstance/${this._id}`;
});

const BookInstance = model("BookInstance", bookInstanceSchema);
module.exports = BookInstance;
