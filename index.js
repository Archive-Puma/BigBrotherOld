/* ------------------------------------ */
/* ------------- LIBRARIES ------------ */
/* ------------------------------------ */

// Import Body-Parser library
var bodyparser = require("body-parser");

// Import Express library
var express = require("express");

// Import Mongoose library
var mongo = require("mongoose");

/* ------------------------------------ */
/* -------------- OPTIONS ------------- */
/* ------------------------------------ */

// Create server
var server = express();

// Connect to MongoDB
mongo.connect("mongodb://localhost/bigbrother", { useMongoClient: true });

// Create MongoDB Schemas

var twitter_user_schema = new mongo.Schema({
    userID:String,
    user:String,
    name:String,
    location:String,
    description:String,
    url:String,
    protected:Boolean,
    following:Number,
    followers:Number,
    lang:String
});

// Create MongoDB User

var twitter_user = mongo.model("twitter_user", twitter_user_schema);

// Set ViewEngine to read Pug views
server.set("view engine","pug");

// Argument Parser: Application/JSON
server.use(bodyparser.json());
// Argument Parser: Text/HTML
server.use(bodyparser.urlencoded({extended:true }));

/* ------------------------------------ */
/* ------------ MIDDLEWARES ----------- */
/* ------------------------------------ */

// Set link to static files
server.use("/assets/public_files", express.static('public'));

/* ------------------------------------ */
/* ------------- REQUESTS ------------- */
/* ------------------------------------ */

// Root Dir
server.get("/", function(request, response) {
    // Read Index Jade view
    response.render("index");
});

// Root Form Request
server.post("/", function(request,response) {
    console.log("Name: " + request.body.name + "\nSurname: " + request.body.surname + "\nNickname: " + request.body.nickname);
    response.send("Datos recibidos");
});

// Root Dir
server.get("/twitter", function(request, response) {
    // Read database
    twitter_user.find(function(error, document) {
        response.send(document);
    });
});

// Twitter Information
server.post("/twitter", function(request, response) {
    // Import Twit library
    var Twitter = require("twit");
    // Set keys and tokens
    var T = new Twitter({
        consumer_key:         'H54twKyiED5NrHmqrDI1HtKFv',
        consumer_secret:      'zPL3MU5eAJSO5N7WKdqvuXHUyF8euYGxEb1g5Bd1k7rjqzIKP7',
        access_token:         '832570595917316097-svywXbVnQK1rcznLkqN69MTzAYwH0Zj',
        access_token_secret:  'YftzBi3ZjFJxDb2myjwiyi6ntBl7qiJAvQCC57AjabGEN',
    });

    // Search Twitter users
    T.get("users/search", {
        "q": request.body.name,
        count: 5
    }, function(error,data,res) {
        for(var profile in data) {
            // Fill user information
            var user = new twitter_user({
                userID:data[profile]['id_str'],
                user:data[profile]['screen_name'],
                name:data[profile]['name'],
                location:data[profile]['location'],
                description:data[profile]['description'],
                url:data[profile]['url'],
                protected:data[profile]['protected'],
                following:data[profile]['friends_count'],
                followers:data[profile]['followers_count'],
                lang:data[profile]['lang']
            });
            // Save user info in database
            user.save(function(){
                return;
            });
        }
        return;
    });

    response.send("Información recibida!");
});

/* ------------------------------------ */
/* -------------- THREAD -------------- */
/* ------------------------------------ */

// Start server in port 8080
server.listen(8080);