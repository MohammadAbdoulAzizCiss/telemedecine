const express = require("express");
const router = express.Router();
const patient = require("../controllers/patient.controller");
const verifyJWT = require("../controllers/auth.controller");

router.post("/signin", verifyJWT, patient.signin);

module.exports = router;
