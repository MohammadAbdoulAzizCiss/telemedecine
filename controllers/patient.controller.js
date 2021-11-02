const Patient = require("../models/patient.model");

const signUp = async (request, response) => {
  //retrieve the user body
  const user = request.body.user;

  //check if user mail already in the db
  const mail = await Patient.findOne({ email: user.email });
  const login = await Patient.findOne({ login: user.login });
  if (mail || login) {
    response.send({
      message: "mail or login already in use",
    });
  } else {
    const newPatient = new Patient(user);
    Patient.create(newPatient, (error, newDocument) => {
      if (error) response.status(500).send({ error });
      else response.status(201).send({ message: "patient patient added" });
    });
  }

  //if it is then define duplocate error
  //else insertOne
};

module.exports = {
  signUp,
};
