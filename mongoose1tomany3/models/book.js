import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: String, required: true }
    
}, {
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


bookSchema.virtual("author", {
    ref: "Author",
    localField: "_id",
    foreignField: "book"
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
