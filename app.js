const express = require("express");
const sequelize = require("./config/db.config");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
require("dotenv").config();

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const merchantRoutes = require("./routes/merchant");
app.use("/api/merchant", merchantRoutes);

const customerRoutes = require("./routes/customer");
app.use("/api/customer", customerRoutes);

const app = express();
app.use(express.json());

// Sinkronisasi dengan database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => console.log("Error syncing database:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
