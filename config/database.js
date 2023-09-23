const mongoose = require("mongoose");
const config = require("./default");

module.exports = async function connect() {
  const dbUri = config.dbUri;
  
  try {
    await mongoose.connect(dbUri);
    console.log("Conectado ao banco de dados com sucesso");
  } catch (error) {
    console.log("Não foi possivel conectar");
    console.log(error);
  }
};
