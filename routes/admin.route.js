const express = require("express");
const router = express.Router();
const patient = require("../controllers/patient.controller");
const medecin = require("../controllers/medecin.controller");

router.post("/addpatient", patient.signup);
router.post("/addmedecin", medecin.signup);

module.exports = router;
