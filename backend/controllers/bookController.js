import { Book } from '../models/bookModel.js';

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
};

// Get a single book by ID
export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
};

// Create a new book
export const createBook = async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).json({ message: "Title, author, and publish year are required" });
        }

        const newBook = await Book.create({ title, author, publishYear });
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "Error creating book", error: error.message });
    }
};

// Update a book
export const updateBook = async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, publishYear },
            { new: true, runValidators: true }
        );

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
};
