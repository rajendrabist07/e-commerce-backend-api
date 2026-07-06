const express = require("express");

const router = express.Router();

const {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,

} = require("../controllers/productController");

const protect =
    require("../middleware/authMiddleware");

const authorizeAdmin =
    require("../middleware/adminMiddleware");

const { adminOnly } = 
    require("../controllers/userController");

const productValidation = 
    require("../validators/productValidation");

const validate = 
    require("../middleware/validationMiddleware");

const upload = 
    require("../middleware/uploadMiddleware");

const reviewValidation =
    require("../validators/reviewValidation");

// Public
router.get("/", getProducts);
router.get("/:id", getSingleProduct);

// Admin
router.post(
    "/",
    protect,
    authorizeAdmin,
    upload.single("image"),
    productValidation,
    validate,
    createProduct
);

router.put(
    "/:id",
    protect,
    authorizeAdmin,
    upload.single("image"),
    updateProduct
);

router.delete(
    "/:id",
    protect,
    authorizeAdmin,
    deleteProduct
);

// User Reviews
router.post(
    "/:id/review",
    protect,
    reviewValidation,
    validate,
    createProductReview
);


module.exports = router;