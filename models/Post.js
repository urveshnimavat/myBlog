const mongoose = require("mongoose");
require("../db/conn");

const postSchema = {
    title: String,
    content: String
  };
  
const Post = mongoose.model("Post", postSchema);
  
module.exports =  Post;