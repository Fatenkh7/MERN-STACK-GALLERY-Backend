import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import fileUpload from "express-fileupload";
import path from "path";
import connectDB from "./config/db.js";
import cors from "cors";
import adminRouter from "./routes/admin.js";
import posterRouter from "./routes/poster.js";
import categoriesRouter from "./routes/categories.js";
import inboxRouter from "./routes/inbox.js";
import informationsRouter from "./routes/informations.js";
import cookieParser from "cookie-parser";
import reviewRouter from "./routes/reviews.js";

const app = new express();
app.use(cookieParser());

app.use(cors());

dotenv.config();
await connectDB();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use("/uploads", express.static("./uploads"));
app.use("/admin", adminRouter);

app.use("/poster", posterRouter);

app.use("/categories", categoriesRouter);

app.use("/informations", informationsRouter);

app.use("/inbox", inboxRouter);

app.use("/reviews", reviewRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res
    .status(500)
    .send({ status: 500, message: "Something broke!", error: err.stack });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.PORT} on port ${PORT}!!!`)
);
