import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/userdemo")
  .then(() => console.log("DB Connected"))
  .catch(() => console.log(" DB Connection Error"));  

// Create products
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error saving product");
  }
});

//Fetch all products
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Filter products by category
app.get("/products/category/:cat", async (req, res) => {
  const items = await Product.find({ category: req.params.cat });
  res.json(items);
});

//  Get in-stock products under ₹500
app.get("/products/instock/under500", async (req, res) => {
  const items = await Product.find({ inStock: true, price: { $lt: 500 } });
  res.json(items);
});

// Change price of product by name
app.put("/products/update-price/:name", async (req, res) => {
  const updated = await Product.findOneAndUpdate(
    { name: req.params.name },
    { price: req.body.price },
    { new: true }
  );
  res.json(updated);
});

// Mark all inStock = false for a category
app.put("/products/outofstock/:category", async (req, res) => {
  const updated = await Product.updateMany(
    { category: req.params.category },
    { $set: { inStock: false } }
  );
  res.send(`${updated.modifiedCount} products marked out of stock`);
});

// Delete product by name
app.delete("/products/:name", async (req, res) => {
  const result = await Product.deleteOne({ name: req.params.name });
  if (result.deletedCount === 0) {
    res.status(404).send("Product not found");
  } else {
    res.send("Product deleted");
  }
});

// Delete all out-of-stock products
app.delete("/products/outofstock/all", async (req, res) => {
  const result = await Product.deleteMany({ inStock: false });
  res.send(`${result.deletedCount} out-of-stock products deleted`);
});

app.listen(3000, () => {
  console.log(" Server running on port 3000");
});
