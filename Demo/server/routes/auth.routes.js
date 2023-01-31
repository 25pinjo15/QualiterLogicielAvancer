const router = require("express").Router();
const { signinForm, sessionCreate, sessionDelete } = require("../controllers/auth.controller")

router.post("/", sessionCreate)
router.delete("/", sessionDelete)

module.exports = router;