import express from "express";
import 'dotenv/config'
import 'express-async-errors';

import { connectDB } from "./db/connectDB.js";
import { notFoundMiddleware } from "./middleware/index.js";
import { router as authRouter } from "./routs/authRouts.js";

const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello");
});

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)


try {
  await connectDB(process.env.MONGO_URL)
} catch (error) {
  console.log(error)
}

app.listen(port, () => {
  console.log("Server is running on porn 5000");
});


