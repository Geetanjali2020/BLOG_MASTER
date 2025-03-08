import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectToMongo from "./Database/db.js";
import authRoute from "./routes/authRoute.js";
import contactRoute from "./routes/contactRoute.js";


import cors from "cors";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}
const app = express();
connectToMongo();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const __dirname = path.resolve();
app.set("views", path.join(__dirname, "views"));
app.use("/auth",authRoute);
app.use("/",contactRoute);
app.use(express.static(path.join(__dirname,"public")));
app.get("/", (req, res) => {
  res.render("index");

});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 127.0.0.1:${process.env.PORT}`);
});

app.get("/page/privacy-policy",(req,res) => {
  res.render("privacy-policy");
});
app.get("/page/about",(req,res) => {
  res.render("about");
});
app.get("/page/terms-conditions",(req,res) => {
  res.render("terms-conditions");
});
app.get("/page/FAQ",(req,res) => {
  res.render("FAQ");
});
app.get("/page/blog",(resq,res) =>{
  res.render("blog");
});
app.get("/page/Feedback",(resq,res) =>{
  res.render("Feedback");
});
