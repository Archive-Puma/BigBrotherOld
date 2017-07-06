/* ------------------------------------ */
/* ------------- LIBRARIES ------------ */
/* ------------------------------------ */

// Import Body-Parser library
var bodyparser = require("body-parser");

// Import Express library
var express = require("express");

// Import Express-Session library
var session = require("express-session");

// Import own libraries
var router = require("./libs/routes");
var uac = require("./libs/uac");
var Twitter = require("./libs/socials/twitter").Twitter;
var twitter_user = require("./libs/models/twitter/user").twitter_user;

/* ------------------------------------ */
/* ------------ MIDDLEWARES ----------- */
/* ------------------------------------ */

// Create server
var server = express();

// Set ViewEngine to read Pug views
server.set("view engine","pug");

// Argument Parser: Application/JSON
server.use(bodyparser.json());
// Argument Parser: Text/HTML
server.use(bodyparser.urlencoded({extended:true }));

// Set link to static files
server.use("/assets/public_files", express.static('public'));

// Set session arguments
server.use(session({
    // Secret String needs to be unique for all our NodeJS proyects
    secret: "0xDEAD_B1gBr0th3R_Session",
    resave: false, saveUninitialized: false
}));

/* ------------------------------------ */
/* ------------- REQUESTS ------------- */
/* ------------------------------------ */

// Index
server.get("/", function(request, response) {
    // Read Index Jade view
    response.render("index");
});

// Gathering information
server.post("/searching", function(request, response) {
    twitter_search(request.session.id, request.body.nickname);
    request.session.user = request.session.id; //request.session.id;
    response.render("searching");
});

// Root Dir
server.get("/twitter", function(request, response) {
    // Read database
    twitter_user.find(function(error, document) {
        response.send(document);
    });
});

/* ------------------------------------ */
/* ------------- FUNCTIONS ------------ */
/* ------------------------------------ */

// Search Twitter users
function twitter_search(session_id, name) {
    Twitter.get("users/search", {
        "q": name,
        count: 5
    }, function(error,data,res) {
        for(var profile in data) {
            var lock = "lock_open";
            if(data[profile]['protected'])
                lock = "lock";

            // Fill user information
            var user = new twitter_user({
                session: session_id,
                userID:data[profile]['id_str'],
                user:data[profile]['screen_name'],
                name:data[profile]['name'],
                location:data[profile]['location'],
                description:data[profile]['description'],
                url:data[profile]['url'],
                protected:data[profile]['protected'],
                protected_icon:lock,
                following:data[profile]['friends_count'],
                followers:data[profile]['followers_count'],
                lang:data[profile]['lang'],
                profile_picture:data[profile]['profile_image_url_https']
            });
            // Save user info in database
            user.save().then(function(doc){
                return;
            });
        }
        return;
    });
    return;
}

/* ------------------------------------ */
/* -------------- THREAD -------------- */
/* ------------------------------------ */

// Set the UAC
server.use("/information",uac);

// Start the Router
server.use("/information",router);

// Start server in port 8080
server.listen(8080);