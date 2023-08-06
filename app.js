import express from "express";
import 'dotenv/config'
import 'express-async-errors';
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middleware/index.js";
import { router as authRouter } from "./routs/authRouts.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/api/v1/test", (req, res) => {
  res.status(StatusCodes.OK).json({success: true, message: ReasonPhrases.OK});
});

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


try {
  await connectDB(process.env.MONGO_URL)
} catch (error) {
  console.log(error)
}

app.listen(port, () => {
  console.log("Server is running on porn 5000");
});


