import express from "express";
import mongoose from "mongoose";
import Book from "./models/book.js";
import Author from "./models/author.js";

const app=express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/onetomany").then(()=>{
    console.log("Database connected")
}).catch(()=>{
    console.log("Some error is there in connection");
});

app.post("/books",async(req,res)=>{
    try{
    const book=new Book (req.body);
    const book1= await book.save();
    res.json(book1);
    }catch(err){
        res.status(400).send("Error is there")
    }
});

app.post("/authors", async (req, res) => {
    try {
        console.log("REQ BODY", req.body);  // Debug input
        const auth = new Author(req.body);
        const auth1 = await auth.save();
        res.json(auth1);
    } catch (err) {
        console.log(err);
        res.status(400).send("Error is there");
    }
});


app.get("/authors",async(req,res)=>{
    try{
       const auth=await Author.find().populate("book");
       res.json(auth)
    }catch(err){
        res.status(400).send("Error is there");
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find().populate("author");  // virtual field
        res.json(books);
    } catch (err) {
        console.log(err);
        res.status(400).send("Error is there");
    }
});



app.listen(3000,()=>{
    console.log("server started");
})