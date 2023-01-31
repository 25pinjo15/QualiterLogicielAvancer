const router = require('express').Router();
const { signup, fetchCurrentUser } = require('../controllers/users.controller');

router.post('/', signup);
router.get('/', fetchCurrentUser);

module.exports = router;