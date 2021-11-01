const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  nom: {
    type: String,

    required: true,
  },
  prenom: {
    type: String,

    required: true,
  },
  login: {
    type: String,

    required: true,
  },
  password: {
    type: String,

    required: true,
  },
});
module.exports = mongoose.model("Admin", AdminSchema);
