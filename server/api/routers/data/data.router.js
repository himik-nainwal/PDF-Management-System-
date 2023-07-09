const router = require("express").Router();
const dataRouter = require("../../controllers/data/data");

router.get('/userskadata', authenticateToken, dataRouter.userskadata);
module.exports = router;