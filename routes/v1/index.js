const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./user"));
router.use("/products", require("./product"));

module.exports = router;
