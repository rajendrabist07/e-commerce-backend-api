const express = require("express");

const router = express.Router();

const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,

} = require("../controllers/productController");

const protect =
    require("../middleware/authMiddleware");

const authorizeAdmin =
    require("../middleware/adminMiddleware");
const { adminOnly } = require("../controllers/userController");

router.post("/", protect, authorizeAdmin, adminOnly, createProduct);
router.get("/", getProducts)
router.get("/:id", getSingleProduct);
router.put("/:id", protect, authorizeAdmin, adminOnly, updateProduct);
router.delete("/:id", protect, authorizeAdmin, adminOnly, deleteProduct);


module.exports = router;