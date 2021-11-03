const Admin = require("../models/admin.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signin = async (request, response) => {
  const user = request.body.user;
  const DBAdmin = await Admin.findOne({ login: user.login.toLowerCase() });
  if (!DBAdmin) response.json({ error: "access denied" });
  bcrypt.compare(user.password, DBAdmin.password).then((isValid) => {
    if (isValid) {
      const payload = {
        id: DBAdmin._id,
        login: DBAdmin.login,
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

module.export = signin;
