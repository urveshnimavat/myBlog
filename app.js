//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const postRouter = require("./routes/post");
require("./db/conn");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/',postRouter);


app.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});