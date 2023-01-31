const { createUser, findUserByEmail, findUserByID } = require('../queries/users.queries');
const { privateKey } = require('../environment/keys');
const jtw = require('jsonwebtoken');

//Objectif: Vérifier si l'utilisateur existe déjà par son courriel
exports.verifyEmail = async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.params.email);
    res.send(user ? { email: user.local.email } : null);
  } catch (err) {
    next(err);
  }
};

//Objectif: Créer un nouvel utilisateur et le retourner au front-end
exports.signup = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.json(user);
  } catch (err) {
    res.json({ error: err.message });
  }
};

//Objectif: Vérifier si l'utilisateur demandé a un jeton valide et
//          retourner les données de l'utilisateur s'il y a lieu.
exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      jtw.verify(token, privateKey, async (error, decoded) => {
        if (!error) {
          const user = await findUserByID(decoded.sub);
          if (user) {
            res.json(user);
            return;
          }
        } else {
          res.clearCookie("token")
          res.json(null);
        }
      });
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
};
