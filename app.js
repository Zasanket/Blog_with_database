//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to the My blog Page .In these page you will be able to create a new blog in your browser and connect to the database and  Learn more about Mongooservice and MongoDb in your browser.Also these is my first project that i have created individually so it is simple and straightforward ";
const aboutContent = "In these Project I have created a new web application  in which you will be able to write a blog and save it to your database ,In these project i have used ejs to create a home,contact,compose & about pages also used simple css and Html some of the other technologies used are nodejs,javascript,express";
const contactContent = "You can contact me at E-mail: Zanjesanket@gmail.com and I will send you a copy of the documentation for this project .";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blogDB');

}
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

  let posts =[];
app.get("/", function(req, res){

  Post.find().then( function( posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  })
  .catch(function (err) {
    console.log(err);
  });
});

app.get('/about',function(req,res){
  res.render('about',{content : aboutContent});
});

app.get('/contact',function(req,res){
  res.render('contact',{content:contactContent});
});

app.get('/compose',function(req,res){
res.render('compose');
});

app.post('/compose', function(req,res){

 const post = new Post({
  title : req.body.postTitle,
  content : req.body.postBody
 });

 posts.push(post);
 post.save().then(function(){
    
        res.redirect("/");
    
  })
  .catch(function(err){
    console.log(err);
  });

});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId})
    .then(function( post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    })
    .catch(function (err) {
      console.log(err);
    });  
  });



app.listen(5000, function() {
  console.log("Server started on port 5000");
});
