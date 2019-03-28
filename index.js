var bodyParser  = require("body-parser"),
    http        = require("http"),
    express     = require("express")

var PORT        = port = process.env.PORT || 8080,
    app         = express(),
    Server      = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

Server.listen(port,function(){
  console.log("server is running on"+port)
})
