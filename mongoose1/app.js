import express from "express";
import mongoose from "mongoose";
import Book from "./models/book.js";

const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/userdemo").then(()=>{
    console.log("Database connected")
}).catch(()=>{
    console.log("Some error is there in connection");
});
app.post("/books",async(req,res)=>{
    try{
    const book=new Book(req.body);   
    const book1=await book.save()
    res.json(book1);
    }catch(err){    
        res.status(400).send(err)
    }
});
// Fetch all books.
 app.get("/books",async(req,res)=>{
 try{
 const books=await Book.find();
 res.json(books);
 }catch(err){
        res.status(400).send("Some error is there");
    }
});
// get by id
app.get("/books/:id",async(req,res)=>{
    try{
       const book=await Book.findById(req.params.id);
       if(!book){
        res.status(404).send("Book not found");
       }
       res.json(book);
    }catch(err){
        res.status(400).send("Some error is there")
    }
});
// Get books published after 2015
app.get("/books/year/after/2015", async (req, res) => {
  try {
    const books = await Book.find({ year:{ $gt: 2015 } });
    
    if (books.length === 0) {
      return res.status(404).send("No books found after 2015"); 
    }

    res.json(books);
  } catch (err) {
    console.log(err);      
    res.status(400).send("Error fetching books"); 
  }
});

// Get books by a specific author.


app.get("/books/author/:author",async(req,res)=>{ 
  try {
    const book = await Book.findOne({ author: req.params.author });

    if (!book) return res.status(404).send("Book not found");

    res.json(book);
  } catch (err) {
    res.status(400).send("An error occurred");
  }
});
// Change the available status of a book.

app.put("/books/:id",async(req,res)=>{
    try{
        const update=await Book.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.json(update);

       

        if(!update){
            res.status(404).send("not found")
        }
    }catch(err){
        res.status(400).send("error is there")

    }
});
// Update genre for all books of a specific author.
app.put("/books/author/:author", async(req,res)=>{
    try{
        const book=await Book.findOneAndUpdate({author:req.params.author},req.body,{
           new:true,
           runValidators:true
        });
        
        res.json(book);
       

        if(!book){
            res.status(404).send("not found")
        }    

    }catch(err){
         res.status(400).send("error is there")
    }
});
//Delete books older than the year 2000.
app.delete("/books/year/before/2000",async(req,res)=>{
    try{

        const books=await Book.deleteMany({year:{$lt:2000}});
        res.status(200).send("Deleted Successfully")

        if (books.deletedCount === 0) {
      return res.status(404).send("No books found before the year 2000");
    }

    }catch(err){
        res.status(400).send("error is there")

    }
 });
//  Delete a book by title
app.delete("/books/title/:title",async(req,res)=>{
    try{
        const book=await Book.deleteOne({title:req.params.title});
        if (book.deletedCount === 0) {
            return res.status(404).send("No books found with this title");
        }
        res.status(200).send("Deleted Successfully")
        
    }catch(err){
        res.status(400).send("error is there");

    }
})







app.listen(3000,()=>{
    console.log("Server started");
})