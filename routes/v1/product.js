const router = require("express").Router();
const { create } = require("../../controllers/product.controller");
const { verifyToken, validate } = require("../../middlewares");
const { createProduct } = require("../../validations/product");

router.post("/", verifyToken, validate(createProduct), create)

module.exports = router;
