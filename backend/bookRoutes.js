

// Routes
app.get("/", (req, res) => {
    console.log("GET /");
    res.send("Hello World!");

})
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send("Error fetching books");
    }
});

app.get("/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching book");
    }
});

app.put("/books/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, author, publishYear }, { new: true });
        if (updatedBook) {
            res.status(200).send(updatedBook);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).send("Error updating book");
    }
});

app.delete("/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (deletedBook) {
            res.status(200).send("Book deleted successfully");
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).send("Error deleting book");
    }
});

app.post("/books", async (req, res) => {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
        return res.status(400).send("Title, author, and publish year are required");
    }

    try {
        const newBook = new Book({ title, author, publishYear });
        await newBook.save();
        res.status(201).send(newBook);
    } catch (error) {
        res.status(500).send("Error creating book");
    }
});
