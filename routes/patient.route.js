const express = require("express");
const router = express.Router();
const Patient = require("../models/patient.model");
const patient = require("../controllers/patient.controller");

router.post("/signup", patient.signUp);

module.exports = router;
