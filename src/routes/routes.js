const express = require("express");
const router = express.Router();
const WithAuth = require("../middlewares/auth");

const {
  createUsuario,
  mostrarUsuario,
  atualizarSenhaUsuario,
  loginUsuario,
} = require("../controllers/usuarioController");

router
  .post("/autenticacao/registrar", WithAuth, createUsuario)
  .get("/perfil/:id", WithAuth, mostrarUsuario)
  .patch("/perfil/senha/alterar/:id", WithAuth, atualizarSenhaUsuario)
  .post("/autenticacao/entrar", loginUsuario);

module.exports = router;
