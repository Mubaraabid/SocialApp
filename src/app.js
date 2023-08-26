import express from "express";
import mainRouter from "./router/index.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config()
const app = express();
// connecting db
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ message: "Hello world!" });
});

app.use(mainRouter);
let PORT=process.env.PORT || 3900;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});