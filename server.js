const http = require("http");
const hostname=("127.0.0.1");
const port = 3000;
const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("./"));

app.get('/', function(req, res) {
    app.use(express.static("public"))
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
