require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});