import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  genre: String,
  publishedYear: Number,
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }]
});

export default mongoose.model("Book", bookSchema);
