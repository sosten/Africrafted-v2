import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter.js";
import categoryRouter from "./routers/categoryRouter.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));

//Routes

app.use("/api", userRouter);
app.use("/category", categoryRouter);

app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
});

// Connection to Mongodb

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    console.log("Database is connected");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
