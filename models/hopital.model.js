const mongoose = require("mongoose");

const HopitalSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  addresse: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Hopital", HopitalSchema);
