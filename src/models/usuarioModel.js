const { Mongoose, model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioModel = new Schema({
  nome: { type: String, required: true },
  email: {
    type: String,
    unique: [true, "Email já cadastrado"],
    required: [true, "Campo obrigatório"],
  },
  senha: { type: String, minlength: 8, required: true },
  contatoWhatsapp: { type: String, required: true },
  dataRegistro: { type: Date, default: Date.now },
});

usuarioModel.pre("save", function (next) {
  if (this.isNew || this.isModified("senha")) {
    bcrypt.hash(this.senha, 8, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        this.senha = hashedPassword;
        next();
      }
    });
  }
});

usuarioModel.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.senha, function (err, isMatch) {
    if (err) {
      callback(err);
    } else {
      callback(err, isMatch);
    }
  });
};
const Usuario = model("Usuario", usuarioModel);

module.exports = {
  Usuario,
};
