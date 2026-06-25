const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "User Route Working",
    });
});

const {
    registerUser,
    loginUser,
    getUser,
} = require("../controllers/userController");


const protect = require("../middleware/authMiddleware")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUser);


module.exports = router;