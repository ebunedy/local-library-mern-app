const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const catalogRouter = require("./routes/catalog");
const usersRouter = require("./routes/users");

app.use("/catalog", catalogRouter);
app.use("/user", usersRouter);

const mongoUri = process.env.ATLAS_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log(`database connection established successfully`);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
