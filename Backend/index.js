// packages
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path';
import { connectDb } from "./configs/connectDB.js";

//files

import userRoute from "./routes/userRoute.js";
import { errorResponseHandler, invalidPathHandler } from "./middlewares/errorHandlers.js";


dotenv.config();
const app = express();

const PORT = process.env.PORT || PORT;

// db connection
connectDb();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin:"*",
    credentials: true, // Allow cookies
  })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoute);


// error handling middlewares
app.use(errorResponseHandler);
app.use(invalidPathHandler);

//test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
