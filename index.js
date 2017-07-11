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
    // Logging out
    twitter_user.remove({ session:request.session.user }, function(error, document) {
        if(error) {
            console.log(error);
        }
    });
    // Read Index Jade view
    response.render("index");
});

// Gathering information
server.post("/searching", function(request, response) {
    request.session.user = request.session.id;
    response.redirect(307, "/information/twitter"); //307 redirect the same method
});

// Root Dir
server.get("/twitter", function(request, response) {
    // Read database
    twitter_user.find(function(error, document) {
        response.send(document);
    });
});

/* ------------------------------------ */
/* -------------- THREAD -------------- */
/* ------------------------------------ */

// Set the UAC
server.use("/information",uac);

// Start the Router
server.use("/information",router);

// Start server in port 8080
server.listen(8080);