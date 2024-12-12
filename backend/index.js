import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:5173", // Vite's default port
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to the Book Store API");
});

// Use book routes
app.use("/books", bookRouter);

// Connect to MongoDB
mongoose
    .connect(mongoDBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB");
        console.log(error);
    });
