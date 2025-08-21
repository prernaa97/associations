import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    nationality: { type: String, required: true },
    book:{type:mongoose.Schema.Types.ObjectId,ref:"Book"}
}, {
    timestamps: false
});

const Author = mongoose.model("Author", authSchema);
export default Author;
