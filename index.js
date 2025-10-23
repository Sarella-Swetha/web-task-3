const express = require('express');
const app = express();

app.use(express.json()); // allows Express to read JSON data

// In-memory list of books
let books = [
    { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
    { id: 2, title: 'Atomic Habits', author: 'James Clear' }
];

// GET - return all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST - add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT - update a book by ID
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    res.json(book);
});

// DELETE - delete a book by ID
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(b => b.id !== id);
    res.json({ message: 'Book deleted successfully' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
