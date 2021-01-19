const express = require('express');
const router = express.Router();
const Post = require("../models/Post");
require("../db/conn");

const homeStartingContent = "Welcome to my tech blog, here i post various technical content in blog posts. kindly do visit and check my blogs.";
const aboutContent = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
const contactContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

router.get("/", async(req, res)=>{

    await Post.find({}, (err, posts)=>{
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    });
});
  
router.get("/compose", (req, res)=>{
    res.render("compose");
});
  
router.post("/compose", async(req, res)=>{
    const post = new Post({
      title: req.body.postTitle,
      content: req.body.postBody
    });

    await post.save((err)=>{
      if (!err){
          res.redirect("/");
      }
    });
});
  
router.get("/posts/:postId", async(req, res)=>{
  
  const requestedPostId = req.params.postId;
  
    await Post.findOne({_id: requestedPostId}, (err, post)=>{
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
});
  
router.get("/about", (req, res)=>{
    res.render("about", {aboutContent: aboutContent});
});
  
router.get("/contact", (req, res)=>{
    res.render("contact", {contactContent: contactContent});
});
  
module.exports = router;