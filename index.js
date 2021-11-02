require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const medecin = require("./routes/medecin.route");
const hopital = require("./routes/hopital.route");
const admin = require("./routes/admin.route");
const patient = require("./routes/patient.route");

app.use(express.json());
app.use("/medecin", medecin);
app.use("/hopital", hopital);
app.use("/admin", admin);
app.use("/patient", patient);
app.use("*", (request, response) =>
  response.status(404).send({ message: "invalid route" })
);

mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("connected to cluster")
);

app.listen(process.env.PORT, () => console.log("server on port 8000"));
