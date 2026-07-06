const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const compression = require("compression");
const morgan = require("morgan");
const logger = require("./utils/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const couponRoutes = require("./routes/couponRoutes");

const paymentRoutes =
    require("./routes/paymentRoutes");

const dashboardRoutes =
    require("./routes/dashboardRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map(origin => origin.trim())
    .filter(Boolean);

app.set("trust proxy", 1);

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(hpp());
app.use(compression());

/* -----------------------------
   Global Middleware
------------------------------ */

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json({
    limit: process.env.JSON_BODY_LIMIT || "10kb",
}));

app.use(express.urlencoded({
    extended: true,
    limit: process.env.URLENCODED_BODY_LIMIT || "10kb",
}));

if (process.env.NODE_ENV !== "test") {

    app.use(

        morgan("combined", {

            stream: {

                write: message => {

                    logger.info(message.trim());

                },

            },

        })

    );

}

// Rate Limiter

const limiter = rateLimit({

    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,

    max: Number(process.env.RATE_LIMIT_MAX) || 100,

    skip: () => process.env.NODE_ENV === "test",

    message: {

        success: false,

        message:
            "Too many requests. Please try again later."

    }

});

app.use("/api", limiter);

/* -----------------------------
   Health Check Routes
------------------------------ */

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "E-Commerce Backend API Running",

    });

});

app.get("/test", (req, res) => {

    res.send("Backend Working");

});

/* -----------------------------
   API Routes
------------------------------ */

app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use(
    "/api/coupons",
    couponRoutes
);

app.use(
    "/api/payments",
    paymentRoutes
);


app.use(
    "/api/dashboard",
    dashboardRoutes
);


app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


/* -----------------------------
   404 Route
------------------------------ */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found",

    });

});

/* -----------------------------
   Global Error Handler
------------------------------ */

app.use(errorHandler);

module.exports = app;
