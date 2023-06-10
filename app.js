const express = require("express");
const app = express();
app.set("view engine", "ejs");
// Listen to port 3000
app.listen(3000);
 // Route for home page
app.get("/", (req, res) => {
  res.render("index",{title:'Home'});   
});
 // Route for about page
app.get("/about", (req, res) => {
  // Display about.html
  res.render("about",{title:' about'});   
 
});
 // Redirect /about-us to /about
app.get("/about-us", (req, res) => {
  res.redirect("about",{title:'about'});
});

app.get('/blogs/create',(re,res)=>{
  res.render('create',{title:'create'});
});
 // 404 error page
app.use((req, res) => {
  // Display 404.html
  res.status(404).render("404",{title:'404'}); 
});