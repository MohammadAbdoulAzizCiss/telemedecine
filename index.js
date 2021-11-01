const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/telemedecine", () =>
  console.log("connected to cluster")
);

app.listen(8000, () => console.log("server on port 8000"));
