const express = require("express");
const Product = require("../models/Product");
const Order = require("../models/Order");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Customer membeli produk
router.post("/purchase", authenticateToken, async (req, res) => {
  if (req.user.role !== "customer")
    return res.status(403).json({ message: "Access denied" });

  const { productId, quantity } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Hitung total harga
    const totalAmount = product.price * quantity;

    // Cek diskon dan bebas ongkir
    let discount = 0;
    let shippingFee = 10000; // biaya pengiriman default (misalnya 10,000)

    if (totalAmount > 15000) {
      shippingFee = 0; // bebas ongkir
    }
    if (totalAmount > 50000) {
      discount = totalAmount * 0.1; // diskon 10%
    }

    const finalAmount = totalAmount - discount + shippingFee;

    // Buat transaksi/pesanan
    const order = await Order.create({
      customerId: req.user.id,
      productId: product.id,
      totalAmount: finalAmount,
      discount,
      shippingFee,
    });

    res.status(201).json({
      message: "Purchase successful",
      order,
      finalAmount,
      discount,
      shippingFee,
    });
  } catch (error) {
    res.status(400).json({ message: "Error processing purchase", error });
  }
});

// Melihat daftar produk
router.get("/products", authenticateToken, async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

module.exports = router;
