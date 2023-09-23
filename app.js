const express = require("express");
const config = require("./config/default");
const rotasAPI = require("./src/routes/routes");
const db = require("./config/database");

const app = express();
app.use(express.json());

app.use("/", rotasAPI);

//porta da aplicacao
const port = config.port;
app.listen(port, async () => {
  await db();
  console.log("Conectado ao servidor com sucesso");
});
