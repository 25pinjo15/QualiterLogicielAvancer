const jtw = require("jsonwebtoken")
const { findUserByEmail } = require('../queries/users.queries');
const { privateKey } = require("../environment/keys")

//Objectif: Vérifier si l'utilisateur existe déjà par son courriel sinon :
//          Créer un nouvel utilisateur et le retourner au front-end incluant
//          un jeton d'authentification en cookie
exports.sessionCreate = async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await findUserByEmail(req.body.email);
    if (user) {
      const match = user.comparePassword(req.body.password);
      if(match) {
        const token = jtw.sign({}, privateKey, {
          subject: user._id.toString(),
          expiresIn: 60, //60 * 60 * 24 * 30  pour 1 mois
          algorithm: "RS256"
        });
        res.cookie("token", token)
        res.json(user)
      } else {
        res.json({ error: 'Bad username or password' });
      }
    } else {
      res.json({ error: 'Bad username or password' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};


//Objectif: Supprimer le cookie de jeton pour déconnecter l'utilisateur
exports.sessionDelete = (req, res, next) => {
  try {
    res.clearCookie("token")
    res.end()
  } catch(error) {
    res.json({ error: error.message });
  }
};
