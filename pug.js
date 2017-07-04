/* ------------------------------------ */
/* ------------- LIBRARIES ------------ */
/* ------------------------------------ */

// Import Express library
var express = require("express");

// Import Body-Parser library
var bodyparser = require("body-parser");

/* ------------------------------------ */
/* -------------- OPTIONS ------------- */
/* ------------------------------------ */

// Create server
var server = express();

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

/* ------------------------------------ */
/* -------------- THREAD -------------- */
/* ------------------------------------ */

// Start server in port 8080
server.listen(8080);