const HTTP_PORT = 3000;

const express = require("express");
const app = express();
exports.app = app

const db = require("./database");
const path = require("path");
const cookieParser = require("cookie-parser")
const router = require("./routes");

app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname, "public")));
app.use(router);

db.connect(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`Serveur NodeJS démarré sur http://localhost:${HTTP_PORT}`);
  });
});
