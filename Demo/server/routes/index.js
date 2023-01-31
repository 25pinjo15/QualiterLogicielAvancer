const router = require("express").Router();
const usersRouter = require("./users.routes")
const authRouter = require("./auth.routes")

router.use("/api/users", usersRouter)
router.use("/api/auth", authRouter)

module.exports = router