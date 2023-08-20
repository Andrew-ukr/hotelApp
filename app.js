import express from "express";
import "dotenv/config";
import "express-async-errors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
  authenticateToken,
} from "./middleware/index.js";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as hotelRoomTypes } from "./routes/hotelRoomTypes.js";

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// app.get("/api/v1/test", authenticateToken, (req, res) => {
//   res.status(StatusCodes.OK).json({ success: true, message: ReasonPhrases.OK });
// });

app.use("/api/v1/auth", authRoutes);

app.use(authenticateToken);
app.use("/api/v1", userRoutes);
app.use("/api/v1/hotel-room-types", hotelRoomTypes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

try {
  await connectDB(process.env.MONGO_URL);
} catch (error) {
  console.log(error);
}

app.listen(port, () => {
  console.log("Server is running on porn 5000");
});
