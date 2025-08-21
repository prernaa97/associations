
import express from "express";
import mongoose from "mongoose";
import MenuItem from "./models/menuItem.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/userdemo")
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("Connection Error"));

//Add 
app.post("/menu", async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    const saved = await item.save();
    res.json(saved);
  } catch (err) {
    console.log(err)
    res.status(400).send("Error adding item");
  }
});

// Get all vegetarian items
app.get("/menu/veg", async (req, res) => {
  const vegItems = await MenuItem.find({ isVeg: true });
  res.json(vegItems);
});

//Get items by category
app.get("/menu/category/:cat", async (req, res) => {
  const items = await MenuItem.find({ category: req.params.cat });
  res.json(items);
});

// Get items under ₹200
app.get("/menu/under/200", async (req, res) => {
  const items = await MenuItem.find({ price: { $lt: 200 } });
  res.json(items);
});

//  Increase price of all non-veg items by 10%
app.put("/menu/increase/nonveg", async (req, res) => {
  const result = await MenuItem.updateMany(
    { isVeg: false },
    { $mul: { price: 1.10 } }
  );
  res.send("Prices updated for non-veg items");
});

// ✏️ Rename a dish
app.put("/menu/rename/:oldName", async (req, res) => {
  const updated = await MenuItem.findOneAndUpdate(
    { itemName: req.params.oldName },
    { itemName: req.body.newName },
    { new: true }
  );
  res.json(updated);
});

// Delete items priced above ₹1000
app.delete("/menu/expensive", async (req, res) => {
  const result = await MenuItem.deleteMany({ price: { $gt: 1000 } });
  res.send(`${result.deletedCount} items deleted`);
});

//Delete item by name
app.delete("/menu/:name", async (req, res) => {
  const result = await MenuItem.deleteOne({ itemName: req.params.name });
  if (result.deletedCount === 0) {
    res.status(404).send("Item not found");
  } else {
    res.send("Item deleted");
  }
});

app.listen(3000,() =>{ 
    console.log("Server running on port 3000")
});
