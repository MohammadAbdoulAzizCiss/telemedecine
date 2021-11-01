const mongoose = require("mongoose");
const MedecinSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  matricule: {
    type: String,
    unique: true,
    required: true,
  },
  specialite: {
    type: String,
    unique: true,
    required: true,
  },
  numTel: {
    type: String,
    required: true,
  },
  email: {
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
module.exports = mongoose.model("Medecin", MedecinSchema);
