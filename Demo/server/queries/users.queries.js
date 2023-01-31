const ITEM_IMAGE_PATH = '/images/items/';
const User = require('../database/models/user.model');

//Objectif: Récupérer les données de l'utilisateur par son ID
exports.findUserByID = (id) => {
  return User.findById(id).select('-local.password');
};

//Objectif: Récupérer les données de l'utilisateur par son courriel
exports.findUserByEmail = (email) => {
  return User.findOne({ 'local.email': email });
};

//Objectif: Créer un nouvel utilisateur avec mot de passe haché
exports.createUser = async (data) => {
  const user = await this.findUserByEmail(data.email);
  if (user) throw new Error('Courriel déjà utilisé');

  const hashedPassword = await User.hashPassword(data.password);
  const newUser = new User({
    name: data.name,
    local: {
      email: data.email,
      password: hashedPassword,
    },
  });
  return newUser.save();
};
