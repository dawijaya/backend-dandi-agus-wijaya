const express = require("express");
const Product = require("../models/Product");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Create Product
router.post("/products", authenticateToken, async (req, res) => {
  if (req.user.role !== "merchant")
    return res.status(403).json({ message: "Access denied" });

  const { name, price } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      merchantId: req.user.id,
    });
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
});

// List Products
router.get("/products", authenticateToken, async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Update Product
router.put("/products/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "merchant")
    return res.status(403).json({ message: "Access denied" });

  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const product = await Product.findOne({
      where: { id, merchantId: req.user.id },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.price = price || product.price;
    await product.save();

    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
});

// Delete Product
router.delete("/products/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "merchant")
    return res.status(403).json({ message: "Access denied" });

  const { id } = req.params;

  try {
    const product = await Product.findOne({
      where: { id, merchantId: req.user.id },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting product", error });
  }
});

const Order = require("../models/Order");
const User = require("../models/User");

// Daftar pelanggan yang membeli produk merchant
router.get("/orders", authenticateToken, async (req, res) => {
  if (req.user.role !== "merchant")
    return res.status(403).json({ message: "Access denied" });

  try {
    const orders = await Order.findAll({
      include: [
        { model: Product, where: { merchantId: req.user.id } },
        { model: User, as: "customer", attributes: ["username"] },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

module.exports = router;
