require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db.config"); // pastikan path ke db.config sudah benar

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const merchantRoutes = require("./routes/merchant");
const customerRoutes = require("./routes/customer");

app.use("/api/auth", authRoutes);
app.use("/api/merchant", merchantRoutes);
app.use("/api/customer", customerRoutes);

// Sync Database
sequelize.sync().then(() => {
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});