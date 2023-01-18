var express = require("express")
var mongoose = require("mongoose")
var bodyparser = require("body-parser")

var app = express();
app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://0.0.0.0:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))
app.post("/log_in", (req, res) => {
    var userName = req.body.email;
    var pass = req.body.password;
    

    const userMail = db.collection('users').findOne({email:userName}, (err, res) => {
        if (res===null) {
            console.log("Invalid User !..")
            
        }
        else if (err) {
            throw err;
        }
        if (res.password === pass) {
            
            console.log("Valid User");
          
        }
        else {
            
            console.log("Password Does Not Match !...")
            
            
        }
    });

    

})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect("index.html")
}).listen(200);

console.log("Hello this is 200 port !...");