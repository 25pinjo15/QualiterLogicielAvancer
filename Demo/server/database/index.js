const mongoose = require("mongoose");

const protocol = "mongodb+srv";
const url = "cluster0.1orzx1y.mongodb.net";
const params = "?retryWrites=true&w=majority";
const username = "25pinjo15";
const password = "2401982";
const database = "Cluster0";

const connectionString = `${protocol}://${username}:${password}@${url}/${database}${params}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useFindAndModify: false,
};

exports.connect = (callback) => mongoose
  .connect(connectionString, options)
  .then((db) => {
    console.log(`Connecté avec succès à la base ${database} sur ${ url }`);
    if(callback) callback()
  })
  .catch((err) => {
    console.log(err);
  });

exports.connectionString = connectionString