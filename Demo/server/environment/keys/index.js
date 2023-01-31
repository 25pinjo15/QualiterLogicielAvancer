const fs = require("fs")

module.exports = {
  privateKey: fs.readFileSync("./environment/keys/jwtRS256.key"),
  publicKey: fs.readFileSync("./environment/keys/jwtRS256.key.pub")
}