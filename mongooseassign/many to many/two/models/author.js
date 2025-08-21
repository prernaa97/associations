import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: String,
  email: String,
  nationality: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }]
});

export default mongoose.model("Author", authorSchema);
