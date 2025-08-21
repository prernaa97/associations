import express from 'express';
import mongoose from 'mongoose';

import Author from './models/author.js';
import Book from './models/book.js';

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/many2").then(()=>{
    console.log("Database Connected");
}).catch(()=>{
    console.log("Database not connected");
})

app.post('/authors', async (req, res) => {
  try {
    const author = new Author(req.body);
    const saved = await author.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).send("Error creating author");
  }
});

app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).send("Error fetching authors");
  }
});

app.get('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    res.json(author);
  } catch (err) {
    res.status(500).send("Error fetching author");
  }
});

app.put('/authors/:id', async (req, res) => {
  try {
    const updated = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating author");
  }
});

app.delete('/authors/:id', async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.send("Author deleted");
  } catch (err) {
    res.status(500).send("Error deleting author");
  }
});


app.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).send("Error creating book");
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send("Error fetching books");
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('authors');
    res.json(book);
  } catch (err) {
    res.status(500).send("Error fetching book");
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error updating book");
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.send("Book deleted");
  } catch (err) {
    res.status(500).send("Error deleting book");
  }
});

app.post('/assign-book', async (req, res) => {
  const { authorId, bookId } = req.body;
  try {
    await Author.findByIdAndUpdate(authorId, {
      $addToSet: { books: bookId }
    });
    await Book.findByIdAndUpdate(bookId, {
      $addToSet: { authors: authorId }
    });
    res.send("Book assigned to author");
  } catch (err) {
    res.status(500).send("Error assigning book");
  }
});

app.delete('/unassign-book', async (req, res) => {
  const { authorId, bookId } = req.body;
  try {
    await Author.findByIdAndUpdate(authorId, {
      $pull: { books: bookId }
    });
    await Book.findByIdAndUpdate(bookId, {
      $pull: { authors: authorId }
    });
    res.send("Book unassigned from author");
  } catch (err) {
    res.status(500).send("Error unassigning book");
  }
});

app.get('/authors/:id/books', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    res.json(author.books);
  } catch (err) {
    res.status(500).send("Error fetching author's books");
  }
});

app.get('/books/:id/authors', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('authors');
    res.json(book.authors);
  } catch (err) {
    res.status(500).send("Error fetching book's authors");
  }
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
