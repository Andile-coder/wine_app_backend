const jwt = require("jsonwebtoken");
const InvalidToken = require("../models/InvalidTokens");
const { where } = require("sequelize");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    const invalidatedTokens = await InvalidToken.findOne({ where: { token } });

    if (invalidatedTokens != null) {
      res.status(401).send({ message: "User logged out" });
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: "User unauthorized" });
        }
        console.log("decode", decoded);

        req.user =
          decoded.user == undefined
            ? decoded.Driver == undefined
              ? decoded.admin
              : decoded.Driver
            : decoded.user;
        next();
      });
    }
  } else {
    res.status(401).send({ message: "User unauthorized" });
  }
};

module.exports = validateToken;
