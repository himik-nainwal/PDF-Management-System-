const router = require("express").Router();
const dataRouter = require("../../controllers/data/data");
const authenticateToken = require("../../middlewares/authMiddleware");
router.post('/dataofusers', authenticateToken, dataRouter.dataofusers);
module.exports = router;