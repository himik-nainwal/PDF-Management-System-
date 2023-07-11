const router = require("express").Router();

const filesRouter = require("../../controllers/files/files")

router.post("/uploadFile",filesRouter.uploadFile);

module.exports = router;