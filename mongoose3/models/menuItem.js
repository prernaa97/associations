
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  isVeg: { type: Boolean, required: true },
  category: { type: String, required: true }
});

const MenuItem = mongoose.model("MenuItem", menuSchema);
export default MenuItem;
