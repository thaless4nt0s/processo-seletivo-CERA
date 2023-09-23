const { express } = require("express");
const { Usuario } = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");
const secret = "AAAAA";
async function createUsuario(req, res) {
  const { nome, email, senha, contatoWhatsapp } = req.body;
  const usuarioNovo = new Usuario({ nome, email, senha, contatoWhatsapp });
  try {
    await usuarioNovo.save();
    return res.status(200).json(usuarioNovo);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar um usuario " + error });
  }
}

async function mostrarUsuario(req, res) {
  try {
    const usuarioEncontrado = await Usuario.findById(req.params.id).select(
      "-senha"
    );
    return res.status(200).json(usuarioEncontrado);
  } catch (error) {
    return res.status(404).json({ error: "Erro ao mostrar usuário: " + error });
  }
}

async function atualizarSenhaUsuario(req, res) {
  try {
    const id = req.params.id;
    const { senha } = req.body;
    const usuarioAtualizado = await Usuario.findById(id);
    usuarioAtualizado.senha = senha;
    usuarioAtualizado.save();

    if (!usuarioAtualizado) {
      return res.status(404).json({ error: "Usuário não encontrado ! " });
    }
    return res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso !" });
  } catch (error) {
    return res
      .status(422)
      .json({ error: "Falha ao atualizar usuario: " + error });
  }
}

async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body;
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      res.status(401).json({ error: "Incorrect e-mail or password !!" });
    } else {
      usuario.isCorrectPassword(senha, function (error, same) {
        if (!same) {
          res.status(401).json({ error: "Incorrect e-mail or password !!!" });
        } else {
          const token = jwt.sign({ email }, secret, { expiresIn: "1d" });
          res.json({ usuario, token });
        }
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Error, please Try Again " + error });
  }
}

module.exports = {
  createUsuario,
  mostrarUsuario,
  atualizarSenhaUsuario,
  loginUsuario,
};
