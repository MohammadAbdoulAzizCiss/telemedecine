require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = async (request, response, next) => {
  const token = request.headers["x-access-token"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decodedData) => {
      if (error)
        response.json({
          isLoggedIn: false,
          message: "failed to authenticate",
        });
      request.user = {
        id: decodedData.id,
        login: decodedData.login,
      };
      next();
    });
  } else {
    response.json({ isLoggedIn: false, message: "invalid Token given" });
  }

  next();
};
module.exports = verifyJWT;
