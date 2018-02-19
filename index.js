// express2

var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
// app.use(express.static) //public
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

///// SITE REQUESTS
// GET HOME
// Serve the homepage of your site.
app.get("/", function(request,response){
  // console.log("are you nodemon...!");
  response.render("site/index");
});

// Serve the homepage of your site.
app.get("/index", function(request,response){
  // console.log("are you nodemon...!");
  response.render("site/index");
});

// GET SITE/ABOUT
// serve a static about daily planet page.
app.get('/about', function(request,response) {
  // console.log("are you in about...!");
  response.render("site/about");
});

// GET SITE/CONTACT
// serve a static contact page.
app.get('/contact', function(request,response) {
  // console.log("are you in contact...!");
  response.render("site/contact");
});

///// ARTICLE REQUESTS
// GET ARTICLES
// displays a list of all articles
app.get("/articles", function(request,response){
  console.log("in get /articles route");
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents);
  response.render("articles/index", {articles:fileContents});
});

// GET ARTICLES/:ID
// find an article by id in the array of `articles` and display it.
app.get("/articles/:id", function(request,response){
  console.log("in the articles ID path");
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents);
  var articleIndex = parseInt(request.params.id);
  response.render("articles/show", {article:fileContents[articleIndex]});
});

// GET ARTICLES/NEW
// displays a form that users use to create a new article
app.get("/new",function(request,response){
  // console.log("in the articles new path");
  response.render("articles/new");
});

// POST ARTICLES/
// creates a new article (adds to articles array and saves the file)
app.post("/articles",function(request,response){
  // console.log("in the post path");
  var fileContents = fs.readFileSync("./data.json");
  var articles = JSON.parse(fileContents);
  articles.push(request.body);
  fs.writeFileSync("./data.json", JSON.stringify(articles));
  response.redirect("/articles");
});

app.delete("/articles/:id/destroy", function(request,response){
    console.log("in the delete path not complete");
    // read from file
    var fileContents = fs.readFileSync("./data.json");
    fileContents = JSON.parse(fileContents);
    var articleToDelete = parseInt(request.params.id);
    // parse the content
    // splice the selected element from file
    fileContents.splice(fileContents[articleToDelete], 0);
    // re-stringify the array and write it back to the file
    fileContents = JSON.stringify(fileContents);
    response.send({message: "success"});
});

app.get("/articles/:id/edit", function(request,response){
  console.log("in the edit path");
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents);
  var index = request.params.id;
  response.render("articles/edit", {article:fileContents[index], id:index});
});

app.put("/articles/:id", function(){
  console.log("in the put path is not complete");
  var articleToEdit = request.params.id;
  var fileContents = fs.readFileSync(".data.json");
  fileContents = JSON.parse(fileContents);

  //read the file
  // parse the content
  // find the item at the articleIndex
  // re-stringify and write to file
});

app.listen(3000);
