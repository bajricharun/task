var express = require('express');
const jwt = require("jsonwebtoken");
const path = require("path")

var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000
process.env.SECRET_KEY = '1280f07cd273b0c2c6d8c072308e9e91af6407bfbfb518f7a598e3a6c7f581fb'

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

var Users = require("./routes/Users")
var Questions = require("./routes/Questions");
var Comments = require('./routes/Comments');
var Likes = require('./routes/Likes');
app.use('/users', Users);
app.use('/questions', Questions);
app.use('/comments', Comments);
app.use('/likes', Likes);
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "src", "index.html"));
});


app.listen(port, function() {
    console.log("Server is on port: " + port);
})
