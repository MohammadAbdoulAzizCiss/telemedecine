require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patient.model");

const signup = async (request, response) => {
  const user = request.body.user;
  user.password = bcrypt.hashSync(user.password, 10);
  const DBPatient = new Patient({
    nom: user.nom.toLowerCase(),
    prenom: user.prenom.toLowerCase(),
    adresse: user.adresse.toLowerCase(),
    email: user.email.toLowerCase(),
    numtel: user.numtel.toLowerCase(),
    CNI: user.CNI.toLowerCase(),
    login: user.login.toLowerCase(),
    password: user.password,
  });
  Patient.create(DBPatient, (error, newDocument) => {
    if (error) response.status(500).json({ error });
    else response.status(201).json({ message: "patient patient added" });
  });
};

const signin = async (request, response) => {
  const user = request.body.user;
  const DBPatient = await Patient.findOne({ login: user.login.toLowerCase() });
  if (!DBPatient) response.json({ error: "user not found" });
  bcrypt.compare(user.password, DBPatient.password).then((isValid) => {
    if (isValid) {
      const payload = {
        id: DBPatient._id,
        login: DBPatient.login,
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
