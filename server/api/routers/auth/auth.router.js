const router = require("express").Router();
const authRouter = require("../../controllers/auth/auth")

router.post("/signup",authRouter.signup);
router.post("/login",authRouter.login);
router.post("/verifyOTP",authRouter.verifyOTP);
module.exports = router;