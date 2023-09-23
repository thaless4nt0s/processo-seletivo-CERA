const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarioModel");

const WithAuth = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({ error: "Unauthorized: no token provided" });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized: invalid token" });
      } else {
        req.email = decoded.email; //pega o token decodado e coloca na requisicao
        User.findOne({ email: decoded.email })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((error) => {
            res.status(401).json({ error: error });
          });
      }
    });
  }
};

module.exports = WithAuth;
