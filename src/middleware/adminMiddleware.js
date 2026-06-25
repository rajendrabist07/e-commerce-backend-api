const authorizeAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            success: false,
            message: "Admin Access Required",
        });

    }

    next();
};

module.exports = authorizeAdmin;