const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const productRoutes = require("./routes/productRoutes");

const cartRoutes =
    require("./routes/cartRoutes");

const orderRoutes =
    require("./routes/orderRoutes");

const validatore =
    require("./validators/authValidator");

const errorHandler =
    require("./middleware/errorMiddleware");

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
})
);

app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Ecommerce Backend Running"
    });
});


app.get("/test", (req, res) => {
    res.send("Backend Working");
});

app.use(
    "/api/products", productRoutes
);

app.use(
    "/api/cart", cartRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

app.use(errorHandler);

module.exports = app;