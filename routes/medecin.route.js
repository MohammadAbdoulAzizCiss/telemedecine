const express = require("express");
const router = express.Router();
const medecin = require("../controllers/medecin.controller");
const verifyJWT = require("../controllers/auth.controller");

router.post("/signup", medecin.signup);
router.post("/signin", verifyJWT, medecin.signin);

module.exports = router;
