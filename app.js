const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const app = express();

const dbURI =
  "mongodb+srv://binshadhubasheer:test123@cluster0.paaykbv.mongodb.net/binshadhubasheer";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.listen(3000);
app.use(express.static("public"));
app.use(express.urlencoded({extended:true})); 
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Route for about page
app.get("/about", (req, res) => {
  // Display about.html
  res.render("about", { title: " about" });
});

// Redirect /about-us to /about
app.get("/about-us", (req, res) => {
  res.redirect("about", { title: "about" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "AllBlogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs',(req,res)=>{
  console.log(req.body);
  const blog=new Blog(req.body);
  blog.save().then((resule)=>{
    res.redirect('/blogs'); 
  }).catch((err)=>{
    console.log(err);
  });
});

app.get("/blogs/create", (re, res) => {
  res.render("create", { title: "create" });
});

// 404 error page
app.use((req, res) => {
  // Display 404.html
  res.status(404).render("404", { title: "404" });
});
