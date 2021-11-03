const Medecin = require("../models/medecin.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (request, response) => {
  const user = request.body.user;
  user.password = bcrypt.hashSync(user.password, 10);
  const DBMedecin = new Medecin({
    nom: user.nom.toLowerCase(),
    prenom: user.prenom.toLowerCase(),
    matricule: user.matricule.toLowerCase(),
    specialite: user.specialite.toLowerCase(),
    numtel: user.numtel.toLowerCase(),
    email: user.email.toLowerCase(),
    login: user.login.toLowerCase(),
    password: user.password,
  });
  Medecin.create(DBMedecin, (error, newDocument) => {
    if (error) response.status(500).json({ error });
    else response.status(201).json({ message: "new Medecin added" });
  });
};

const signin = async (request, response) => {
  const user = request.body.user;
  const DBMedecin = await Medecin.findOne({ login: user.login.toLowerCase() });
  if (!DBMedecin) response.json({ error: "user not found" });
  bcrypt.compare(user.password, DBMedecin.password).then((isValid) => {
    if (isValid) {
      const payload = {
        id: DBMedecin._id,
        login: DBMedecin.login,
      };
      jwt.sign(payload, process.env.SECRET, (error, token) => {
        if (error) return response.json({ message: error });
        response.json({
          message: "success",
          token: "Bearer " + token,
        });
      });
    } else
      response.json({
        message: "invalid username or password",
      });
  });
};

module.exports = {
  signup,
  signin,
};
